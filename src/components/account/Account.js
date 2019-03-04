import React, { Component } from 'react'
import { Header, Avatar, Button, ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Feather'
import { StyleSheet, View, Text, ScrollView, SectionList } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { observer, inject } from 'mobx-react'
import setAxios from '../../utils/axios'
import cityFormatter from '../../utils/cityFormatter'

@observer
@inject('Store')
class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userAvaterImg: 'heihei',
      username: '',
      userLevel: 0,
      userDynaimc: 0, //动态
      userAttention: 0, //关注
      userFans: 0,
      userCity: null,
      isSignin: false,
    }
    this.memberItems = [
      {
        data: [{ title: '我的消息', leftIcon: 'mail' }],
      },
      {
        data: [
          { title: '会员中心', leftIcon: 'verified-user' },
          { title: '商城', leftIcon: 'shopping-cart' },
          { title: '在线听歌免流量', leftIcon: 'wifi' },
        ],
      },
      {
        data: [
          { title: '设置', leftIcon: 'settings' },
          { title: '扫一扫', leftIcon: 'camera' },
          { title: '主题换肤', leftIcon: 'tv' },
        ],
      }
    ]
  }
  componentDidMount() {
    //   ${this.props.Store.userId}
    setAxios(`user/detail?uid=374434203`).then((v) => {
      if (v.code === 200) {
        const { avatarUrl, follows, followeds, nickname, city, eventCount } = v.profile

        this.setState({
          userAvaterImg: avatarUrl,
          userLevel: v.level,
          userAttention: follows,
          userFans: followeds,
          username: nickname,
          userCity: cityFormatter(city),
          userDynaimc: eventCount,
          isSignin: v.mobileSign || v.pcSign,
        })
      }
    })
  }

  handleDailySignin = () => {
    setAxios('daily_signin').then((v) => {
      if (v.code === 200 || v.code === -2) {
        this.setState({
          isSignin: true,
        })
      }
    })
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item,index }) => <ListItem title={item.title} leftIcon={{ name: item.leftIcon }} rightIcon={{ name: 'chevron-right' }} />


  render() {
    const { isSignin, userAvaterImg, userAttention, userCity, userDynaimc, userFans, userLevel, username } = this.state

    return (
      <ScrollView style={{ backgroundColor: 'rgba(238, 238, 238, 1)' }}>
        <Header
          centerComponent={
            <Text style={{ fontWeight:'bold' , letterSpacing:5 }}>帐号</Text>
          }
          rightComponent={<Icon name="more-horizontal" style={{ fontSize: 20 }} />}
          placement="center"
          backgroundColor="white"
          centerContainerStyle={{ height: 44 }}
          rightContainerStyle={{ height: 44 }}
          containerStyle={{ height: 44 }}
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors: ['white', '#ce1321'],
            start: { x: 0, y: 0.5 },
            end: { x: 1, y: 0.5 },
          }}
        />
        <View style={styles.container}>
          <View style={styles.rowContainer}>
            <Avatar
              rounded
              source={{
                uri: userAvaterImg,
              }}
              size={60}
              containerStyle={{ width: 60 }}
            />
            <View style={{ width: 100, marginLeft: 20 }}>
              <Text>{username}</Text>
              <Text
                style={{
                  borderWidth: 1,
                  fontSize: 15,
                  marginTop: 8,
                  width: 50,
                  borderRadius: 9,
                  height: 18,
                  textAlign: 'center',
                  lineHeight: 18,
                }}
              >
                LV.{userLevel}
              </Text>
            </View>
            <View style={{ width: 140, alignItems: 'flex-end' }}>
              <Button
                title={isSignin ? '已签到' : '签到'}
                disabled={isSignin}
                buttonStyle={{ width: 80, height: 30 }}
                onPress={this.handleDailySignin}
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.warpDown}>
              <Text style={styles.textStyle}>动态</Text>
              <Text style={styles.textStyle}>{userDynaimc}</Text>
            </View>
            <View style={styles.warpDown}>
              <Text style={styles.textStyle}>关注</Text>
              <Text style={styles.textStyle}>{userAttention}</Text>
            </View>
            <View style={styles.warpDown}>
              <Text style={styles.textStyle}>粉丝</Text>
              <Text style={styles.textStyle}>{userFans}</Text>
            </View>
            <View style={styles.warpDown}>
              <Text style={styles.textStyle}>城市</Text>
              <Text style={styles.textStyle}>{userCity}</Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 5 }}>
          <SectionList
            sections={this.memberItems}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            SectionSeparatorComponent={() => <View style={{ marginBottom: 5 }} />}
          />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: 150,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    marginTop: 7,
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  warpDown: {
    height: 50,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Account

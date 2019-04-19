import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import { Avatar } from 'react-native-elements'
import React, { Component } from 'react'
import Swiper from 'react-native-swiper'
import setAxios from '../../utils/axios'
import Icon from 'react-native-vector-icons/Feather'
import Loading from '../Loading/Loading'
import { getPersonalizedInfo } from './personalizedAdapter'
import { format } from '../../utils/utils'
import BoxShadow from 'react-native-shadow'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bannerImages: [],
      isSwiperShow: false,
      personalizedData: [],
    }

    this.boxs = [
      { name: 'radio', title: '私人FM' },
      { name: 'account-box', title: '每日歌曲推荐', headerTitle: '每日歌曲推荐' },
      { name: 'assessment', title: '云音乐热歌榜', headerTitle: '排行榜' },
    ]
  }
  componentDidMount() {
    setAxios('banner').then((v) => {
      this.setState({
        bannerImages: v.banners,
        isSwiperShow: true,
      })
    })
    setAxios('personalized').then((v) => {
      console.log(v)
      this.setState(
        {
          personalizedData: getPersonalizedInfo(v.result),
        },
        () => {
          console.log(this.state.personalizedData)
        }
      )
    })
  }
  renderSwiper = () => {
    const { bannerImages } = this.state

    return (
      <Swiper
        height={124}
        autoplay={true}
        removeClippedSubviews={false}
        loop={true}
        key={bannerImages.length}
        showsPagination={false}
        showsPagination={true}
        paginationStyle={{ bottom: 5 }}
      >
        {bannerImages.map((v, index) => {
          return (
            <View style={{ height: 124 }} key={index}>
              <Image source={{ uri: v.picUrl }} style={{ width: '100%', height: 124 }} />
            </View>
          )
        })}
      </Swiper>
    )
  }

  render() {
    const { isSwiperShow, personalizedData } = this.state
    const shadowOpt = {
      width: 100,
      height: 100,
      color: '#000',
      border: 2,
      radius: 3,
      opacity: 0.2,
      x: 0,
      y: 3,
      inset: true,
      style: { marginVertical: 5 },
    }

    return isSwiperShow ? (
      <ScrollView>
        <View style={{ height: 124 }}>{this.renderSwiper()}</View>
        <View style={styles.boxWrap}>
          {this.boxs.map((v, index) => {
            return (
              <View
                style={styles.box}
                key={index}
                onTouchStart={() => this.props.navigation.navigate(v.title, { headerTitle: v.headerTitle })}
              >
                <Avatar
                  rounded
                  size={56}
                  icon={{ name: v.name }}
                  overlayContainerStyle={{ backgroundColor: '#cd1220' }}
                />
                <Text>{v.title}</Text>
              </View>
            )
          })}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' }}>
          {personalizedData.map((v) => {
            return (
              <View key={v.id} style={{ alignItems: 'center', paddingBottom: 10 }}>
                <View
                  style={{
                    width: 120,
                    borderWidth: 10,
                    borderColor: 'rgba(198, 199, 198,0.15)',
                    borderRadius: 65,
                    height: 120,
                  }}
                >
                  <Avatar
                    size={100}
                    rounded
                    source={{
                      uri: v.picUrl,
                    }}
                    avatarStyle={{ padding: 15 }}
                  />
                </View>
                <Text
                  style={{ width: 110, fontSize: 12, color: '#000', textAlign: 'center', paddingTop: 10 }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {v.name}
                </Text>
              </View>
            )
          })}
        </View>
      </ScrollView>
    ) : (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Loading />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  imgWrapper: {
    width: '100%',
    height: 124,
  },
  imgView: {
    height: 124,
  },
  bannerImg: {
    width: '100%',
    height: 124,
  },
  boxWrap: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, marginBottom: 10 },
  box: {
    width: 120,
    height: 80,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

export default Home

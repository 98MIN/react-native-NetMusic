import * as React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { Header, ListItem } from 'react-native-elements'
import setAxios from '../../utils/axios'
import { observer, inject } from 'mobx-react'

@inject('Store')
@observer
class Mine extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      createPlayList: [],
      subscribedPlayList: [],
    }
  }
  componentDidMount() {
    const {
      Store: { userId },
    } = this.props

    setAxios(`user/playlist?uid=374434203`).then((v) => {
      let res = separatePlayList(v.playlist)

      this.setState({
        createPlayList: res.createPlayList,
        subscribedPlayList: res.subscribedPlayList,
      })
    })
  }

  renderItem = (v, i) => {
    return (
      <ListItem
        key={i}
        leftAvatar={{ source: { uri: v.coverImgUrl } }}
        title={v.name}
        subtitle={
          v.subscribed
            ? `${v.trackCount}首,by ${v.creator.nickname},已下载${v.cloudTrackCount}首`
            : `${v.trackCount}首,已下载${v.cloudTrackCount}首`
        }
        onPress={() => { this.props.navigation.navigate('playlist',{ playlistId : v.id,headerTitle:'歌单'})}}
        subtitleStyle={{ color: 'rgba(128, 128, 128, 1)', fontSize: 12 }}
        titleStyle={{ color: 'rgba(80, 80, 80, 1)', fontSize: 14, marginBottom: 5 }}
      />
    )
  }

  render() {
    const { createPlayList, subscribedPlayList } = this.state

    return (
      <View>
        <Header
          centerComponent={{ text: '我的音乐', style: { color: '#fff' } }}
          containerStyle={{ backgroundColor: 'rgb(206,19,33)', height: 50, borderWidth: 1 }}
          centerContainerStyle={{ height: 40 }}
        />
        <ScrollView>
          <View>
            <Text style={styles.playListWrapText}>我创建的歌单</Text>
            {createPlayList.map((v, i) => this.renderItem.bind(this, v, i)())}
          </View>
         <View>
            <Text style={styles.playListWrapText}>我收藏的歌单</Text>
            {subscribedPlayList.map((v, i) => this.renderItem.bind(this, v, i)())}
         </View>
         <View style={{ marginBottom: 100 }}></View>
        </ScrollView>
      </View>
    )
  }
}

export default Mine

const styles = StyleSheet.create({
  playListWrap: {
    height: 14,
    justifyContent: 'center',
  },
  playListWrapText: {
    paddingLeft: 15,
    fontSize: 12,
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: 'rgba(238, 238, 238, 1)',
    color: 'rgba(80, 80, 80, 1)',
  },
})

function separatePlayList(data) {
  let createPlayList = data.filter((v) => !v.subscribed)
  let subscribedPlayList = data.filter((v) => v.subscribed)

  return {
    createPlayList,
    subscribedPlayList,
  }
}

import React , { Component } from 'react' //#endregion
import setAxios from '../../utils/axios'
import { formatterHotSongsList, formatterDailyPushSongs } from './hotSongsAdapter'
import { FlatList, StyleSheet, View, TouchableHighlight ,Text, Image ,ImageBackground } from 'react-native'
import { ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Feather'
import Loading from '../Loading/Loading'

class HotSongs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageInfo: {},
      isLoading: false,
     };
  }
  getSongsList = () => {
    setAxios('top/list?idx=1').then(v=>{
      const { name ,coverImgUrl ,shareCount ,subscribedCount ,commentCount ,description ,tracks } = v.playlist
      const musicInfo = formatterHotSongsList(tracks)
      let pageInfo = {}

      Object.assign(pageInfo,
        { musicInfo ,
          songListName: name ,
          coverImgUrl: coverImgUrl,
          shareCount: shareCount,
          subscribedCount: subscribedCount,
          commentCount: commentCount,
          description: description
        })

      this.setState({
        pageInfo,
        isLoading: true
      })
    })
  }
  getDailyPush = () => {
    setAxios('recommend/songs').then(v=>{
      const musicInfo = formatterDailyPushSongs(v.recommend)
      let pageInfo = {}

      Object.assign( pageInfo, { musicInfo } )

      this.setState({
        pageInfo,
        isLoading: true
      })
    })
  }
  componentDidMount(){
    const { navigation: { state: { routeName } } } = this.props

    if(routeName === '云音乐热歌榜'){
      this.getSongsList()
    }else if(routeName === '每日歌曲推荐'){
      this.getDailyPush()
    }else{
      console.log('1111')
    }
  }

  static navigationOptions = ( { navigation: { state: { params } } } ) =>{

    return {
      headerTitle: params.headerTitle,
      headerTitleStyle:{
        alignSelf: 'center',
        textAlign:'center',
        flex:1,
        fontSize:16,
        fontFamily: 'Microsoft YaHei',
        color:'rgb(255, 255, 255)',
      },
      headerStyle:{
        backgroundColor:'rgb(206,19,33)'
      },
      headerRight:React.createElement(View,null,null),
      headerTintColor:'white'
    }
  }

  handleList = ( musicId, musicName, authorNames, musicTime, picUrl, e ) => {
    this.props.navigation.navigate('Play',{ musicId, musicName, authorNames, musicTime, picUrl })
  }

  keyExtractor = (item, index) => index.toString()


  renderIcon = ( iconName, textContent, styles ,key ) => {
    return (
      <View style={styles.wrap_icon_content} key={key}>
        <Icon name={ iconName } size={ 25 } color={ 'white' }/>
        <Text style={{ color: 'white' }}>{ textContent }</Text>
      </View>
    )
  }

  renderHotSongsItem = ({ item ,index }) => {
    const { pageInfo:{ coverImgUrl, description, shareCount, subscribedCount, commentCount } } = this.state
    let iconData = []

    if(!index){
      iconData = [
        { iconName: 'folder-plus',text: subscribedCount },
        { iconName: 'message-square',text: commentCount },
        { iconName: 'share-2',text: shareCount },
        { iconName: 'download',text: '下载' }
      ]
    }

    return(
      <View>
        {
          !index?
          <View style={styles.warp}>
            <View style={{ flexDirection: 'row', justifyContent:'space-around', height: 135, alignItems:'center' }}>
              <Image source={{ uri: coverImgUrl }}  style={{ width: 135, height: 135 }}/>
              <View style={{ width:200 , marginLeft: 10 , height: 135 ,justifyContent:'center'  }}>
                <Text style={{color:'white'}}>{ description }</Text>
              </View>
            </View>
            <View style={styles.wrap_icon}>
              { iconData.map((v,index)=>  this.renderIcon(v.iconName, v.text, styles, index)) }
            </View>
          </View>
          :null
        }
        <ListItem
        title={ item.songName }
        titleStyle={{ fontSize: 13, color: 'rgba(0,0,0,1)' }}
        subtitle={item.authorNames}
        subtitleStyle={{ fontSize: 12, marginTop: 5 }}
        leftAvatar={{ source: { uri: item.picUrl } }}
        rightIcon={{ name: 'chevron-right' }}
        containerStyle={{ borderBottomWidth: 1,borderBottomColor: '#ccc' }}
        onPress={this.handleList.bind( this, item.musicId, item.songName, item.authorNames, item.musicTime, item.picUrl )}
      />
    </View>
  )}
  renderDailtPushItem = ({ item ,index }) => {
    return(
      <View>
        {
          !index?
          <ImageBackground source={{ uri:item.picUrl }} style={{ width: "100%",height: 180 }}>
            <View style={{ height:180 , justifyContent: 'flex-end' }}>
              <View style={{ width:"100%" , height: 39 ,justifyContent:'center' ,alignItems:'center' }}>
                <Text style={{color:"white"}}>根据你的音乐口味生成，每天6:00更新</Text>
              </View>
            </View>
          </ImageBackground>
          :null
        }
        <ListItem
        title={ item.songName }
        titleStyle={{ fontSize: 13, color: 'rgba(0,0,0,1)' }}
        subtitle={`${item.authorNames} —— ${item.albumName}`}
        subtitleStyle={{ fontSize: 12, marginTop: 5 }}
        leftAvatar={{ source: { uri: item.picUrl } }}
        rightIcon={{ name: 'chevron-right' }}
        containerStyle={{ borderBottomWidth: 1,borderBottomColor: '#ccc' }}
        onPress={this.handleList.bind( this, item.musicId, item.songName, item.authorNames, item.musicTime, item.picUrl )}
      />
    </View>)
  }

  render() {
    const { pageInfo ,isLoading } = this.state
    const { navigation: { state: { routeName } } } = this.props

    return (
     isLoading ?
      <FlatList
        keyExtractor={ this.keyExtractor }
        data={ pageInfo.musicInfo }
        renderItem={ routeName === '云音乐热歌榜' ? this.renderHotSongsItem : this.renderDailtPushItem }
      />:
      <Loading/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  warp: {
    height: 221,
    backgroundColor: 'rgba(85, 85, 85, 1)',
    flex:1,
    justifyContent:'space-around',
    alignItems:'center',
  },
  wrap_icon: {
    height: 47,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  wrap_icon_content: {
    height: 47,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  }
})


export default HotSongs;

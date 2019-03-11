import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import setAxios from '../../utils/axios'
import { observer, inject } from 'mobx-react'
import { lyricFormatter } from '../../utils/utils'
import Audio from './component/Audio'

@inject('Store')
@observer
class PlayPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lyricInfo : {
        lyric: [],
        lyricContributor:{
          userName: '',
          userId: ''
        }
      },
      musicUrl:''
    };
  }


  componentDidMount(){
    // /lyric?id=33894312 获取歌词
    //  /comment/music?id=186016 歌曲评论 默认20条
    const { Store,  navigation: { state: { params }, addListener }  } = this.props

    addListener('didFocus',async payload => {
      await setAxios(`music/url?id=${params.musicId}`).then(v=>{
        let musicInfo = {}

        this.setState({
          musicUrl: v.data[0].url
        })

        Object.assign( musicInfo, params )
        Object.keys( musicInfo ).forEach(function( key ){
          Store.setMusic( key, musicInfo[key] )
        });
      })

      setAxios(`lyric?id=${params.musicId}`).then(v=>{
        const { lyricUser, lrc:{ lyric } } = v

        this.setState({
          lyricInfo : {
            lyric: lyricFormatter(lyric),
            lyricContributor:{
              userName: lyricUser.nickname,
              userId: lyricUser.userid
            }
          }
        })
      })
    })
  }
  componentWillUnmount(){
    console.log('我卸载了')
  }


  static navigationOptions =({ navigation }) => {
    const { params } = navigation.state

    return {
      title:params.musicName,
      headerRight:<View style={{marginRight:15}}><Icon name={"share-2"} size={ 18 } color={'white'}/></View>,
      headerRightStyle:{
        borderWidth:1
      },
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
      headerTintColor:'white',
    }
  }
  render() {
    const { navigation, Store: { picUrl } } = this.props
    const { musicUrl } = this.state

    return (
      <Audio picUrl={ picUrl } navigation={navigation} musicUrl={ musicUrl }/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  record_Warpper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: "100%",
    height: 360
  }
})
export default PlayPage;

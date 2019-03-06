import React, { Component } from 'react'
import { View, Text} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import setAxios from '../../utils/axios'
import { observer, inject } from 'mobx-react'

@observer
@inject('Store')
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
      }
    };
  }


  componentDidMount(){
    // /lyric?id=33894312 获取歌词
    //  /comment/music?id=186016 歌曲评论 默认20条
    const { Store,  navigation: { state: { params } }  } = this.props

    setAxios(`music/url?id=${params.musicId}`).then(v=>{
      let musicInfo = {}

      Object.assign( musicInfo, params, { musicUrl:v.data[0].url } )
      Object.keys( musicInfo ).forEach(function( key ){
        Store.setMusic( key, musicInfo[key] )
      });
    })

    setAxios(`lyric?id=${params.musicId}`).then(v=>{
      const { lyricUser, lrc:{ lyric } } = v

      console.log(lyricUser)
      this.setState({
        lyricInfo : {
          lyric: lyric.replace(/[\r\n]/gi,'<br>').split('<br>'),
          lyricContributor:{
            userName: lyricUser.nickname,
            userId: lyricUser.userid
          }
        }
      },()=>{
        console.log(this.state.lyricInfo)
      })
    })
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
      headerTintColor:'white'
    }
  }
  render() {
    return (
      <View>
        <Text>
          222222
        </Text>
      </View>
    );
  }
}

export default PlayPage;

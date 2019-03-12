import React,{ Component } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { observer, inject } from 'mobx-react'
import Icon from 'react-native-vector-icons/Feather'
import moment from 'moment'
import Sound from 'react-native-sound'
import { ceilTime } from '../../../utils/utils'

@inject('Store')
@observer
class PlayBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playedTime : 0,
      controlPlayIcon : [
        { name: 'refresh-cw' ,size: 25 },
        { name: 'skip-back' ,size: 25 },
        { name: 'play-circle' ,size: 36, onPress : this.handleUpdatePlaying.bind(this,true) },
        { name: 'skip-forward' ,size: 25 },
        { name: 'clipboard' ,size: 25 }
      ],
      controlPauseIcon : [
        { name: 'refresh-cw' ,size: 25 },
        { name: 'skip-back' ,size: 25 },
        { name: 'pause-circle' ,size: 36 , onPress : this.handleUpdatePlaying.bind(this,false) },
        { name: 'skip-forward' ,size: 25 },
        { name: 'clipboard' ,size: 25 }
      ],
      isPlaying : false
     };
    this.music = null
    this._width = Dimensions.get('window').width - 56 * 2
    this.timer = null
    this.soundFirst = true
    this.oldMusicUrl = ''
  }
  handleUpdatePlaying = (data) => {
    const { onUpdate } = this.props

    data ? this.handlePlay() : this.handlePause()

    this.setState({
      isPlaying: data
    },()=>{
      onUpdate(this.state.isPlaying)
    })
  }

  componentDidMount(){
    const { musicUrl,navigation } = this.props

    if(musicUrl !== this.oldMusicUrl){
      this.setState({
        playedTime: 0
      })
    }
    navigation.addListener('didBlur',()=>{
      const { playedTime } = this.state
      AsyncStorage.setItem('name', JSON.stringify(), (error, result) => {
        if (!error) {
            this.setState({
                data:'保存成功!'
            })
        }
    });
    })
  }


  handlePlay = () => {
    const { Store : { musicTime } } = this.props
    const { playedTime: prevPlayedTime } = this.state

    if(prevPlayedTime >= ceilTime(musicTime)){
      const playedTime = 0

      this.setState({
        playedTime
      })
    }

    this.music.play()
    clearInterval(this.timer)

    this.timer = setInterval(() => {
      let { playedTime: prevPlayedTime } = this.state
      const playedTime = prevPlayedTime + 1000

      if(prevPlayedTime >= ceilTime(musicTime)){
        clearInterval(this.timer)
        this.handleUpdatePlaying(false)
        this.music.stop()
        return
      }

      this.setState({
        playedTime
      })
    }, 1000);
  }

  handlePause = () => {
    this.music.pause()
    clearInterval(this.timer)
  }

  render() {
    const { playedTime: prevPlayedTime , controlPlayIcon, controlPauseIcon, isPlaying  } = this.state
    const { Store:{ musicTime: prevMusicTime }, musicUrl } = this.props
    const controlIcon = isPlaying ? controlPauseIcon : controlPlayIcon
    const musicTime = prevMusicTime ? moment(prevMusicTime).utcOffset(0).format('HH:mm:ss') : '00:00:00'
    const playedTime = moment(prevPlayedTime).utcOffset(0).format('HH:mm:ss')
    const playedWidth = Math.floor(prevPlayedTime/prevMusicTime * this._width) || 0

    if(this.oldMusicUrl !== musicUrl){
      console.log(this.music)
      this.music && this.music.stop()
      console.log(this.music)
      this.music && this.music.release()
      this.music = new Sound(musicUrl);
      this.oldMusicUrl = musicUrl

      console.log(this.music)
    }

    return (
      <View style={styles.container}>
        <View style={ styles.playBarWrap }>
          <View style={ styles.sideStyle }>
            <Text style={{ fontSize: 11 }}>{ playedTime }</Text>
          </View>
          <View style={{ width:this._width ,backgroundColor: '#ccc', height: 1 }}>
            <View style={{ width: playedWidth, backgroundColor: 'rgb(206,19,33)', height:1 }}></View>
          </View>
          <View style={ styles.sideStyle }>
            <Text style={{ fontSize: 11 }}>{ musicTime }</Text>
          </View>
        </View>
        <View style={styles.controlBar}>
          { controlIcon.map((v, index) => <Icon {...v} key={index}/>) }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 106,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  playBarWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 54,
  },
  sideStyle: {
    justifyContent:'space-around',
    alignItems: 'center',
    height: 54,
    width: 56,
  },
  controlBar : {
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 52,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
  }
})

export default PlayBar;

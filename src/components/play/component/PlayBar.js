import React,{ Component } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { observer, inject } from 'mobx-react'
import Icon from 'react-native-vector-icons/Feather'
import moment from 'moment'
import Sound from 'react-native-sound'
import { floorTime } from '../../../utils/utils'

@inject('Store')
@observer
class PlayBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loop: 0,
      playedTime : 0,
      isPlaying : false
     };
    this.music = null
    this._width = Dimensions.get('window').width - 56 * 2
    this.timer = null
    this.soundFirst = true
    this.oldMusicUrl = ''
    this.controlPlayIcon = [
      { name: 'repeat' ,size: 25 , onPress : this.handleLoop },
      { name: 'skip-back' ,size: 25 },
      { name: 'play-circle' ,size: 36, onPress : this.handleUpdatePlaying.bind(this,true) },
      { name: 'skip-forward' ,size: 25 },
      { name: 'clipboard' ,size: 25 }
    ]
    this.controlPauseIcon = [
      { name: 'repeat' ,size: 25 , onPress : this.handleLoop },
      { name: 'skip-back' ,size: 25 },
      { name: 'pause-circle' ,size: 36 , onPress : this.handleUpdatePlaying.bind(this,false) },
      { name: 'skip-forward' ,size: 25 },
      { name: 'clipboard' ,size: 25 }
    ]
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
  }

  handleLoop = () => {
    const { loop: prevLoop } = this.state
    const loop = !prevLoop ? 1 : 0
    !prevLoop ? this.music.setNumberOfLoops(1) : this.music.setNumberOfLoops(0)

    this.setState({
      loop
    })
  }

  handlePlay = () => {
    const { Store : { musicTime } } = this.props
    const { playedTime: prevPlayedTime, loop } = this.state

    if(prevPlayedTime >= floorTime(musicTime)){
      const playedTime = 0

      this.setState({
        playedTime
      })
    }

    this.music.play()
    clearInterval(this.timer)

    this.timer = setInterval(() => {
      this.music.getCurrentTime(playedTime => this.setState({ playedTime : Math.floor(playedTime) * 1000 }))

      const { playedTime } = this.state

      if( loop && playedTime >= floorTime(musicTime) ){
        this.music.getCurrentTime(playedTime => this.setState({ playedTime : Math.floor(playedTime) * 1000 }))
        this.handleUpdatePlaying(true)
      }else if( playedTime >= floorTime(musicTime) ){
        clearInterval(this.timer)
        this.handleUpdatePlaying(false)
        this.music.stop()

        return
      }

      this.music.getCurrentTime(playedTime => this.setState({ playedTime : Math.floor(playedTime) * 1000 }))
    }, 1000);
  }

  handlePause = () => {
    this.music.pause()
    clearInterval(this.timer)
  }

  render() {
    const { playedTime: prevPlayedTime , isPlaying, loop  } = this.state
    const { Store:{ musicTime: prevMusicTime }, musicUrl } = this.props
    const controlIcon = isPlaying ? this.controlPauseIcon : this.controlPlayIcon
    const musicTime = prevMusicTime ? moment(prevMusicTime).utcOffset(0).format('HH:mm:ss') : '00:00:00'
    const playedTime = moment(prevPlayedTime).utcOffset(0).format('HH:mm:ss')
    const playedWidth = Math.floor(prevPlayedTime/prevMusicTime * this._width) || 0

    if(this.oldMusicUrl !== musicUrl){
      this.music && this.music.stop()
      this.music && this.music.release()
      this.music = new Sound(musicUrl);
      this.oldMusicUrl = musicUrl
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
          { controlIcon.map((v, index) =>
          <View>
            <Icon {...v} key={index} />
            {
              !index && loop ? <Text style={{ position:'absolute', fontSize:11, fontWeight: '900', right: 10, top: 4 }}>1</Text> : null
            }
          </View>) }
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

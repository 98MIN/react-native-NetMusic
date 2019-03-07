import React,{ Component } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { observer, inject } from 'mobx-react'
import Icon from 'react-native-vector-icons/Feather'
import moment from 'moment'
import Sound from 'react-native-sound'

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
  }
  handleUpdatePlaying = (data) => {
    if(data){
      this.music.play((success)=>{
        this.music.release()
      })
    }else{
      this.music.pause()
    }
    const { onUpdate } = this.props
    this.setState({
      isPlaying: data
    },()=>{
      onUpdate(this.state.isPlaying)
    })
  }

  handlePlay = () => {
    const { playedTime } = this.state
    this.music.play()
    clearInterval(this.timer)
    this.timer = setInterval(() => {
      this.setState({
        playedTime: ++playedTime
      })
    }, 1000);
  }
  handlePause = () => {
    this.music.stop()
    clearInterval(this.timer)
  }

  render() {
    const { playedTime:prevPlayedTime , controlPlayIcon, controlPauseIcon, isPlaying  } = this.state
    const { musicTime:prevMusicTime, musicUrl } = this.props.Store
    const controlIcon = isPlaying ? controlPauseIcon : controlPlayIcon
    const musicTime = moment(prevMusicTime).utcOffset(0).format('HH:mm:ss')
    const playedTime = moment(prevPlayedTime).utcOffset(0).format('HH:mm:ss')

    if(musicUrl){
      this.music = new Sound(musicUrl ? musicUrl : '');
    }

    return (
      <View style={styles.container}>
        <View style={ styles.playBarWrap }>
          <View style={ styles.sideStyle }>
            <Text style={{ fontSize: 11 }}>{ playedTime }</Text>
          </View>
          <View style={{ width:this._width ,borderWidth:1}}></View>
          <View style={ styles.sideStyle }>
            <Text style={{ fontSize: 11 }}>{ prevMusicTime ? musicTime : '00:00:00' }</Text>
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

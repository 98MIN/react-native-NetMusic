import React,{ Component } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { observer, inject } from 'mobx-react'
import Icon from 'react-native-vector-icons/Feather'
import moment from 'moment'

@inject('Store')
@observer
class PlayBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playedTime : 0,
      controlIcon : [
        { name: 'refresh-cw' ,size: 25 },
        { name: 'skip-back' ,size: 25 },
        { name: 'play-circle' ,size: 36 },
        { name: 'skip-forward' ,size: 25 },
        { name: 'clipboard' ,size: 25 }
      ]
     };
     this._width = Dimensions.get('window').width - 56 * 2
  }
  componentDidMount () {

  }

  render() {
    const { playedTime:prevPlayedTime , controlIcon } = this.state
    const { musicTime:prevMusicTime } = this.props.Store

    const musicTime = moment(prevMusicTime).utcOffset(0).format('HH:mm:ss')
    const playedTime = moment(prevPlayedTime).utcOffset(0).format('HH:mm:ss')

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
          { controlIcon.map(v=><Icon {...v}/>)}
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

import {
  View,
  StyleSheet,
  Image,
  Text,
  ImageBackground,
  Animated,
  Easing,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native'
import propTypes from 'prop-types'
import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import { Badge } from 'react-native-elements'
import PlayBar from './PlayBar'
import setAxios from '../../../utils/axios'
import moment from 'moment'

class Audio extends Component {
  constructor(props) {
    super(props)
    this.spinValue = new Animated.Value(0)
    this.state = {
      timer: false,
      commentCount: 0,
      isShowLyric: false,
      currentTime: '00:00:00',
    }
    this.value = 0
    this.current_index = 0
  }

  componentWillUnmount() {
    this.setState({
      timer: false,
    })
  }
  spin = () => {
    this.spinValue.setValue(this.value)

    Animated.timing(this.spinValue, {
      toValue: ++this.value,
      duration: 25,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => this.state.timer && this.spin())
  }

  handleUpdateTimer = (data) => {
    this.setState(
      {
        timer: data,
      },
      () => {
        this.state.timer && this.spin()
      }
    )
  }
  componentDidMount = () => {
    const { musicId } = this.props
    setAxios(`comment/music?id=${musicId}`).then((v) => {
      this.setState({
        commentCount: v.total,
      })
    })
  }
  handleRecode = () => {
    const { isShowLyric: prevShowLyric } = this.state
    const isShowLyric = !prevShowLyric

    this.setState({
      isShowLyric,
    })
  }
  handleGetCurrentTime = (prevCurrentTime) => {
    const currentTime = moment(prevCurrentTime)
      .utcOffset(0)
      .format('HH:mm:ss')

    this.setState({
      currentTime,
    })
  }

  render() {
    const { picUrl, navigation, musicUrl, musicId, lyricInfo } = this.props
    const { isShowLyric, currentTime } = this.state
    const spin = this.spinValue.interpolate({
      inputRange: [this.value, this.value + 1],
      outputRange: [this.value + 'deg', this.value + 1 + 'deg'],
    })
    const iconContent = [
      { name: 'heart', size: 25 },
      { name: 'download', size: 25 },
      {
        name: 'message-square',
        size: 25,
        onPress: () => {
          navigation.navigate('Comments', { headerTitle: '评论', musicId })
        },
      },
      { name: 'more-vertical', size: 25 },
    ]

    return (
      <View style={styles.container}>
        {isShowLyric ? (
          <TouchableWithoutFeedback onPress={this.handleRecode}>
            <View style={{ width: '100%', height: 370, justifyContent: 'space-around', alignItems: 'center' }}>
              <View style={{ overflow: 'hidden', height: 220, width: '100%' }}>
                <View style={{ height: 220, width: '100%', position: 'absolute', top: -25 * this.current_index }}>
                  {lyricInfo.lyric.map((v, index) => {
                    if (currentTime > lyricInfo.lyric[index].time) {
                      this.current_index = index
                    } else if (currentTime === lyricInfo.lyric[0].time) {
                      this.current_index = 0
                    }

                    let isFalse = currentTime > lyricInfo.lyric[index].time || index === 0
                    return (
                      <Text
                        key={index}
                        style={{
                          height: 20,
                          marginTop: 5,
                          fontSize: 12,
                          textAlign: 'center',
                          color: isFalse ? 'red' : 'black',
                        }}
                      >
                        {v.txt}
                      </Text>
                    )
                  })}
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <View style={styles.container}>
            <TouchableWithoutFeedback onPress={this.handleRecode}>
              <Animated.View style={Object.assign({}, styles.record_Warpper, { transform: [{ rotate: spin }] })}>
                <ImageBackground
                  source={require('../../../assets/recode_cover.jpg')}
                  style={{ width: 236, height: 236 }}
                >
                  <View style={styles.recode}>
                    <Image style={styles.recode_pic} source={{ uri: picUrl }} />
                  </View>
                </ImageBackground>
              </Animated.View>
            </TouchableWithoutFeedback>
            <View style={styles.controlBar}>
              <View style={styles.controlBar_icon}>
                {iconContent.map((v, index) => (
                  <View key={index}>
                    {index === 2 ? (
                      <View style={{ position: 'absolute', top: -13, right: -37, width: 50 }} key={10}>
                        <Text style={{ fontSize: 11 }}>
                          {this.state.commentCount > 1000 ? '999+' : this.state.commentCount}
                        </Text>
                      </View>
                    ) : null}
                    <Icon {...v} />
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}
        <View style={styles.slide_bar}>
          <View style={{ height: 106 }}>
            <PlayBar
              onUpdate={this.handleUpdateTimer}
              navigation={navigation}
              musicUrl={musicUrl}
              onUpdateTime={this.handleGetCurrentTime}
            />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  record_Warpper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
    height: 360,
  },
  recode: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 236,
    height: 236,
    borderRadius: 118,
  },
  recode_pic: {
    width: 153,
    height: 153,
    borderRadius: 76.5,
  },
  controlBar: {
    height: 27,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlBar_icon: {
    height: 27,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    color: 'rgba(153, 153, 153, 1)',
  },
  slide_bar: {
    height: 140,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Audio

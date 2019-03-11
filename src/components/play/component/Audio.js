import { View, StyleSheet, Image, Text, ImageBackground, Animated, Easing, Dimensions } from 'react-native'
import propTypes from 'prop-types'
import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import PlayBar from './PlayBar'

class Audio extends Component {
  constructor(props) {
    super(props)
    this.spinValue = new Animated.Value(0)
    this.state = {
      timer: false,
    }
    this.value = 0
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
    this.setState({
      timer : data
    },()=>{
      this.state.timer && this.spin()
    })
  }

  render() {
    const { picUrl , navigation, musicUrl, musicId } = this.props
    const spin = this.spinValue.interpolate({
      inputRange: [this.value, this.value + 1],
      outputRange: [this.value + 'deg', (this.value + 1) + 'deg'],
    })
    const iconContent = [
      {name:'heart', size:25},
      {name:'download', size:25},
      {name:'message-square', size:25, onPress:()=> { navigation.navigate('Comments',{ headerTitle: '评论', musicId }) }},
      {name:'more-vertical', size:25}
    ]

    return (
      <View style={styles.container}>
        <Animated.View style={Object.assign({}, styles.record_Warpper, { transform: [{ rotate: spin }] })}>
          <ImageBackground source={require('../../../assets/recode_cover.jpg')} style={{ width: 236, height: 236 }}>
            <View style={styles.recode}>
              <Image style={styles.recode_pic} source={{ uri: picUrl }} />
            </View>
          </ImageBackground>
        </Animated.View>
        <View style={styles.controlBar}>
          <View style={styles.controlBar_icon}>
            { iconContent.map((v,index)=> <Icon {...v} key={index}/>) }
          </View>
          <View style={{ height: 106 }}>
            <PlayBar onUpdate = { this.handleUpdateTimer } navigation={ navigation } musicUrl={ musicUrl }/>
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
    height:200,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems:'center'
  },
  controlBar_icon: {
    height:27,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    width:Dimensions.get('window').width,
    color: 'rgba(153, 153, 153, 1)'
  }
})

export default Audio

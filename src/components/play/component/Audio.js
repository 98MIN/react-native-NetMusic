import { View, StyleSheet, Image, Text, ImageBackground, Animated, Easing } from 'react-native'
import propTypes from 'prop-types'
import React,{ Component } from 'react'

class Audio extends Component {
  constructor(props) {
    super(props);
    this.spinValue = new Animated.Value(0)
    this.state = {
      timer : true
    }
  }
  componentDidMount(){
    this.spin()
  }
  componentWillUnmount(){
    this.setState({
      timer : false
    })

  }
  spin = () => {
    this.spinValue.setValue(0)

    Animated.timing(this.spinValue,{
      toValue : 1,
      duration : 4000,
      easing : Easing.linear,
      useNativeDriver: true
    }).start(()=>this.state.timer && this.spin())
  }
  render() {
    const { picUrl } = this.props
    const spin = this.spinValue.interpolate({
      inputRange: [0,1],
      outputRange:['0deg','360deg']
    })

    return (
      <View style={styles.container}>
        <Animated.View style={Object.assign({},styles.record_Warpper,{transform:[{rotate:spin}]})}>
          <ImageBackground source = {require('../../../assets/recode_cover.jpg')} style={{width: 236,height: 236}}>
            <View style={styles.recode}>
              <Image style={styles.recode_pic} source={{ uri : picUrl }}/>
            </View>
          </ImageBackground>
        </Animated.View>
      </View>
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
    height: 360,
  },
  recode: {
    justifyContent:'center',
    alignItems:'center',
    width: 236,
    height: 236,
    borderRadius: 118,
  },
  recode_pic:{
    width: 153,
    height: 153,
    borderRadius: 76.5,
  }
})

export default Audio;

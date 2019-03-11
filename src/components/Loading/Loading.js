import React, { Component } from 'react'
import propTypes from 'prop-types'
import Icon from 'react-native-vector-icons/Feather'
import { StyleSheet, Animated, Easing, View } from 'react-native'

class Loading extends Component{
    constructor(props){
        super(props)
        this.spinValue = new Animated.Value(0)
        this.timer = true
    }

    static defaultProps = {
      color: 'black',
      size: 25
    }
    static propTypes = {
      color: propTypes.string,
      size: propTypes.number
    }

    spin = () => {
        this.spinValue.setValue(0)
        Animated.timing(this.spinValue,{
          toValue: 1,
          duration: 2000,
          easing: Easing.linear
       }).start(() => this.timer && this.spin())
    }
    componentDidMount(){
        this.spin()
    }
    componentWillUnmount(){
        this.timer = false
    }

    render(){
        const { color, size } = this.props
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],//输入值
            outputRange: ['0deg', '360deg'] //输出值
          })

          return(
            <View style={styles.container}>
                <Animated.Text style={{ transform:[{ rotate: spin }] }}>
                    <Icon name={ 'loader' } size={ size } color={ color }/>
                </Animated.Text>
            </View>
          )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Loading


import React,{ Component } from 'react'
import { View , Image , Dimensions } from 'react-native'

class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {  };

    this.timer = null
  }
  componentDidMount(){
   const { addListener , navigate } = this.props.navigation

   addListener('didFocus',()=>{
      this.timer = setInterval(()=>{
        navigate("Login")
      },1500)
   })

   addListener('didBlur',()=>{
      clearInterval(this.timer)
   })
  }

  render() {
    const { height,width } = Dimensions.get('window')
    return (
      <View>
        <Image source={require('../../assets/timg.jpg')} style={{height,width}}/>
      </View>
    );
  }
}

export default Start;

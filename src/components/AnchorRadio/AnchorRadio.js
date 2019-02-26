import { View,Text } from 'react-native'
import React,{ Component } from 'react'
import Icon from "react-native-vector-icons/AntDesign"

class AnchorRadio extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <View>
        <Text>AnchorRadio</Text>
        <Icon name="plussquareo"/>
      </View>
    );
  }
}

export default AnchorRadio;

import React,{ Component } from 'react'
import { View,Text } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import CommentBar from './components/CommentBar'
class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  static navigationOptions = (({ navigation: { state: { params } }})=>{

    return {
      headerTitle: params.headerTitle,
      headerRight:<View style={{marginRight:15}}><Icon name={"share-2"} size={ 18 } color={'white'}/></View>,
      headerTitleStyle: {
        alignSelf: 'center',
        textAlign: 'center',
        flex: 1,
        fontSize: 16,
        fontFamily: 'Microsoft YaHei',
        color: 'white'
      },
      headerStyle:{
        backgroundColor: 'rgb(206,19,33)'
      },
      headerTintColor:'white'
    }
  })
  render() {
    return (
      <View>

      </View>
    );
  }
}

export default Comments;

import React, { Component } from 'react'
import { View, Text} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import setAxios from '../../utils/axios'

class PlayPage extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }


  componentDidMount(){
    console.log(this.props)
    const { musicId } = this.props.navigation.state.params

    setAxios(`song/detail?ids=${musicId}`).then(v=>{
      console.log(v)
    })
  }

  static navigationOptions =({ navigation }) => {
    const { params } = navigation.state

    return {
      title:params.musicName,
      headerRight:<View style={{marginRight:15}}><Icon name={"share-2"} size={ 18 } color={'white'}/></View>,
      headerRightStyle:{
        borderWidth:1
      },
      headerTitleStyle:{
        alignSelf: 'center',
        textAlign:'center',
        flex:1,
        fontSize:16,
        fontFamily: 'Microsoft YaHei',
        color:'rgb(255, 255, 255)',
      },
      headerStyle:{
        backgroundColor:'rgb(206,19,33)'
      },
      headerTintColor:'white'
    }
  }
  render() {
    return (
      <View>
        <Text>
          222222
        </Text>
      </View>
    );
  }
}

export default PlayPage;

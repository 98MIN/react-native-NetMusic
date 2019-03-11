import React,{ Component } from 'react'
import { View,Text, StyleSheet, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import CommentBar from './components/CommentBar'
import setAxios from '../../utils/axios'
import { getCommentInfo } from './commentsAdapter'

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentInfo: []
    };
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

  componentDidMount = () => {
    const { navigation: { state: { params: { musicId }}} } = this.props

    setAxios(`comment/music?id=${musicId}&limit=1`).then(v=>{
      this.setState({
        commentInfo: getCommentInfo(v)
      })
    })
  }

  render() {
    const { commentInfo } = this.state

    return (
      <ScrollView style={StyleSheet.container}>
       { commentInfo.map((item,index)=>{
       return  <CommentBar {...item} key={index}/>
      })}
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
export default Comments;

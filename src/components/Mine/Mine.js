import * as React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Header } from 'react-native-elements'
import setAxios from '../../utils/axios'
import { observer, inject } from 'mobx-react'

@inject('Store')
@observer
class Mine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createPlayList: [],
      subscribedPlayList: []
    };
  }
  componentDidMount() {
    const { Store: { userId }} = this.props

    setAxios(`user/playlist?uid=374434203`).then(v=>{
      let res = separatePlayList(v.playlist)

      this.setState({
        createPlayList: res.createPlayList,
        subscribedPlayList: res.subscribedPlayList
      })
    })

    // playlist/detail?id=24381616    列表id
  }

  render() {
    const { createPlayList, subscribedPlayList } = this.state

    return (
      <View>
        <Header
          centerComponent={{ text: '我的音乐', style: { color: '#fff' } }}
          containerStyle={{backgroundColor:'rgb(206,19,33)',height: 50,borderWidth: 1}}
          centerContainerStyle={{height: 40}}
        />
        <ScrollView>

        </ScrollView>
      </View>
    );
  }
}

export default Mine;

function separatePlayList(data){
  console.log('data',data)
  let createPlayList = data.filter(v=> !v.subscribed)
  let subscribedPlayList = data.filter(v=> v.subscribed)

  return {
    createPlayList,
    subscribedPlayList
  }
}

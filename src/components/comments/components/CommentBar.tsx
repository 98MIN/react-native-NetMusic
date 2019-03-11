import * as React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

class CommentBar extends React.Component<{
  uri: string,
  nickName: string,
  dataTime: number,
  likeCount: number,
  comments: string,
  isLiked: boolean
},{}> {
  constructor(props) {
    super(props);
  }

  render() {
    const { uri, nickName, dataTime, likeCount, comments, isLiked } = this.props

    return (
      <View style = {styles.container}>
        <View style={ styles.top }>
          <View style={{ marginLeft: 10 }}>
            <Image source={{ uri }} style={{ width:45, height:45, borderRadius: 22.5 }}/>
          </View>
          <View style={{ justifyContent: 'center', width: 223, marginLeft: 10, marginRight: 10, }}>
            <View style={{ height: 28 }}>
              <Text style={{ fontSize : 12}}>{ nickName }</Text>
            </View>
            <View style={{ height: 16 }}>
              <Text style={{ fontSize : 9 }}>{ dataTime }</Text>
            </View>
          </View>
          <View>
          <View style={{ height: 28,flexDirection: 'row'  }}>
            <Text style={{ width: 37, fontSize: 11 }}>{ likeCount }</Text>
            <Icon name={'heart'} onPress={()=>console.log('Hello World')} comtainerStyle={{ width: 16 }} size={13} color={ isLiked ? 'red' : '' }/>
          </View>
            <View style={{ height: 16 }}></View>
          </View>
        </View>
        <View style={ styles.bottom }>
          <View style={{width: 281}}><Text>{ comments }</Text></View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: 91,
    width:"100%"
  },
  top: {
    flexDirection: 'row',
    height: 45,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  bottom: {
    alignItems: 'flex-end',
    borderWidth: 1
  }
})

export default CommentBar;

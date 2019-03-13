import * as React from 'react'
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import moment from 'moment'
import { format } from '../../../utils/utils'
import setAxios from '../../../utils/axios'

class CommentBar extends React.Component<
  {
    uri: string
    nickName: string
    dataTime: number
    likeCount: number
    comments: string
    isLiked: boolean
    commentId: number
  },
  {}
> {
  constructor(props) {
    super(props)
  }

  handleLiked = (commentId, isLiked) => {
    const { onUpdate, musicId } = this.props
    const t = isLiked ? 0 : 1
    const time = new Date().getTime()

    setAxios(`comment/like?id=${musicId}&cid=${commentId}&t=${t}&type=0&time=${time}`).then((v) => {
      console.log(v)
      onUpdate()
    })
  }
  render() {
    const { uri, nickName, dataTime, likeCount, comments, isLiked, commentId } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={{ marginLeft: 10 }}>
            <Image source={{ uri }} style={{ width: 45, height: 45, borderRadius: 22.5 }} />
          </View>
          <View style={{ justifyContent: 'center', width: 223, marginLeft: 10, marginRight: 10 }}>
            <View style={{ height: 28, justifyContent: 'center' }}>
              <Text style={{ fontSize: 12, color: 'rgba(67, 67, 67, 1)' }}>{nickName}</Text>
            </View>
            <View style={{ height: 16, justifyContent: 'center' }}>
              <Text style={{ fontSize: 10, color: 'rgba(128, 128, 128, 1)' }}>
                {moment(dataTime).format('YYYY-MM-DD HH:mm:ss')}
              </Text>
            </View>
          </View>
          <View>
            <View style={{ height: 28, flexDirection: 'row', marginRight: 10 }}>
              <Text style={{ width: 40, fontSize: 11, marginRight: 5 }}>{format(likeCount)}</Text>
              <Icon
                name={'heart'}
                onPress={this.handleLiked.bind(this, commentId, isLiked)}
                size={13}
                color={isLiked ? 'red' : 'gray'}
              />
            </View>
            <View style={{ height: 16 }} />
          </View>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <View style={styles.bottom}>
            <Text style={{ fontSize: 12, color: 'rgba(67, 67, 67, 1)' }}>{comments}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: '100%',
    paddingBottom: 10,
    paddingTop: 10,
    borderBottomColor: 'rgba(80, 80, 80, 1)',
  },
  top: {
    flexDirection: 'row',
    height: 45,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  bottom: {
    width: 285,
    paddingBottom: 10,
    paddingTop: 5,
    marginRight: 10,
    borderBottomWidth: 1,
    borderColor: 'rgb(241, 241, 241)',
  },
})

export default CommentBar

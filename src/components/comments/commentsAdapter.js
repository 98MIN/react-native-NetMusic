import * as _ from 'lodash'
export function getCommentInfo( data ){
  let arr = []

  data.hotComments.map(v=>{
    arr.push({
      uri: _.get(v,'user.avatarUrl'),
      nickName: _.get(v,'user.nickname'),
      dataTime: _.get(v,'time'),
      likeCount: _.get(v,'likedCount'),
      comments: _.get(v,'content').replace(/\r\n/gi,'<br>'),
      isLiked: _.get(v,'liked'),
      commentId: _.get(v,'commentId')
    })
  })

  return arr
}






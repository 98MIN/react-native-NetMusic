export function getLyricInfo(data){
  const { lyricUser, lrc:{ lyric } } = data

  return {
    lyric: lyric.split('↵'),
    lyricContributor:{
      userName: lyricUser.nickName,
      userId: lyricUser.userid
    }
  }

}

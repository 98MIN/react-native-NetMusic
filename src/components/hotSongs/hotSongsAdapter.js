import * as _ from 'lodash'

export function formatterHotSongsList(data){
  let musicInfo = []

  data.map(item=>{
    musicInfo.push({
        picUrl :item.al.picUrl,
        songName:item.name,
        musicId:item.id,
        musicTime:item.dt,
        authorNames:item.ar.map(v=>v.name).join(' · '),
      })
  })

  return musicInfo
}

export function formatterDailyPushSongs(data){
  let musicInfo = []

  data.map(v=>{
    musicInfo.push({
      picUrl: _.get(v,'album.picUrl'),
      songName: v.name,
      musicId: v.id,
      musicTime: _.get(v,'bMusic.playTime'),
      authorNames: _.get(v,'artists','[]').map(item=> item.name).join(' · '),
      albumName: _.get(v,'album.name')
    })
  })

  return musicInfo
}

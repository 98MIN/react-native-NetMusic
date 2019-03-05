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
      picUrl: v.album.picUrl,
      songName: v.name,
      musicId: v.id,
      musicTime: v.bMusic.playTime,
      authorNames: v.artists.map(item=> item.name).join(' · '),
      albumName: v.album.name
    })
  })

  return musicInfo
}

export function formatterSongsList(data){
  let musicInfo = []

  data.map(item=>{
    musicInfo.push({
        picUrl :item.al.picUrl,
        songName:item.name,
        musicId:item.id,
        musicTime:item.dt,
        authorNames:item.ar.map(v=>v.name).join(' · ')
      })
  })

  return musicInfo
}

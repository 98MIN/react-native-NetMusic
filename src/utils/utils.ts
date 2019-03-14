import cityJSON from './city'

interface LyricInfo {
  time: string
  txt: string
}

export function cityFormatter(cityCode: number): string {
  let city: string = ''

  for (var key in cityJSON) {
    cityJSON[key].map((v) => {
      if (v[1] === cityCode) {
        city = key + ' · ' + v[0]
      }
    })
  }

  return city
}

export function lyricFormatter(data: string): LyricInfo[] {
  let lyricInfo: LyricInfo[] = []
  let time: string[] = []
  let txt: string[] = []
  let str: string = data.replace(/\]\[/g, '] [')
  let arr = str.match(/(\[\d{2}:\d{2}\.\d{2}\])(.[^\[\]]*)?/g)

  for (let i = 0; i < arr.length; i++) {
    ;/^(\[\d{2}:\d{2}\.\d{2}\])(.[^\[\]]*)?$/.exec(arr[i])
    time.push(RegExp.$1)
    txt.push(RegExp.$2)
  }
  time.map((v, index) => {
    lyricInfo.push({ time: v, txt: txt[index].replace(/\n/gi, '') })
  })

  return lyricInfo
}

export function floorTime(data: number): number {
  let interValue: number = data / 1000

  return Math.floor(interValue) * 1000
}


export function format(data: number):string {

  return data > 9999 ? (data > 1000000 ? parseInt((data/10000).toString())+'万' : (data/10000).toFixed(2)+'万')  : data.toString()
}


export function debounce(fn,interval = 1000){
  let timer = null
  return function(){
    clearTimeout(timer)
    timer = setTimeout(()=>{
      fn.apply(this,arguments)
    },interval)
  }
}

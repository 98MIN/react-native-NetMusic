import cityJSON from './city'

export default function cityFormatter(cityCode: number): string {
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

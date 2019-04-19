export function getPersonalizedInfo(data) {
  let result = []

  data.map((v) => {
    result.push({
      name: v.name,
      id: v.id,
      picUrl: v.picUrl,
      playCount: v.playCount,
    })
  })

  return result
}

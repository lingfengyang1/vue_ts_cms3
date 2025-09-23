import { coordinateData } from './coordinate-data'

// 地图所需数据的形式为对象数组 而对象形式为key:城市名, value:城市经纬度+城市值所组成的数组
export function convertData(data: any) {
  const res = []
  for (let i = 0; i < data.length; i++) {
    const geoCoord = coordinateData[data[i].name]
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
      })
    }
  }
  return res
}

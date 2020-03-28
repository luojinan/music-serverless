// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

const request = require('request-promise')
const url = 'http://musicapi.xiecheng.live/personalized'

const Playlist = db.collection('playlist')
// 云函数入口函数
exports.main = async (event, context) => {
  const res = await request(url)
  const playlist = JSON.parse(res).result
  
  // 查重处理
  const localList = await Playlist.get()
  const newData = []
  for (const item of playlist) {
    let flag = true
    for (const localItem of localList.data) {
      if(item.id===localItem.id){
        flag = false  // 当远程数据与本地数据相同时，不插入数据库
        break
      }
    }
    if(flag) newData.push(item)
  }
  // console.log('云函数请求返回值',playlist);

  // 遍历插入数据库
  for (const item of newData) {
    await Playlist.add({
      data:{
        ...item,
        createTime:db.serverDate()
      }
    })
  }

  return newData
}
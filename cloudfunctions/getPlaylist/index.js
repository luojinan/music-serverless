// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

const request = require('request-promise')
const url = 'http://musicapi.xiecheng.live/personalized'

const Playlist = db.collection('playlist')
// 云函数入口函数
exports.main = async (event, context) => {
  // 获取网易云歌单列表数据
  const res = await request(url)
  const playlist = JSON.parse(res).result
  // 获取小程序云数据库歌单数据
  // 获取云数据库数量，做分割
  const countRes = await Playlist.count() // 获取当前云数据库列表数量，返回的是{}
  const total = countRes.total
  const getTimes = Math.ceil(total/100) //总数除以100，向上取整
  let promiseList = []
  for (let index = 0; index < getTimes; index++) {
    const promise = Playlist.skip(index*100).limit(100).get() // 数据库操作promise
    promiseList.push(promise)
  }
  let localList = []
  if(promiseList.length>0){
    const list = await Promise.all(promiseList) // all返回的是每次请求的数组(每次请求返回对象)
    // 拼接结果 {data:[]}
    localList = list.reduce((pre,next)=>{
      return pre.data.concat(next.data)
    })
  }

  // 查重处理
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
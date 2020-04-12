// 音乐相关云函数
const cloud = require('wx-server-sdk')

cloud.init()
const db =  cloud.database()
const Playlist = db.collection('playlist')

// 请求网易云数据
const request = require('request-promise')
const BASE_URL = 'http://musicapi.xiecheng.live'


// 引入类路由中间件
const TcbRouter = require('tcb-router');

// 云函数入口函数
exports.main = async (event, context) => {
  // 实例化中间件
  const app = new TcbRouter({ event }) // 传入前端上传参数

  // 分页获取首页云数据库中歌单列表
  app.router('playlist',async(ctx,next)=>{
    const total = await Playlist.count()  // 返回的是对象
    const res = await Playlist.skip(event.start)
                              .limit(event.limit)
                              .orderBy('createTime','desc')
                              .get()
    // 该路由返回值，不再是直接return
    ctx.body = {...res,total:total.total}
  })

  // 获取网易云歌单歌曲列表
  app.router('musiclist',async(ctx,next)=>{
    // 获取网易云歌单列表数据
    const res = await request(`${BASE_URL}/playlist/detail?id=${event.playlistId}`)
    const musiclist = JSON.parse(res)
    // 该路由返回值，不再是直接return
    ctx.body = musiclist
  })

  // 根据musicId获取音频资源地址
  app.router('musicUrl',async(ctx,next)=>{
    // 获取网易云歌单列表数据
    const res = await request(`${BASE_URL}/song/url?id=${event.musicId}`)
    const musicUrlRes = JSON.parse(res)
    // 该路由返回值，不再是直接return
    ctx.body = musicUrlRes
  })

  // 根据musicId获取歌词字符串数据
  app.router('lyric',async(ctx,next)=>{
    // 获取网易云歌单列表数据
    const res = await request(`${BASE_URL}/lyric?id=${event.musicId}`)
    const lyricRes = JSON.parse(res)
    // 该路由返回值，不再是直接return
    ctx.body = lyricRes
  })

  // 云函数返回中间处理后的路由
  return app.serve()
}
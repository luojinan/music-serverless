// 音乐相关云函数
const cloud = require('wx-server-sdk')

cloud.init()
const db =  cloud.database()
const Playlist = db.collection('playlist')

// 引入类路由中间件
const TcbRouter = require('tcb-router');

// 云函数入口函数
exports.main = async (event, context) => {
  // 实例化中间件
  const app = new TcbRouter({ event }) // 传入前端上传参数

  app.router('playlist',async(ctx,next)=>{
    const res = await Playlist.skip(event.start)
                              .limit(event.limit)
                              .orderBy('createTime','desc')
                              .get()
    // 该路由返回值，不再是直接return
    ctx.body = res
  })

  // 云函数返回中间处理后的路由
  return app.serve()
}
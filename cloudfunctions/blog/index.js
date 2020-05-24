// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db =  cloud.database()
const Blog = db.collection('blog')
const BlogComment = db.collection('blog-comment')
const Max_LIMEIT = 100
// 引入类路由中间件
const TcbRouter = require('tcb-router');

// 云函数入口函数
exports.main = async (event, context) => {
  // 实例化中间件
  const app = new TcbRouter({ event }) // 传入前端上传参数

  // 分页获取blog列表
  app.router('bloglist',async(ctx,next)=>{
    // 模糊查询-where() 正则,当正则需要用到变量时用`db.RegExp()`，其他情况可以直接/xxxx/
    const searchKey = event.searchKey
    let w = {}
    if(searchKey.trim()!=''){
      w = {
        msgText:db.RegExp({
          regexp:searchKey,
          options:'i'
        })
      }
    }

    const total = await Blog.where(w).count()  // 返回的是对象
    const res = await Blog.where(w).skip(event.start)
                              .limit(event.limit)
                              .get()
    // 该路由返回值，不再是直接return
    ctx.body = {...res,total:total.total}
  })
// 博客详情
app.router('detail',async(ctx,next)=>{
  const blogId = event.blogId
  const blogDetail = await Blog.doc(blogId).get()

  // 该路由返回值，不再是直接return
  ctx.body = {blogDetail,commentRes}
})

// 我的博客列表
app.router('getBlogByOpenid',async(ctx,next)=>{
  const wxContext = cloud.getWXContext()
    const total = await Blog.where({openid:wxContext.OPENID}).count()  // 返回的是对象
    const res = await Blog.where({_openid:wxContext.OPENID})
                                .skip(event.start)
                                .limit(event.limit)
                                .orderBy('createTime','desc')
                                .get()
  // 该路由返回值，不再是直接return
  ctx.body = {...res,total:total.total}
})

  return app.serve()
}
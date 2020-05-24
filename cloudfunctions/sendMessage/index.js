// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.subscribeMessage.send({
        touser: cloud.getWXContext().OPENID, // 通过 getWXContext 获取 OPENID
        page: `/pages/blog-detail/blog-detail?id=${event.blogId}`,
        lang: 'zh_CN',
        data: {
          thing1: {
            value: event.content
          },
          time2: {
            value: '2020年10月12日 15:00'
          },
          name3: {
            value: event.nickName
          }
        },
        templateId: '8PSxFGQHfCbakxq_dyIMsd95QlIoh5saUJ4AU3a-FNA',
        miniprogramState: 'developer'
      })
    return result
  } catch (err) {
    return err
  }
}
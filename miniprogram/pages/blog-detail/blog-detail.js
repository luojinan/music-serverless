// miniprogram/pages/blog-detail/blog-detail.js
import formatTime from "../../utils/formatTime";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    blogId:'',
    blogDetail:{},
    commentList:[]
  },
  async getBlogDetail(){
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    const res = await wx.cloud.callFunction({
      name:'blog',
      data:{
        $url:'detail',
        blogId:this.data.blogId
      }
    })
    console.log(res.result.blogDetail.data);
    let commentList = res.result.commentRes.data
    for (const item of commentList) {
      item.createTime = formatTime(new Date(item.createTime))
    }
    this.setData({
      blogDetail:res.result.blogDetail.data,
      commentList
    })
    wx.hideLoading()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      blogId:options.id
    })
    this.getBlogDetail()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    return{
      title:this.data.blogDetail.msgText,
      path:`/pages/blog-detail/blog-detail?id=${this.data.blogDetail._id}`
    }
  }
})
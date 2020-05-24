// miniprogram/pages/profile-bloghistory/profile-bloghistory.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    blogList:[],
    total:0
  },
  async init(){
    wx.showLoading({title:'加载中...'});
    const res = await wx.cloud.callFunction({
      name:'blog',
      data:{
        start:this.data.blogList.length,
        limit:10,
        $url:'getBlogByOpenid'
      }
    })
    this.setData({
      blogList:this.data.blogList.concat(res.result.data),
      total: res.result.total
    })
    wx.hideLoading()
    wx.stopPullDownRefresh()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init()
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
    this.setData({
      blogList:[]
    })
    this.init()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.blogList.length == this.data.total) return
    this.init()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
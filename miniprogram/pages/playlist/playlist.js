// miniprogram/pages/playlist/playlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperImgUrls:[{url:''},{url:''},{url:''}],
    playlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    console.log('请求云函数');
    const res = await wx.cloud.callFunction({
      name:'music',
      data:{
        start:this.data.playlist.length,
        limit:15,
        $url:'playlist'
      }
    })
    console.log(res.result.data);
    this.setData({
      playlist:res.result.data
    })
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
  onShareAppMessage: function () {

  }
})
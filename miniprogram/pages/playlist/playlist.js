// miniprogram/pages/playlist/playlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperImgUrls:[{url:''},{url:''},{url:''}],
    playlist:[],
    total:-1
  },
  async getMusicList(){
    wx.showLoading({title:'加载中...'});
    const res = await wx.cloud.callFunction({
      name:'music',
      data:{
        start:this.data.playlist.length,
        limit:15,
        $url:'playlist'
      }
    })
    console.log(res.result);
    this.setData({
      playlist:this.data.playlist.concat(res.result.data),
      total: res.result.total
    })
    wx.hideLoading()
    wx.stopPullDownRefresh()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getMusicList()
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
      playlist:[]
    })
    this.getMusicList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.playlist.length == this.data.total) return
    this.getMusicList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
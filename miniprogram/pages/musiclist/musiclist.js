// miniprogram/pages/musiclist/musiclist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailInfo:{},
    list:[]
  },
  async getMusicList(playlistId){
    wx.showLoading({title:'加载中...'});
    const {result:{playlist}} = await wx.cloud.callFunction({
      name:'music',
      data:{
        playlistId,
        $url:'musiclist'
      }
    })
    console.log('获取歌单歌曲列表',playlist)
    this.setData({
      list:playlist.tracks,
      detailInfo:{
        name:playlist.name,
        coverImgUrl:playlist.coverImgUrl
      }
    })
    wx.hideLoading()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMusicList(options.playlistId)
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
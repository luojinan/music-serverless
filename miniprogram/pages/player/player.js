// miniprogram/pages/player/player.js
const backAudioManager = wx.getBackgroundAudioManager()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _musicDetail:'',
    songImgUrl:'',
    isPlaying:false
  },
  // 切换播放状态
  togglePlaying(){
    if(this.data.isPlaying) backAudioManager.pause()
    else backAudioManager.play()
    this.setData({
      isPlaying:!this.data.isPlaying
    })
  },
  async getMusicUrl(musicId){
    wx.showLoading({title:'歌曲加载中...'});
    const res = await wx.cloud.callFunction({
      name:'music',
      data:{
        musicId,
        $url:'musicUrl'
      }
    })
    console.log('获取歌单歌曲列表',res)
    backAudioManager.src = res.result.data[0].url
    backAudioManager.title = this.data._musicDetail.name
    backAudioManager.coverImgUrl = this.data._musicDetail.al.picUrl
    backAudioManager.singer = this.data._musicDetail.ar[0].name
    backAudioManager.epname = this.data._musicDetail.al.name
    this.setData({
      isPlaying:true
    })
    wx.hideLoading()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const musiclist = wx.getStorageSync('musiclist')
    console.log('歌曲详情',musiclist[options.index])
    this.data._musicDetail = musiclist[options.index]
    wx.setNavigationBarTitle({title: this.data._musicDetail.name}) // 动态标题-歌曲名
    this.setData({
      songImgUrl: this.data._musicDetail.al.picUrl
    })
    console.log('歌曲id',options);
    this.getMusicUrl(options.musicId)
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
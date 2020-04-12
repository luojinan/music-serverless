// miniprogram/pages/player/player.js
const backAudioManager = wx.getBackgroundAudioManager()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _musiceIndex:'',  // 当前歌曲在歌曲列表中序列
    _musicDetail:'',  // 根据序列从歌曲列表中取歌曲详情数据
    _musicList:[],    // 本地缓存跳转来的歌曲列表
    songImgUrl:'',    // 根据歌曲id云函数获取的歌曲资源url
    isPlaying:false,
    showLyric:false   // 控制显示歌词组件
  },
  onNext(){
    this.data._musiceIndex++
    if(this.data._musiceIndex == this.data._musicList.length){
      this.data._musiceIndex = 0
    }
    this.getMusicDetail()
  },
  onPrev(){
    this.data._musiceIndex--
    if(this.data._musiceIndex < 0 ){
      this.data._musiceIndex = this.data._musicList.length-1
    }
    this.getMusicDetail()
  },
  // 切换显示歌词
  onChangeShowLyric(){
    this.setData({
      showLyric:!this.data.showLyric
    })
  },
  // 切换播放状态
  togglePlaying(){
    if(this.data.isPlaying) backAudioManager.pause()
    else backAudioManager.play()
    this.setData({
      isPlaying:!this.data.isPlaying
    })
  },
  // 云函数获取音乐资源url
  async getMusicUrl(){
    wx.showLoading({title:'歌曲加载中...'});
    const res = await wx.cloud.callFunction({
      name:'music',
      data:{
        musicId:this.data._musicList[this.data._musiceIndex].id,
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
  // 根据歌曲序列获取本地缓存当前歌曲信息
  getMusicDetail(){
    this.data._musicList = wx.getStorageSync('musiclist')
    console.log('歌曲详情',this.data._musicList[this.data._musiceIndex])
    this.data._musicDetail = this.data._musicList[this.data._musiceIndex]
    wx.setNavigationBarTitle({title: this.data._musicDetail.name}) // 动态标题-歌曲名
    this.setData({
      songImgUrl: this.data._musicDetail.al.picUrl
    })
    this.getMusicUrl()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data._musiceIndex = options.index
    this.getMusicDetail()
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
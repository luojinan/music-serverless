// miniprogram/pages/blog-edit/blog-edit.js
const MAX_WORDS_NUM = 140
const MAX_IMAGE_NUM = 140
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images:[],
    wordsNum:0,
    footerBottom:0
  },
  onChooseImage(){
    wx.chooseImage({
      count: MAX_IMAGE_NUM-this.data.images.length,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        this.setData({
          images:[...this.data.images,...result.tempFilePaths]
        })
      },
      fail: () => {},
      complete: () => {}
    });
  },
  onPreviewImage(e){
    console.log(e.target);
    wx.previewImage({
      current: e.target.dataset.imgurl,
      urls: this.data.images
    })
  },
  onDelete(e){
    this.data.images.splice(e.target.dataset.index,1)
    this.setData({
      images:this.data.images
    })
  },
  onInput(e){
    const text = e.detail.value
    if(text.length>=MAX_WORDS_NUM){
      this.setData({
        wordsNum:`最大字数为${MAX_WORDS_NUM}`
      })
    }else{
      this.setData({
        wordsNum:text.length
      })
    }
  },
  onFocus(e){
    this.setData({
      footerBottom:e.detail.height  // 键盘高度
    })
  },
  onBlur(){
    this.setData({
      footerBottom:0
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
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
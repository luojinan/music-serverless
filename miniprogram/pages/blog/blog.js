// miniprogram/pages/blog/blog.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalShow:false
  },
  onPublish(){
    // 判断是否登录（用是否授权过，而不是是否有用户信息）
    wx.getSetting({
      success: (result) => {
        if(result.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success: (res) => {
              this.onLoginSuccess({detail:res.userInfo})
            },
            fail: () => {},
            complete: () => {}
          })
        }else{
          this.setData({
            modalShow:true
          })
        }
      },
      fail: () => {},
      complete: () => {}
    });
  },
  onLoginSuccess(e){
    const userInfo = e.detail
    wx.redirectTo({
      url: `../blog-edit/blog-edit?nickName=${userInfo.nickName}&avatarUrl=${userInfo.avatarUrl}`
    })
  },
  onLoginFail(){
    wx.wx.showModal({
      title: '授权用户才能发布',
      content: '',
      success: (result) => {
        if (result.confirm) {
          this.setData({
            modalShow:false
          })
        }
      },
      fail: () => {},
      complete: () => {}
    });
      
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
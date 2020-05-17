// miniprogram/pages/blog/blog.js
import {promisify} from 'miniprogram-api-promise';
const getSetting = promisify(wx.getSetting)
const getUserInfo = promisify(wx.getUserInfo)
const showModal = promisify(wx.showModal)
Page({
  data: {
    modalShow: false
  },
  async onPublish() {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    // 判断是否登录（用是否授权过，而不是是否有用户信息）
    const res = await getSetting()
    console.log(res);
    if (res.authSetting['scope.userInfo']) {
      const result = await getUserInfo()
      this.onLoginSuccess({
        detail: result.userInfo
      })
    } else {
      wx.hideLoading();
      this.setData({
        modalShow: true
      })
    }
  },
  onLoginSuccess(e) {
    const userInfo = e.detail
    wx.redirectTo({
      url: `../blog-edit/blog-edit?nickName=${userInfo.nickName}&avatarUrl=${userInfo.avatarUrl}`
    })
  },
  async onLoginFail() {
    const res = await showModal({
      title: '授权用户才能发布',
      content: ''
    })
    if (res.confirm) {
      this.setData({
        modalShow: false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  }
})
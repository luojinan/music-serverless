// miniprogram/pages/blog-edit/blog-edit.js
import {promisify} from 'miniprogram-api-promise';
const chooseImage = promisify(wx.chooseImage)
const MAX_WORDS_NUM = 140
const MAX_IMAGE_NUM = 140
const db = wx.cloud.database()
let msgText = ''
let fileIds = []
let userInfo = {}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [],
    wordsNum: 0,
    footerBottom: 0
  },
  async uploadImg(){
    let promiseList = []
    for (const item of this.data.images) {
      let p = new Promise((resolve, reject) => {
        // 文件拓展名
        const suffix = /\.\w+$/.exec(item)[0]
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: `blog/${Date.now()}-${Math.random()*1000000}${suffix}`,
          // 指定要上传的文件的小程序临时文件路径
          filePath: item,
          success: res => {
            fileIds.push(res.fileID)
            resolve()
          },
          fail: err => {
            console.log('上传失败', err);
            reject()
          }
        })
      })
      promiseList.push(p)
    }
    const allRes = await Promise.all(promiseList).catch(err=>{
      console.log('catch到promise all的错误，不会中断逻辑，可以return标识');
      return false
    })
    if(!allRes) {
      return false
    }
    return true
  },
  async addBlog(){
    const params = {
      data: {
        msgText,
        ...userInfo,
        imgs: fileIds,
        createTime: db.serverDate()
      }
    }
    // 操作数据库，blog表
    await db.collection('blog').add(params)
    wx.showToast({title: '发布成功'})
    wx.navigateBack()
  },
  async onSubmit() {
    if (!msgText) {
      return wx.showToast({
        title: '请先填写分享内容',
        icon: 'none'
      })
    }
    wx.showLoading({
      title: '发布中',
      mask: true
    });
    const uploadRes = await this.uploadImg()
    if(!uploadRes) return wx.showToast({title:'上传失败',icon:'none'})
    this.addBlog()
  },
  async onChooseImage() {
    const res = await chooseImage({
      count: MAX_IMAGE_NUM - this.data.images.length,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera']
    })
    this.setData({
      images: [...this.data.images, ...res.tempFilePaths]
    })
  },
  onPreviewImage(e) {
    console.log(e.target);
    wx.previewImage({
      current: e.target.dataset.imgurl,
      urls: this.data.images
    })
  },
  onDelete(e) {
    this.data.images.splice(e.target.dataset.index, 1)
    this.setData({
      images: this.data.images
    })
  },
  onInput(e) {
    const text = e.detail.value
    if (text.length >= MAX_WORDS_NUM) {
      this.setData({
        wordsNum: `最大字数为${MAX_WORDS_NUM}`
      })
    } else {
      msgText = text
      this.setData({
        wordsNum: text.length
      })
    }
  },
  onFocus(e) {
    this.setData({
      footerBottom: e.detail.height // 键盘高度
    })
  },
  onBlur() {
    this.setData({
      footerBottom: 0
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    userInfo = options
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
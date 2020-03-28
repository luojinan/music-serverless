// miniprogram/pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:['html','css','js','json'],
    list2:[{id:'1',name:'html'},{id:'2',name:'js'},{id:'3',name:'css'}]
  },
  sort(){
    const length = this.data.list.length
    for (const item of this.data.list) {
      // 随机小数0-1*总数后取整数，即生成一个随机序列
      const x = Math.floor(Math.random()*length)
      const y = Math.floor(Math.random()*length)
      // 临时变量
      const temp = this.data.list[x]
      // 随机2项互换值
      this.data.list[x] = this.data.list[y]
      this.data.list[y] = temp
    }
    // 遍历4次，会有4次两两兑换
    this.setData({
      list:this.data.list
    })
  },
  sort2(){
    const length = this.data.list2.length
    for (const item of this.data.list2) {
      // 随机小数0-1*总数后取整数，即生成一个随机序列
      const x = Math.floor(Math.random()*length)
      const y = Math.floor(Math.random()*length)
      // 临时变量
      const temp = this.data.list2[x]
      // 随机2项互换值
      this.data.list2[x] = this.data.list2[y]
      this.data.list2[y] = temp
    }
    // 遍历4次，会有4次两两兑换
    this.setData({
      list2:this.data.list2
    })
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
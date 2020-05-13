// components/login/login.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    modalShow:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onGetUserInfo(e){
      // 有无游湖信息来判断点击允许授权/拒绝
      const userInfo = e.detail.userInfo
      if(userInfo){
        this.setData({
          modalShow:false
        })
        // 点击允许/拒绝后，由页面决定逻辑
        this.triggerEvent('loginsuccess',userInfo)
      }else{
        this.triggerEvent('loginfail')
      }
    }
  }
})

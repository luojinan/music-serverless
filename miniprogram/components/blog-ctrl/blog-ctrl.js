// components/blog-ctrl/blog-ctrl.js
let userInfo = ''
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  extenrnalClasses:['iconfont','icon-fenxiang','icon-pinglun'],
  /**
   * 组件的初始数据
   */
  data: {
    content:'',
    showLogin:false,
    showModal:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onComment(){
      wx.getSetting({
        success: (result) => {
          if(result.authSetting['scope.userInfo']){
            // 已登录，获取用户信息
            wx.getUserInfo({
              success: (res) => {
                userInfo = res.userInfo
                // 弹出评论底部栏
                this.setData({
                  showModal:true
                })
              }
            })
          }else{
            // 未登录，弹出登录底部栏
            this.setData({
              showLogin:true
            })
          }
        }
      });
        
    },
    onLoginSuccess(){
      this.setData({
        showLogin:false
      },()=>{
        this.setData({
          showModal:true
        })
      })
    },
    onloginFail(){
      wx.showModal({
        title: '授权用户才能进行评论',
        content: '',
      })
    }
  }
})

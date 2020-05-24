// components/blog-ctrl/blog-ctrl.js
const db = wx.cloud.database()
const BlogComment  =db.collection('blog-comment')
const tempId = '8PSxFGQHfCbakxq_dyIMsd95QlIoh5saUJ4AU3a-FNA'
let userInfo = ''
let canSendMsg = false
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
    onLoginSuccess(e){
      userInfo = e.detail
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
    },
    onInput(e){
      this.setData({
        content:e.detail.value
      })
    },
    async onSubmit(){
      if(!this.data.content.trim()){
        return wx.showModal({
          title: '评论内容不能为空',
          content: ''
        })
      }
      wx.requestSubscribeMessage({
        tmplIds: [tempId],
        success (res) { 
          console.log('是否允许',res[tempId])
          if(res[tempId]=='accept'){
            console.log('同意接收订阅消息');
            canSendMsg = true
          }
        },
        fail(err){
          console.log('err',err);
        },
        complete:()=>{
          this.postContentApi()
        }
      })
    },
    async postContentApi(){
      wx.showLoading({
        title: '评论中',
        mask: true
      });
      const content = this.data.content
      const blogId = this.data.blogId
      const res = await BlogComment.add({
        data:{
          content,
          blogId,
          createTime:db.serverDate(),
          nickName:userInfo.nickName,
          avatarUrl:userInfo.avatarUrl
        }
      })
      wx.showToast({title: '评论成功'})
      this.setData({
        showModal:false,
        content:''
      })
      // 调用云函数发送订阅消息
      if(canSendMsg){
        const sendRes = await wx.cloud.callFunction({
          name:'sendMessage',
          data:{
            content,
            blogId,
            nickName:userInfo.nickName
          }
        })
        console.log('发送结果',sendRes);
      }
    }
  }
})

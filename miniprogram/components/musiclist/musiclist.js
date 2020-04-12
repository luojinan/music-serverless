// components/musiclist/musiclist.js
const app =  getApp();

  
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    playingId:-1
  },
  pageLifetimes:{
    show(){
      this.setData({
        playingId: app.getPlayMusicId()
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onSelect(e){
      this.setData({
        playingId:e.currentTarget.dataset.musicid
      })
      this.toPlayer(e.currentTarget.dataset.index)
    },
    toPlayer(index){
      wx.navigateTo({
        url: `../../pages/player/player?index=${index}`
      })
    },
  }
})

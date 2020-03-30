// components/playlistItem/playlistItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemData:{
      type:Object,
      value:{
        name:'歌单名歌单名歌单名歌单名歌单名歌单名歌单名',
        playCount:'53254523'
      }
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
    toMusicList(){
      wx.navigateTo({
        url: `../../pages/musiclist/musiclist?playlistId=${this.data.itemData.id}`
      })
    },
  }
})

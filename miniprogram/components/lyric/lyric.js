// components/lyric/lyric.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    lyric:String  // 页面传进来的歌词字符串
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  // 监听器
  observers:{
    lyric(val){
      console.log(val);
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})

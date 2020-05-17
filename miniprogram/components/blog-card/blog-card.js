// components/blog-card/blog-card.js
import formatTime from "../../utils/formatTime";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    blog:{
      type: Object,
      value:{}
    }
  },
  observers:{
    ['blog.createTime'](val){
      if(val){
        this.setData({
          _createTime: formatTime(new Date(val))
        })
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    _createTime: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPreview(e){
      wx.previewImage({
        current: e.target.dataset.imgurl,
        urls: this.data.blog.imgs
      })
    }
  }
})

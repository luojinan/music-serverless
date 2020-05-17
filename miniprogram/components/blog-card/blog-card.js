// components/blog-card/blog-card.js
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

  /**
   * 组件的初始数据
   */
  data: {

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

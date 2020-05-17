// components/search/search.js
let searchKey = ''
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    placeholder:{
      type:String,
      value:'请输入关键词'
    }
  },
  // 接收页面传递进来的样式，不可在组件中再修改传入的class样式。[组件的样式隔离]()
  externalClasses:['iconfont-class','icon-sousuo-class'],
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSearch(){
      this.triggerEvent('onSearch',searchKey)
    },
    onInput(e){
      searchKey = e.detail.value
    }
    
  }
})

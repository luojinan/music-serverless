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
    lrcList:'',
    currentIndex:0
  },
  // 监听器
  observers:{
    lyric(val){
      // console.log(val);
      this._parseLyric(val)
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 获取当前播放秒数，并找到第几个歌词
    updateCurrentSec(second){
      console.log(second,'???');
      const lrcList = this.data.lrcList
      // 纯音乐情况
      if(lrcList.length==0) return
      for (let index = 0; index < lrcList.length; index++) {
        // 当找到当前秒数在哪个区间（10  大于1赋值1 大于2赋值2 大于3赋值3...小于则跳出），即取出index，并中断循环
        if(second<=lrcList[index].time){
          this.data.currentIndex = index-1
          break
        }
        this.setData({currentIndex: this.data.currentIndex})
      }
    },
    _parseLyric(string){
      // 用换行符分割为数组
      let arr = string.split('\n')
      let _lrcList = []

      arr.forEach(item=>{
        let time = item.match(/\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g) // 正则取出注意是数组[时间]  \d数字 {2,}2个或多个 (?)?当前项不一定
        if(time!=null){
          // 用正则匹配对数组的项做分割 从 ['时间歌词','时间歌词'....] 到 [ [时间,歌词],[时间,歌词].... ]
          let lrcText = item.split(time)[1]
          let lrcTimeArr = time[0].match(/(\d{2,}):(\d{2})(?:\.(\d{2,3}))?/) //得[ '去掉[]的分秒',分,秒,毫秒 ]
          const lrcSecont = parseInt(lrcTimeArr[1])*60 + parseInt(lrcTimeArr[2]) + parseInt(lrcTimeArr[1])/1000
          // 存入新数组中
          _lrcList.push({lrcText,time:lrcSecont})
        }
      })

      this.setData({
        lrcList:_lrcList
      })
    }
  }
})

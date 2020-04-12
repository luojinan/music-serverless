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
    currentIndex:0,   // 高亮显示的歌词序列
    scrollTop:0,      // 控制滚动位置,单位px
    _lyrTextHeight:0   // 不同手机px转rpx的值
  },
  // 监听器
  observers:{
    lyric(val){
      // console.log(val);
      if(val=='暂无歌词'){
        this.setData({
          lrcList:[{
            lrcText:val,
            time:0
          }],
          currentIndex:-1
        })
      }else this._parseLyric(val)
    }
  },
  lifetimes:{
    ready(){
      wx.getSystemInfo({
        success:(res)=>{
          // 获取手机宽度px,除以750得比例，乘以多少rpx值，得到px的值
          this.data._lyrTextHeight = res.screenWidth/750 *64
        }
      })
        
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 获取当前播放秒数，并找到第几个歌词
    updateCurrentSec(second){
      const lrcList = this.data.lrcList
      console.log(second,lrcList[lrcList.length-1])
      // 纯音乐情况
      if(lrcList.length==0) return

      // 滑动使播放时间大于所有歌词时间段情况(排序解决最后是歌手信息的情况？)
      if(lrcList[lrcList.length-1].time&&second>lrcList[lrcList.length-1].time){
        if(this.data.currentIndex!=-1){
          this.setData({
            currentIndex: -1, // 触发一次就不再触发定位歌词事件
            scrollTop:lrcList.length * this.data._lyrTextHeight   // 最后一句歌词位置
          })
        }
        return
      }

      // 动态滑动情况
      for (let index = 0; index < lrcList.length; index++) {
        // 当找到当前秒数在哪个区间（10  大于1赋值1 大于2赋值2 大于3赋值3...小于则跳出），即取出index，并中断循环
        if(second<=lrcList[index].time){
          this.setData({
            currentIndex: index-1,
            scrollTop:(index-1)*this.data._lyrTextHeight    // 往上滑动多少句歌词的高度 64rpx->px
          })
          break
        }
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

// components/progress-bar/progress-bar.js
const backAudioManager = wx.getBackgroundAudioManager()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    time:{
      currentTime:'00:00',
      totalTime:'00:00'
    },
    moveDisX:0,
    progress:0,
    _duration:0,  // 歌曲总秒数
    _isMove:false,
    _areaDomWidth:0,
    _viewDomWidth:0,
    _preSecond:-1
  },
  
  lifetimes: {
    ready() {
      if(this.data.time.totalTime==='00:00') this._setDuration() // 页面缓存有歌曲时，不重新获取音频，因此要手动获取时长
      this._getMoveDisX()
      this._bindBGMEvent()
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event){
      if(event.detail.source == 'touch'){
        this.data._isMove = true
        this.data.moveDisX = event.detail.x // 滑块背景色位置
        this.data.progress = event.detail.x / (this.data._areaDomWidth-this.data._viewDomWidth) *100
      }
    },
    onTouchEnd(){
      const currentSec = backAudioManager.currentTime // 监听获取当前播放秒数
      const currentTimeObj = this._dateFormat(currentSec)
      // 修改进度条相关显示参数
      this.setData({
        moveDisX:this.data.moveDisX,
        progress:this.data.progress,
        ['time.currentTime']:`${currentTimeObj.min}:${currentTimeObj.sec}`
      })
      // 设置音乐播放位置
      backAudioManager.seek(this.data._duration*this.data.progress/100) // 参数为秒，当前进度(0-100因此要除100)*总秒数
    },
    // 获取dom信息-滑块宽度
    _getMoveDisX(){
      // 页面用wx.createSelectorQuery，组件可用this（指向wx）
      const Dom = this.createSelectorQuery();
      Dom.select('.movable-area').boundingClientRect()
      Dom.select('.movable-view').boundingClientRect()
      Dom.exec((rect)=>{
        // 创建DOM操作示例，exec将按顺序执行所有事件返回一个数组
        console.log('dom对象数组信息',rect);
        this.data._areaDomWidth = rect[0].width
        this.data._viewDomWidth = rect[1].width
      })
    },
    // 为全局唯一的音频实例绑定事件,绑定上几乎所有监听事件
    _bindBGMEvent(){
      backAudioManager.onPlay(()=>{
        console.log('onPlay');
        this.data._isMove&&(this.data._isMove = false)
        // 歌曲全局面板控制播放暂停时触发，传递给页面控制歌曲状态
        this.triggerEvent('onPlay')
    })

      backAudioManager.onStop(()=>{
        console.log('onStop');
      })

      backAudioManager.onPause(()=>{
        console.log('onPause');
        this.triggerEvent('onPause')
      })

      backAudioManager.onWaiting(()=>{
        console.log('onWaiting');
      })

      backAudioManager.onCanplay(()=>{
        console.log('onCanPlay');
        console.log('解析得音频时长',backAudioManager.duration)
        if(typeof backAudioManager.duration != 'undefined'){
          this._setDuration() // 实际上是第二次获取
        }else{
          // 当是undefined时，定时1s后再次获取
          setTimeout(() => {
          console.log('1s后再次获取音频时长')
          this._setDuration() // 实际上是第三次获取
          }, 1000);
        }
      })

      backAudioManager.onTimeUpdate(()=>{
        // console.log('onTimeUpdate');
        if(this.data._isMove) return
        const currentSec = backAudioManager.currentTime // 监听获取当前播放秒数
        this.data._duration = backAudioManager.duration  // 获取音频总秒数
        const currentTimeObj = this._dateFormat(currentSec)

        // 手动节流为1秒才setData，通过判断当前秒数小数点前一个值是否相等
        if(currentSec.toString().split('.')[0]==this.data._preSecond) return
        // console.log('一秒执行一次setData',currentSec);
        this.setData({
          moveDisX:(this.data._areaDomWidth-this.data._viewDomWidth)*currentSec/this.data._duration,
          progress:currentSec/this.data._duration*100,
          ['time.currentTime']:`${currentTimeObj.min}:${currentTimeObj.sec}`
        })
        this.data._preSecond = currentSec.toString().split('.')[0]
        this.triggerEvent('timeUpdate',{currentSec})  // 当前播放秒数通过页面传到歌词组件
      })

      backAudioManager.onEnded(()=>{
        console.log('onEnded');
        this.triggerEvent('musicEnd')
      })

      backAudioManager.onError((res)=>{
        console.log(res.errMsg);
        console.log(res.errCode);
        wx.showToast({title: `错误:${res.errCode}`,icon: 'none'})
      })
    },
    _setDuration(){
      const duration = backAudioManager.duration
      const timeObj = this._dateFormat(duration)  // 格式化秒数为分秒
      this.setData({
        ['time.totalTime']:`${timeObj.min}:${timeObj.sec}`
      })
    },
    // 秒数转分钟
    _dateFormat(sec){
      const min = Math.floor(sec/60)  // 四舍五入取整
      sec = Math.floor(sec%60)
      return {
        min:this._parse0(min)||'00',
        sec:this._parse0(sec)||'00'
      }
    },
    // 补零
    _parse0(num){
      return num<10 ? `0${num}` : num
    }
  }
})

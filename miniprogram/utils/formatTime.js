module.exports = (date)=>{
  let fmt = 'yyyy-MM-dd hh:mm:ss'
  // 时间对象取出相应年月日
  const o = {
    'y+':date.getFullYear(),
    'M+':date.getMonth()+1,
    'd+':date.getDate(),
    'h+':date.getHours(),
    'm+':date.getMinutes(),
    's+':date.getSeconds(),
  }
  for (const key in o) {
    if (new RegExp(`(${key})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1,o[key].toString().length===1?`0${o[key]}`:o[key])
    }
  }
  return fmt
}
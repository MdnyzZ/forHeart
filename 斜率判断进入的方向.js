 // 获取鼠标进入/离开盒子方向 - direction
  /* params - 参数
  event：鼠标进入事件对象
  obj: 当前元素
  objPageX: 当前元素在页面中的水平坐标
  objPageY: 当前元素在页面中的纵坐标
   */

  /* 返回值 - 字符串
  top：从上方进入
  left：从左侧进入
  right：从右侧进入
  bottom：从下侧进入
   */

  function direction(event, obj, objPageX, objPageY) {
    //鼠标页面坐标
    var pageX = event.pageX;
    var pageY = event.pageY;
    //盒子中心位置的坐
    var centerX = objPageX + box.offsetWidth / 2;
    var centerY = objPageY + box.offsetHeight / 2;
    //鼠标相对于盒子中心位置的坐标
    var objx = pageX - centerX;
    var objy = pageY - centerY;

    // kFix:对角线斜率  
    //kMouse:鼠标相对于盒子中心斜率
    var kFix = obj.offsetHeight / obj.offsetWidth;
    var kMouse = objy / objx;

    if (kFix >= Math.abs(kMouse)) {
      return objx >= 0 ? "right" : "left";
    } else {
      return objy >= 0 ? "bottom" : "top";
    }
  }

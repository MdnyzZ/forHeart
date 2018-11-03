//
//
//
window.onload = function () {
  waterfall();
  var dataInt = {
    'data': [{
      'src': '0.jpg'
    }, {
      'src': '1.jpg'
    }, {
      'src': '2.jpg'
    }, {
      'src': '3.jpg'
    }, {
      'src': '4.jpg'
    }, {
      'src': '5.jpg'
    }, {
      'src': '6.jpg'
    }, {
      'src': '7.jpg'
    }, {
      'src': '8.jpg'
    }, {
      'src': '9.jpg'
    }, {
      'src': '10.jpg'
    }, {
      'src': '11.jpg'
    }, {
      'src': '12.jpg'
    }, {
      'src': '13.jpg'
    }, {
      'src': '14.jpg'
    }, {
      'src': '15.jpg'
    }, {
      'src': '16.jpg'
    }, {
      'src': '17.jpg'
    }, {
      'src': '18.jpg'
    }, {
      'src': '19.jpg'
    }, {
      'src': '20.jpg'
    }, {
      'src': '21.jpg'
    }, {
      'src': '22.jpg'
    }]
  }
  window.onscroll = function () {
    if (checkIsScroll()) {
      for (var i = 0; i < dataInt.data.length; i++) {
        var main = document.getElementById('main');
        var box = document.createElement('div');
        var pic = document.createElement('div');
        var img = document.createElement('img');
        pic.className = 'pic';
        box.className = 'box';
        main.appendChild(box);
        box.appendChild(pic);
        pic.appendChild(img);
        img.src = 'images/' + dataInt.data[i].src;
      }
      waterfall();
    }
  }
}

function waterfall() {
  //取出所有的main下的class为box元素
  var main = document.getElementById('main');
  var boxs = main.getElementsByClassName('box');
  var boxWidth = boxs[0].offsetWidth;
  var cols = parseInt(document.documentElement.clientWidth / boxWidth);
  main.style.width = boxWidth * cols + 'px';
  // main.style.margin = '0 auto';
  var hArr = [];
  for (var i = 0; i < boxs.length; i++) {
    if (i < cols) {
      hArr.push(boxs[i].offsetHeight)
    } else {
      var minH = Math.min.apply(Math, hArr);
      var index = getMinIndex(hArr, minH);
      boxs[i].style.position = 'absolute';
      boxs[i].style.top = minH + 'px';
      // boxs[i].style.left = boxWidth * index + 'px';
      boxs[i].style.left = boxs[index].offsetLeft + 'px';
      hArr[index] += boxs[i].offsetHeight;
    }
  }
}

function getMinIndex(arr, val) {
  for (var key in arr) {
    if (arr[key] === val) {
      return key;
    }
  }
}

function checkIsScroll() {
  var main = document.getElementById('main');
  var boxs = main.getElementsByClassName('box');
  var lastBoxH = boxs[boxs.length - 1].offsetTop + parseInt(boxs[boxs.length-1].offsetHeight/2);
  var scrollH = document.body.scrollTop || document.documentElement.scrollTop;
  var watchH = document.body.clientHeight || document.documentElement.clientHeight;
  return (lastBoxH < scrollH + watchH) ? true : false;
}

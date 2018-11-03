# 用js实现瀑布流布局 

##### （学自慕课网Amy）

### 1.	html部分

​	页面结构很简单就是使用如下结构

```js
 <div id="main">
    <div class="box">
      <div class="pic">
        <img src="./images/0.jpg" alt="">
      </div>
    </div>
		//重复box盒子内的代码复制往下即可
 </div>
```

### 2.	css部分

​	css样式只需设置对应的类样式，主要在于div#main需要设置相对定位，盒子的绝对定位由js来设置，

​	然后盒子的边距为了我们使用offsetWidth和offsetHeight来获取值  所以选择padding来设置对应的值，值的大小可以由自己的审美设置。

​	其次为了让他们能在一行显示，我们给box加一个浮动。

​	然后就是对于pic盒子的外表修饰，这个也可以因人而异。

​	图片的宽度我们统一设置为相同的，然后高度由他们自动匹配。

​	这样基本的样式就设置好了

```css
 * {
  padding: 0;
  margin: 0;
}

#main {
  position: relative;
}

.box {
  float: left;
  padding: 15px 0 0 15px;
}

.pic {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 5px #ccc;
}

.pic img {
  width: 165px;
  height: auto;
}
```

### 3	js部分

我们首先考虑将瀑布流的设置设为一个函数  因为后面会重用他

现在直接去看我们的页面 他们是一排排显示的，但是中间会有很大的空白区域，这是因为其中放不下后面的盒子 所以就空出了大片空白

而我们的业务需求是需要让他们能够在一排显示完之后，通过绝对定位，在每一个的后面贴着再去显示后面的内容，

那我们想的是由其中最小高度的那一个优先显示出来，然后后面的在紧跟着同样的规则显示出来

所以我们就要获取第一行所有的box盒子，以及他们的最小高度的值和对应的索引，

这其中又有问题了 我们main是没有设置宽度的 所以他的每一行能显示的行数我们还没有固定

所以我们需要先来获取页面的宽度，来看看我们能显示的一行有多少个盒子。

所以我们依照上面的逻辑开始写代码

```js
//获取main盒子和他下面所有类为box的子盒子
var main = document.getElementById('main');
var boxs = main.getElementsByClassName('box');
```

```js
//获取box的宽度，因为我们宽度都设置的相同 所以随便获取一个即可
var boxWidth = boxs[0].offsetWidth;
var cols = parseInt(document.documentElement.clientWidth / boxWidth);
//其中document.documentElement.clientWidth 是window对象下的方法，用以获取浏览器窗口的宽度（其中不包括滚动条的宽度）
//也可以用document.body.clientWidth来获取浏览器窗口的宽度
//为了防止这个每一行个数可能为小数，所以我们用parseInt方法直接将小数部分舍去，这部分用Math.floor方法也可
```

```js
//给main设置宽度，和对应的margin居中
//其中宽度就是盒子的宽乘一行的个数
//这里选择动态设置magin是因为之前没有设置width所以magin是不起效果的当然也可以选择先在上面css中写好magin然后我们动态添加宽度时就会起效果
main.style.width = boxWidth * cols + 'px';
main.style.margin = '0 auto';
```

```js
//我们定义一个数组来存储这一行每一个盒子的高度
var hArr = [];
  for (var i = 0; i < boxs.length; i++) {
    if (i < cols) {
      hArr.push(boxs[i].offsetHeight)
    }
```

```js

```

```js
//找到最小高度的值对应的索引
function getMinIndex(arr, val) {
  for (var key in arr) {
    if (arr[key] === val) {
      return key;
    }
  }
}
```

```js
//然后我们存储完成之后就要开始设置对应的下个盒子显示的位置了
//紧跟着上面的代码写上
else {
  		//我们获取数组中最小的高度,Math.min方法可以实现，但他的参数是一个个传入的，所以我们可以利用apply方法来以数组的形式传入参数
      var minH = Math.min.apply(Math, hArr);
  		//然后这里我们设置了一个函数来获取最小高度值对应的盒子的索引 找到他 不设函数直接写也可
      var index = getMinIndex(hArr, minH);
  		//给每一个后面的盒子设置绝对定位
      boxs[i].style.position = 'absolute';
  		//给每一个设置对应的top
  		//设置为最小高度的那个值就好了
      boxs[i].style.top = minH + 'px';
  		//设置对应的left  这个left可以有两种方法设置，
  		//第一种就是left设置为对应的最小高度盒子的offsetLeft即可，
  		//第二种就是设置对应盒子宽度乘对应最小高度的索引值
      // boxs[i].style.left = boxWidth * index + 'px';
      boxs[i].style.left = boxs[index].offsetLeft + 'px';
  		//写到上面我们发现后面所有的box全部堆在了一块 
  		//所以我们写下面一行代码，将数组中最小高度的索引的值设置为添加盒子后的高度   然后就可以做到基本页面上盒子的摆放设置了
      hArr[index] += boxs[i].offsetHeight;
    }
  }
```

这样我们就写完了基本的页面摆放

但是呢我们还要做到有类似淘宝商品列表页面类似的可以无限下拉然后盒子动态加载的效果 

这个效果我们就需要来判断页面的滚动距离和页面可以是距离的和是否大于我们最后一个设置位置的盒子的offsetTop（当然也可以加上自身高度的一半）若是大于则我们需要往.页面中加载对应的数据，若不大于则不操作即可。

其中的数据本应由服务器提供对应的json文件来获取 我们这就模拟一个对象来体验一下效果即可

```js
//首先定义一个函数来判断是否要加载的条件
function checkIsScroll() {
  //获取对应的值来做判断
  var main = document.getElementById('main');
  var boxs = main.getElementsByClassName('box');
  //最后渲染位置盒子的高度
  var lastBoxH = boxs[boxs.length - 1].offsetTop + parseInt(boxs[boxs.length-1].offsetHeight/2);
  //页面滚动出去的距离（其中考虑到兼容性处理了 也可说为混杂模式与严格（标准）模式的区别）
  var scrollH = document.body.scrollTop || document.documentElement.scrollTop;
  //浏览器可视界面的高度（其中考虑到兼容性处理了 也可说为混杂模式与严格（标准）模式的区别）
  var watchH = document.body.clientHeight || document.documentElement.clientHeight;
  return (lastBoxH < scrollH + watchH) ? true : false;
}
```

我们需要先设置一个对象来模拟数据

```js
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
    }]
 }
```

然后在window.onscroll 中配置对应的添加元素的代码

```js
window.onscroll = function () {
    if (checkIsScroll()) {
      for (var i = 0; i < dataInt.data.length; i++) {
        //获取main盒子 然后新建需要的元素节点
        var main = document.getElementById('main');
        var box = document.createElement('div');
        var pic = document.createElement('div');
        var img = document.createElement('img');
        //给对应的元素添加类样式
        pic.className = 'pic';
        box.className = 'box';
        //添加元素
        main.appendChild(box);
        box.appendChild(pic);
        pic.appendChild(img);
        //给img设置src属性的值
        img.src = 'images/' + dataInt.data[i].src;
      }
      //这样添加的元素不会按照我们之前瀑布流的格式来排版
      //所以我们需要在调用一下瀑布流函数
      waterfall(main);
    }
  }
```





总结：我们通过以上js代码实现了瀑布流的布局，除了js以外，我们还可以使用jq或者css3来实现，具体的方法可以自己再研究。
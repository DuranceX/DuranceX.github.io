---
title: Vue实现一个画廊页面
date: 2024-08-10 15:54:30 
tags: [前端]
---

使用Vue实现一个简单的瀑布流画廊页面demo，图片简单地从`assets`目录下读取并在页面进行展示，在这过程中遇到了一些问题进行一下记录。

### Vite读取assets目录下的文件

在`webpack`中可以通过`require.context`方法来读取目录下的所有文件

其具体用法为

```js
require.context(directory,useSubdirectories,regExp)
```

`directory`: 要搜索的目录

`useSubdirectories`：是否要搜索子目录

`regExp`：匹配文件的正则表达式

```js
const files = require.context('public/icon',false,/\.svg$/);
const icons = Object.keys(files).map((path)=>{
  let reg = /\/([^/]*)\.(jpg|png)/;
  let name = path.match(reg)[1];
  return {
    key: path,
    name: name.
    value: files[path]
  }
})
```

> 正则表达式解释
>
> `\/`表示匹配一个`/`符号，用`\`做转义
>
> `([^/]*)`表示一个子表达式，匹配除了`/`符号外的任意字符{0,}次
>
> `\.`表示转义，匹配一个`.`符号
>
> `(jpg|png)`表示匹配jpg后缀或png后缀的图片
>
> 最后通过`[1]`取得文件名，`[0]`是匹配到的整个`/.....jpg`文件名，`[2]`是匹配到的后缀名

但`vite`不支持使用`require.context`方法，当在`Vite`中使用`require`时会报错，提示`Uncaught (in promise) ReferenceError: require is not defined`，这是因为`require`是Node.js的原生方法，以CommonJS的方式加载文件，Webpack默认支持，而`Vite`不支持，在`Vite`中使用特殊的`import.meta.glob`函数从文件系统中导入模块。

```ts
const files = import.meta.glob('/src/assets/images/*.jpg');
const images = Object.keys(files).map((path: any) => {
    let reg = /\/([^/]*)\.(jpg|png)/;
    let name = path.match(reg)[1];
    return {
        key: path,
        name: name,
        value: files[path],
    }
})
```

函数中可以通过传入数组来匹配多种模式

```ts
const modules = import.meta.glob(['./dir/*.js','./another/*.js'])
```

也可用通过`!`来排除某些目录某些文件

```ts
const modules = import.meta.glob(['./dir/*.js','!**/bar.js'])
```

[拓展链接-为什么要使用require来动态引入图片](https://mp.weixin.qq.com/s/HM8lrZezW5WonPlk74zitQ)

经过这一步，我们读取到了`assets/images`目录下的所有图片文件，并保存到了变量`images`中
![](https://images.starnight.top/img/image-20240801204414783.png)
### 显示图片

在读取了图片之后，我们便要将图片显示在页面中，通过`v-for`指令来遍历`images`数组，并将image的`key`值赋值给`img`标签的`src`属性来读取图片。

```html
<div class='container'>
    <div v-for="(image, index) in images">
        <img :src="image.key" alt="">
    </div>
</div>
```

这时候会发现图片按照原尺寸显示在画面中，铺满了整个页面，为了实现瀑布流的显示效果，我们需要再添加一些样式，首先给外层的`div`添加一个`container`类，用于控制列数。

```css
.container {
    width: 900px;
    column-count: 3;
    column-gap: 0;
}
```

设定容器的宽度，并通过`column-count`属性设置内容显示为3列，且设置间隙设为0，这时候图片就会以三列的形式进行呈现。
![](https://images.starnight.top/img/Pasted%20image%2020240805145736.png)

这时候图片已经分为了三列，但是还是按照原有的尺寸，并不能完整的显示，因此还需要再添加一些样式

```css
img{
  width: 100%;
  object-fit: contain;
}
```

此时图片的宽度会填满整个容器（此时的容器宽度是container的1/3，因为container设置了分为三列），并且由于设置了`object-fit:contain`，图片会保持原有尺寸，这样就实现了简单的瀑布流的显示效果。

![](https://images.starnight.top/img/Pasted%20image%2020240805145821.png)

这时候我们会发现，在整个页面的纵向中，图片与图片之间存在着白色的间隙，而我们希望消除这一间隙，让每一张图片之间都严丝合缝。这时候有三种可行的解决方案。

1. 给`container`添加属性`line-height:0`
2. 给`img`添加属性`display:block`
3. 给`img`添加属性`vertical-align: bottom`

出现这一情况的原因是：**HTML中的`img`标签是内联元素，这意味着它们会被像文本一样对待，而在HTML中文本行有额外的空间，用于放置类似`g`,`j`等字母的下行部分，所以会出现空白间隙。** 而通过给`container`设置`line-height:0`以及给`img`添加属性`display:block`都是在消除这些额外空间。具体内容查看[图片下方出现空行的成因和解决方案](https://starnight.top/2024/08/10/图片下方出现空行的成因和解决方案/)

最后得到如图所示的显示效果：
![](https://images.starnight.top/img/Pasted%20image%2020240805145854.png)

### 显示遮罩+动画
光有了图片的展示肯定还不够，参考一般的图片网站，都会有鼠标移上去时的遮罩效果，并显示一些详细的信息，接下来我们便来实现这一效果。
#### 遮罩设计
首先先设计一个简单的遮罩样式，首先遮罩应该要完全覆盖图片大小，并且通过一个深色半透明背景来暗化图片，在遮罩的中间显示一个“眼睛”图标，在遮罩的下方显示图片的名称，如下图所示。
![](https://images.starnight.top/img/%E6%88%AA%E5%B1%8F2024-08-05%2016.15.20.png)

**定位和布局**
将背景设置`position:absolute`，并设置`left`和`top`为0，`width`和`height`为100%，使得遮罩能够铺满整个图片，此处因为在html中该`div`位于图片下方，所以没有设置`z-index`

**图标**
从网上找到一个眼睛图样的svg图标，导入到项目后通过之前实现的[[通过Vite-plugin-svg-icons实现自定义的Icon组件 | Icon组件]]来使用，布局到页面的正中间。

**图片名称**
在之前获取的`images`数组中，通过正则表达式截取了每个图片文件的名称，在此处同样通过`position:absolute`定位到容器的下方，并设置文本溢出时显示省略号。

**实现代码**
```html
<div class="mask">
	<VIcon name="eye" size="24" />
	<div>{{ image.name }}</div>
</div>
```
```css
.mask {
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: absolute;
	background-color: rgba(0, 0, 0, 0.4);
	
	svg {
		stroke: none;
		color: rgba(255, 255, 255, 0.9);
	}
	
	div {
		position: absolute;
		bottom: 30px;
		width: 90%;
		height: 15px;
		line-height: 15px;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		color: #FFFFFFc2;
	}
}
```
#### 触发显隐事件
一开始对于遮罩的显隐通过一个布尔变量来控制，并监听鼠标事件，当鼠标进入该元素时，将布尔变量设置为true，鼠标离开时设置为false，但这时候发现当鼠标进入到一个元素后，所有的图片上都会显示遮罩，这是因为所有的图片遮罩都由一个变量进行控制，所以会同步显隐。因此需要对每个图片进行单独控制。采用`index`比对的方式来控制遮罩的显隐。

定义一个变量`hoverIndex`用于表示当前所`hover`的元素是哪个元素，同样监听鼠标进入和离开事件，当鼠标进入时将`hoverIndex`赋值为当前元素的`index`，离开时将`hoverIndex`设置为`-1`，在遮罩的显示逻辑中替换成`hoverIndex===index`，当元素下标等于激活元素下标时显示遮罩。

```html
<div v-for="(image, index) in images" class="item" @mouseenter="hoverIndex = index" @mouseleave="hoverIndex = -1">
	<img :src="image.key" alt="">
	<div v-show="hoverIndex === index" class="mask">
		<VIcon name="eye" size="24" />
		<div>{{ image.name }}</div>
	</div>
</div>
```
此时实现了当鼠标移动到一个图片时就可以显示对应的遮罩的效果，但是该遮罩的效果是直接出现，也是直接消失，显得非常的生硬，便希望通过添加一些过渡效果，使得遮罩的出现和消失更加自然，而由于使用`v-show`来进行遮罩的显隐，没有办法直接使用`transition`来给`opacity`添加过渡效果。

#### 过渡动画
因此采用Vue内带的`<transition>`标签来实现过渡动画，在元素外层包裹上`<transition>`标签即可，`<transition>`存在6个css类用于整个过渡过程。
![](https://images.starnight.top/img/Pasted%20image%2020240805165627.png)
`v-enter-from`和`v-leave-to`，这两个类分别控制的是进入动画开始前和离开动画结束后的样式，相当于基础样式，一般相同。
`v-enter-to`和`v-leave-from`，这两个类分别控制的是进入动画结束后和离开动画开始前的样式，
相当于激活样式，一般相同。
`v-enter-active`和`v-leave-active`，这两个类分别控制在进入和离开过程中的动画效果，对上述四个类中的样式进行过渡。
在没有给`<transition>`命名时，默认都使用`v-`的类名，如果给`<transition>`添加了`name`属性，例如`fade`，则类名都变成`fade-`

在本次的画廊案例中，我们需要添加的过渡效果有
- 进入时遮罩由隐到显，图标从略下方向上浮出
- 离开时遮罩由显到隐，图标向下方隐去

实现代码：
```html
<div v-for="(image, index) in images" class="item" @mouseenter="hoverIndex = index" @mouseleave="hoverIndex = -1" >
	<img :src="image.key" alt="">
	<transition name="fade">
		<div v-show="hoverIndex === index" class="mask">
			<VIcon name="eye" size="24" />
			<div>{{ image.name }}</div>
		</div>
	</transition>
</div>
```

```css
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
	
	svg {
		transform: translateY(30px);
	}
}

.fade-enter-to,
.fade-leave-from {
	opacity: 1;
	  
	svg {
		transform: translateY(0px);
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity .5s ease;
	  
	svg {
		transition: transform .5s ease;
	}
}
```
![](https://images.starnight.top/img/Kapture%202024-08-05%20at%2017.16.48.gif)

### 全屏显示
到了这时候显然还缺少了一个部分，就是全屏显示的部分，都已经显示眼睛图标了，如果不能点击打开新窗口，那这图标有什么用呢。

#### 定位和布局
全屏显示的布局也同样非常简洁，全屏的深色半透明背景，中间显示图片，点击空余部分则关闭窗口回到原来的界面。
这一窗口的设计和遮罩的设计非常类似，只不过这一窗口的大小是整个屏幕。因为部分图片的原尺寸太大，会造成整个屏幕都显示不下的情况，且如此会导致没有空余空间可以点击来退出全屏窗口，因此对图片的尺寸进行限制，最多占用屏幕宽高的90%

#### 点击事件
首先新增两个变量
- `isShowOverlay`：布尔变量，用于控制全屏窗口的显隐
- `showPic`：图片地址，用于控制全屏窗口显示的图片
当点击元素时，将`isShowOverlay`设置为true，显示窗口，将`showPic`设置为图片的地址，用于在全屏窗口中进行显示。给`overlay`元素添加点击事件，当鼠标点击时将`isShowOverlay`设为false，关闭窗口，同时将`showPic`设为空。这时候点击图片的时候也会触发父元素`overlay`的点击事件，使得全屏窗口关闭，因此需要对点击事件进行拦截，此时就用到了Vue的事件修饰符，通过给图片也添加点击事件，并添加事件修饰符`.stop`来阻止事件的冒泡传递，这样在子元素中触发的点击事件就不会再触发父元素的点击事件。

#### 图片大小与点击事件冲突
在一开始，限制图片的大小时，将图片的`width`和`height`都设置为了90%，并且在点击事件处理中，将图片本身的点击事件进行了拦截，不做任何处理。这也导致了一个问题，即在距离图片较近的背景部分点击时，也不会关闭窗口。
在调试时发现是因为设置了`width`和`height`为90%，导致整个图片占据了整个画面宽高90%的大小，而不是图片本身的大小，也就是说即使图片是个长方形，它占据的面积仍然是一个正方形，从而使得整个正方形内的点击事件都失效。
因此需要对样式进行调整，将`width`和`height`都调整为`fit-content`，并将`max-width`和`max-height`设置为90%，由此实现了全屏窗口的展示。

### 完整代码
```html
<template>
	<div class="container">
		<div v-for="(image, index) in images" class="item" @mouseenter="hoverIndex = index" @mouseleave="hoverIndex = -1" @click="showPic = image.key; isShowOverlay = true">
			<img :src="image.key" alt="">
			<transition name="fade">
				<div v-show="hoverIndex === index" class="mask">
					<VIcon name="eye" size="24" />
					<div>{{ image.name }}</div>
				</div>
			</transition>
		</div>
	</div>
	<transition name="fade">
		<div class="overlay" v-if="isShowOverlay" @click="isShowOverlay = false; showPic = ''">
			<img :src="showPic" alt="" @click.stop="">
		</div>
	</transition>
</template>
```
```ts
<script setup lang="ts">
import VIcon from '@/components/VIcon.vue'
import { ref } from 'vue'

const files = import.meta.glob('/src/assets/images/*.jpg');
const images = Object.keys(files).map((path: any) => {
	let reg = /\/([^\/]*)\.(jpg|png)/;
	let name = path.match(reg)[1];
	return {
		key: path,
		name: name,
		value: files[path],
	}
})
const hoverIndex = ref(-1)
const isShowOverlay = ref(false)
const showPic = ref('')
</script>
```
```css
<style scoped>
.container {
    width: 900px;
    column-count: 3;
    column-gap: 0;
    line-height: 0;
}

.item {
    position: relative;
}

.mask {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.4);

    svg {
        stroke: none;
        color: rgba(255, 255, 255, 0.9);
    }

    div {
        position: absolute;
        bottom: 30px;
        width: 90%;
        height: 15px;
        line-height: 15px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        color: #FFFFFFc2;
    }
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;

    svg {
        transform: translateY(30px);
    }
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;

    svg {
        transform: translateY(0px);
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s ease;

    svg {
        transition: transform .5s ease;
    }
}

img {
    width: 100%;
    object-fit: contain;
    box-sizing: border-box;
    break-inside: avoid;
}

.overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        width: fit-content;
        height: fit-content;
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
    }
}
</style>
```

![](https://images.starnight.top/img/Kapture%202024-08-05%20at%2017.55.47.gif)

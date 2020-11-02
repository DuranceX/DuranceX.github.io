---
title: HTML5学习笔记
date: 2020-03-05 17:50:16
updated: 2020-03-16 11:20:16
tags: [HTML, 笔记]
categories: HTML
index_img: /img/html5/header.png 
---
html的入门笔记
<!-- more -->

学习资料：[菜鸟教程](https://www.runoob.com/html)

# 基础框架
``` html
<!DOCTYPE html>
<html>
    <head>
    </head>
    <body>
    </body>
</html>
```
# 头部元素
## \<title>

``` html
<title>title</title>
```
title标签定义了网页的标题，即在浏览器标签页上显示的内容

## \<base>
``` html
<base href="https://www.baidu.com/" target="_blank">
```
\<base>标签描述了基本的链接地址，是该HTML文档中所有链接标签的默认链接。
例如在\<body>里添加`<img src="logo.png">`，则其链接就相当于`https://www.baidu.com/logo.png`

## \<link>
`<link>`标签用来定义文档与外部资源之间的关系。最常见的用法是链接样式表。
``` html
<link rel="stylesheet" type="text/css" href="theme.css">
```
其中`rel`表示关系这里是`stylesheet`即样式表，`href`表示链接文件的路径
所有`rel`属性值[列表](https://www.runoob.com/tags/tag-link.html)

## \<style>
`<style>`标签定义了HTML文档的样式文件引用地址，也可以在`<style>`标签中直接添加样式来渲染HTML文档
``` html
<head>
<style type="text/css">
body {background-color:yellow}
p {color:blue}
</style>
</head>
```

## \<meta>
`<meta>`标签用来描述一些基本的元数据，元数据不会显示在页面上，但会被浏览器解析，用于描述页面，例如网页描述、作者、最后修改时间等。
示例：
``` html
<!-- 为搜索引擎定义关键词 -->
<meta name="keywords" content="HTML,CSS">
<!-- 为网页定义描述内容 -->
<meta name="description" content="learning blog">
<!-- 定义网页作者 -->
<meta name="author" content="初言">
<!-- 每30秒刷新当前页面 -->
<meta http-equiv="refresh" content="30">
<!-- 定义编码方式 -->
<meta charset="UTF-8">
```
## \<script>
`<script></script>`标签用于定于网页脚本，可以通过`src`属性指向外部脚本文件，也可以直接在标签内写脚本语句
<p class="note note-primary">如果使用"src"属性，则< script>元素必须是空的</p>

# 标题

html中使用`<h1>标题文本</h1>`~`<h6>标题问题</h6>`来描述6级标题

# 注释
使用`<!-- 注释 -->`来进行注释

# 换行

使用`<br />`标签来进行换行
`<hr />`可以插入一条水平线，分割距离更大（分得更开）
<hr />
如上所示

# 段落
`<p>段落</p>`标签表示段落。
<p class="note note-primary">HTML中无法识别多个空格和Enter键进行的回车，所有这些操作在html中都会被看成一个空格</p>

因此在段落中如果需要换行，可以添加`<br />`标签来进行换行。

段落即`<p></p>标签`会在段落前后自动加上`<br />`，对比手动添加`<br />`可以发现

``` html
文字1
文字2
文字3

<p>段落1</p>
<p>段落2</p>
<p>段落3</p>

段落4
<br />
段落5
<br />
段落6
```
在[编辑器](https://c.runoob.com/front-end/61)里尝试。

<h1 id="text">文本标签</h1>

html中提供以下标签来对普通文字（比如这行）进行加粗等操作
``` html
<b>粗体</b>
<i>斜体</i>
<ins>下划线</ins>
<del>删除字（中划线）</del>
这是<sub>上标</sub>
这是<sup>下标</sup>
<em>着重文字</em>
<strong>强调文字</strong>
<mark>高亮文字</mark>
```
显示效果如下：
<b>粗体</b>
<i>斜体</i>
<ins>下划线</ins>
<del>删除字（中划线）</del>
这是<sub>上标</sub>
这是<sup>下标</sup>
<em>着重文字</em>
<strong>强调文字</strong>
<mark>高亮文字</mark>
<p class="note note-primary">可以发现着重文字和斜体的效果一样，强调文字和粗体的显示效果一样<br />
但 strong 标签代表的是其文字的意义，是需要强调，引起用户注意的。而 b 标签只是代表其文字的样式是粗体也就是CSS中"font-weight:bold"的效果，而 strong 标签则可以通过CSS自定义成其他样式</p>

# 链接
使用`<a></a>`标签来表示
语法：
``` html
<a href="url" target="_blank">链接文本</a>
```
href的参数有一个链接，它可以是具体的网址，也可以是该html中的一个`id`属性，如果是本页元素的id属性的话，即可实现页面内跳转，此时`url="#id"`
target的参数表示打开方式，常用的有两个参数，`_self`在当前标签页打开，`_blank`在新标签页打开。另有`_top`参数用来跳出框架，[详情见](https://www.runoob.com/try/try.php?filename=tryhtml_frame_getfree)将，`_top`改为`_self`即可看出差别。
示例：
``` html
<a href="https://www.baidu.com/index.php?tn=93046615_hao_pg" target="_blank">新标签页打开百度</a>
<a href="https://www.baidu.com/index.php?tn=93046615_hao_pg" target="_self">当前标签页打开百度</a>
<a href="#text">跳转到“文本标签处”</a>
```
<a href="https://www.baidu.com/index.php?tn=93046615_hao_pg" target="_blank">新标签页打开百度</a>
<a href="https://www.baidu.com/index.php?tn=93046615_hao_pg" target="_self">当前标签页打开百度</a>
<a href="#text">跳转到“文本标签处”</a>

链接文本也可以不是文字，可以是图片或其他html元素
示例：
``` html
<a href="https://www.baidu.com/index.php?tn=93046615_hao_pg" target="_top"><img src="//www.baidu.com/img/baidu_jgylogo3.gif"></a>
```
在[编辑器](https://c.runoob.com/front-end/61)里尝试

`<a>`标签还可以用来发送邮件(＃°Д°)
在`href`的参数中输入`mailto:balabala@qq.com`等即可实现(需要有邮件客户端)
示例：
``` html
<a href="mailto:example@qq.com" target="_top">简单版本</a>
<a href="mailto:example@qq.com?cc=someoneelse@example.com&bcc=andsomeoneelse@example.com&subject=Summer Party&body=You are invited to a big summer party!" target="_top">进阶版本</a>
```
<a href="mailto:example@qq.com" target="_top">简单版本</a>
<a href="mailto:example@qq.com?cc=someoneelse@example.com&bcc=andsomeoneelse@example.com&subject=Summer Party&body=You are invited to a big summer party!" target="_top">进阶版本</a>
在进阶版本中，cc表示抄送对象邮箱，bcc表示秘密抄送对象的邮箱，subject表示邮件标题，body则是邮件内容。

# 内联样式
当只有个别HTML元素需要特殊样式渲染时，可以使用内联样式，例如：
``` html
<p style="color:red;margin-left:20px;">这是一个段落</p>
<p style="background-color:green">这是一个段落</p>
```
<p style="color:red;margin-left:20px;">这是一个段落</p>
<p style="background-color:green">这是一个段落</p>
同样还有其他样式，在CSS里再做讨论

# 图像
``` html
<img src="url" alt="some_text" width="111" height="111">
```
`img`标签没有结束标签，`src`表示图像的路径，`alt`表示的当图片无法加载时，显示的文本，用来告诉用户大概是个什么图片，`width`和`height`属性则是指定图片的高度和宽度

**创建图像映像**
大意就是点击图像中的不同区域，实现不同的效果，就是将图像分成几个不同的区域，各自相应点击事件。[详情示例](https://www.runoob.com/try/try.php?filename=tryhtml_areamap)
其中：
``` html
<!-- 1、矩形：(左上角顶点坐标为(x1,y1)，右下角顶点坐标为(x2,y2)) -->
<area shape="rect" coords="x1,y1,x2,y2" href=url>
<!-- 2、圆形：(圆心坐标为(X1,y1)，半径为r) -->
<area shape="circle" coords="x1,y1,r" href=url>
<!-- 3、多边形：(各顶点坐标依次为(x1,y1)、(x2,y2)、(x3,y3) ......) -->
<area shape="poly" coords="x1,y1,x2,y2 ......" href=url>
```

# 表格
表格元素基本框架：
``` html
<table border="1">
    <tr>
        <th>th1</th>
        <th>th2</th>
    </tr>
    <tr>
        <td>row1,col1</td>
        <td>row1,col2</td>
        <td>row1,col3</td>
        <td rowspan="2">row1,col4</td>
    </tr>
    <tr>
        <td>row2,col1</td>
        <td colspan="2">row2,col2</td>
    </tr>
</table>
```
表格用`<table>`标签来定义，`<tr></tr>`表示一行，`<td></td>`表示该行里的一格,`<th></th>`表示表头，不同`<tr>`中的`<td>`数量不等可实现合并单元格，使用`cellpadding="10"`来设置10px的格边距，使用`border="1"`来添加宽度为1px的边框，使用`cellspacing="10"`来添加格与格之间的间距，使用`rowspan="2"`来添加纵向两个的合并单元格，使用`colspan="2"`来添加横向两个的合并单元格。显示如下
<table border="1">
    <tr>
        <th>th1</th>
        <th>th2</th>
    </tr>
    <tr>
        <td>row1,col1</td>
        <td>row1,col2</td>
        <td>row1,col3</td>
        <td rowspan="2">row1,col4</td>
    </tr>
    <tr>
        <td>row2,col1</td>
        <td colspan="2">row2,col2</td>
    </tr>
</table>


# 列表
列表分为有序列表和无序列表，有序列表用`<ol></ol>`标签包括，无序标签用`<ul></ul>`标签包括，列表中每一记录用`<li></li>`表示
示例：
``` html
有序列表：
<ol>
    <li>first</li>
    <li>second</li>
    <li>third</li>
</ol>

无序列表
<ul>
    <li>first</li>
    <li>second</li>
    <li>third</li>
</ul>
```
显示如下
有序列表：
<ol>
    <li>first</li>
    <li>second</li>
    <li>third</li>
</ol>

无序列表
<ul>
    <li>first</li>
    <li>second</li>
    <li>third</li>
</ul>

可以在`<ol></ol>`标签中定义`type`属性来设置不同的序号，默认为"1,2,3..."，例如设定为`<ol type="A"></ol>`，显示就会变成"A,B,C,D...."[示例](https://www.runoob.com/try/try.php?filename=tryhtml_lists_ordered)
同样，无序列表也可以通过设置对应的`style`属性来设置不同符号，默认为圆点
- 圆点值为：`list-style-type:disc`
- 空心圆圈值为：`list-style-type:circle`
- 方形点值为：`list-style-type:square`

**自定义列表**
自定义列表以`<dl></dl>`标签包裹，自定义列表项由`<dt></dt>`标签包裹，自定义列表项的定义由`<dt></dt>`标签包裹。
示例：(以“-”作为序号)
``` html
<dl>
  <dt>Coffee</dt>
  <dd>- black hot drink</dd>
  <dt>Milk</dt>
  <dd>- white cold drink</dd>
</dl>
```
<dl>
  <dt>Coffee</dt>
  <dd>- black hot drink</dd>
  <dt>Milk</dt>
  <dd>- white cold drink</dd>
</dl>

# 区块

使用`<div></div>`标签来对页面进行分块，方便布局，并通过`<div></div>`标签来对大块的内容块设置样式属性。

`<span></span>`标签式内联元素，可用作文本的容器，与CSS搭配用于对部分文本设置样式属性

# 表单元素
## \<form>
`<form></form>`标签用于创建供用户输入的HTML表单

**`action`属性**
**action**属性用于定义在提交表单时执行的动作。链接目标页面，例如：
``` html
<form action="demo-form.php">
</form>
```
若省略action属性，则action会被设置为当前页面

## \<input>
`<input>`标签通过定义不同的`type`属性可以实现不同的效果

**文本框**
在多数浏览器中，文本框的默认宽度是20个字符
``` html
<input type="text" placeholder="Input something">
``` 
<input type="text" placeholder="Input something">

<hr />

**密码字段**
`type`属性值为`password`
``` html
<input type="password" placeholder="Input something">
``` 
<input type="password" placeholder="Input something">

<hr />

**单选按钮**
`type`属性为`radio`
``` html
<input type="radio" >选我选我
<input type="radio" >选他选他
``` 
<input type="radio" >选我选我
<input type="radio" >选他选他

这种情况下我们发现无法实现单选的效果，需要将两个按钮设置相同的`name`属性，，就可以实现单选效果了。

``` html
<input type="radio" name="choice">选我选我
<input type="radio" name="choice">选他选他
``` 
<input type="radio" name="choice">选我选我
<input type="radio" name="choice">选他选他

<hr />

**复选框**
`type`属性为`checkbox`

``` html
<input type="checkbox" value="Bike">i have a bike
<input type="checkbox" value="Car">i have a Car
```
<input type="checkbox" value="Bike">i have a bike
<input type="checkbox" value="Car">i have a Car

<hr />

**滑动轴**
`type`属性为`range`

``` html
<input type="range" value="50" max="100" min="0" step="1">
```
<input type="range" value="50" max="100" min="0" step="1">

用`max`限定最大值，`min`限定最小值，`value`设定初始值，`step`设定步长

<hr />

**按钮**
`type`属性为`button`
``` html
<input type="button" value="点我！">
```
<input type="button" value="点我！">

<hr />

**颜色**
`type`属性为`color`
``` html
<input type="color" value="#ff0000">
```
<input type="color" value="#ff0000">&emsp; 可以设置`value`的值来设定初始值

<hr />

**时间**
`type`属性为`date`
``` html
<input type="date">
```
<input type="date">
<hr />

若`type`属性为`month`、`time`、`week`可有不同的效果
``` html
<input type="month">
<input type="time">
<input type="week">
```
<input type="month"><br />
<input type="time"><br />
<input type="week">

**选取文件**
`type`属性为`file`
``` html
<input type="file">
```
<input type="file">

使用`multiple`属性进行多选

**数字**
`type`属性为`number`
``` html
<input type="number" max="100" min="0" value="50" step="5">
```
<input type="number" max="100" min="0" value="50" step="5">

用`max`限定最大值，`min`限定最小值，`value`设定初始值，`step`设定步长

## \<label>

`<label>`标签用于显示文本，但与普通文本相比，`<label>`标签可以响应鼠标点击事件

``` html
<label for="me">选我选我</label>
<input type="radio" name="choice" id="me" value="选我选我">
<label for="he">选他选他</label>
<input type="radio" name="choice" id="he" value="选他选他">
```
<label for="me">选我选我</label><input type="radio" name="choice" id="me" value="选我选我">
<label for="he">选他选他</label><input type="radio" name="choice" id="he" value="选他选他">

可与前项对比发现不同

## \<textarea>
`<textarea>`标签用于创建一个可以拖动扩大缩小的文本框
``` html
<textarea rows="5" cols="10">
我是一个文本框
</textarea>
```
<textarea rows="5" cols="10">
我是一个文本框
</textarea>

## \<select>及\<datalist>

下拉框选项用`<select>`标签和`<option>`标签进行组合
``` html
<select>
    <option value="apple">apple</option>
    <option value="banana">banana</option>
    <option value="pear">pear</option>
    <option value="peach">peach</option>
</select>
```
<select>
    <option value="apple">apple</option>
    <option value="banana">banana</option>
    <option value="pear">pear</option>
    <option value="peach">peach</option>
</select>

添加`multiple`属性可以进行多选，添加`required`属性可以要求必须选择至少一个选项
`size`属性规定下拉列表中一次性显示的条目数量。
<hr />

下拉框还可以用`<input>`和`<datalist>`标签组合实现
``` html
<input list="browsers">
<datalist id="browsers">
  <option value="Internet Explorer">
  <option value="Firefox">
  <option value="Chrome">
  <option value="Opera">
  <option value="Safari">
</datalist>
```
<input list="browsers">
<datalist id="browsers">
  <option value="Internet Explorer">
  <option value="Firefox">
  <option value="Chrome">
  <option value="Opera">
  <option value="Safari">
</datalist>

<hr />

通过在下拉框中添加`<optgroup>`标签还可以将选项进行分组
``` html
<select>
  <optgroup label="Swedish Cars">
    <option value="volvo">Volvo</option>
    <option value="saab">Saab</option>
  </optgroup>
  <optgroup label="German Cars">
    <option value="mercedes">Mercedes</option>
    <option value="audi">Audi</option>
  </optgroup>
</select>
```
<select>
  <optgroup label="Swedish Cars">
    <option value="volvo">Volvo</option>
    <option value="saab">Saab</option>
  </optgroup>
  <optgroup label="German Cars">
    <option value="mercedes">Mercedes</option>
    <option value="audi">Audi</option>
  </optgroup>
</select>

## \<button>
通过`<button>`标签可以创建一个按钮
``` html
<button type="button">点我！</button>
```
<button type="button">点我！</button>

在 `<button>` 元素内部可以放置内容，比如文本或图像。这是该元素与使用 `<input>` 元素创建的按钮之间的不同之处。

通过添加`onclick="xxx()"`属性将单击事件与函数xxx()链接起来。
具体事件属性再议。

## \<fieldset>和\<legend>
通过`<fieldset>`标签对表单中的元素进行分组，即加上一个边框，通过`legend`标签为该组设定标题
``` html
<fieldset>
    <legend>Personalia:</legend>
    Name: <input type="text"><br>
    Email: <input type="text"><br>
    Date of birth: <input type="text">
</fieldset>
```
<fieldset>
    <legend>Personalia:</legend>
    Name: <input type="text"><br>
    Email: <input type="text"><br>
    Date of birth: <input type="text">
</fieldset>

为`<fieldset>`标签添加`disabled`属性可以使该分组内元素全部不可更改、

## \<output>
`<output>`元素跟`<form>`标签组合进行输出
``` html
<form oninput="x.value=parseInt(a.value)+parseInt(b.value)">0
<input type="range" id="a" value="50">100
+<input type="number" id="b" value="50">
=<output name="x" for="a b"></output>
</form>
```
<form oninput="x.value=parseInt(a.value)+parseInt(b.value)">0
<input type="range" id="a" value="50">100
+<input type="number" id="b" value="50">
=<output name="x" for="a b"></output>
</form>


# 视频
使用`<video></video>`标签
``` html
<video width="320" height="240" controls>
  <source src="movie.mp4" type="video/mp4">
</video>
```
`controls`属性规定了播放视频会不会带有进度条等控制栏内容。
详见[链接](https://www.runoob.com/try/try.php?filename=tryhtml5_video_js_prop)，与按钮的组合。

# 音频
使用`<audio><audio>`标签
``` html
<audio controls>
  <source src="horse.ogg" type="audio/ogg">
</audio>
```
[链接](https://www.runoob.com/try/try.php?filename=tryhtml5_audio_all)
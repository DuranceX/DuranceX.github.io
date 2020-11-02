---
title: CSS学习笔记
date: 2020-03-16 15:53:56
tags: [css, HTML, 笔记]
categories: HTML
index_img: /img/css/header.png
---
css的一些学习笔记
<!-- more -->

# 分类
## 元素内嵌样式表
作为标签的全局属性存在，可以直接通过`style=""`的形式进行添加
``` html
<p style="background:#ff0000;color:white">test</p>
```
<p style="background:#ff0000;color:white">test</p>

## 文档内嵌样式表
在`<header></header>`标签内进行添加
``` html
<header>
    <style>
        p{
            background:#ff0000;
            color:white;
        }
    </style>
</header>
```

## 外部样式表
在外部新建css文件，通过html中的`link`标签进行连接,例如在同一目录下新建一个`styles.css`进行导入
``` html
<link rel="stylesheet" type="text/css" href="styles.css">
```

## 优先级
元素内嵌样式表>文档内嵌样式表>外部样式表

# 选择器

## 元素选择器
直接使用元素名进行选择，对所有a元素适用
``` css
p{
    font-size: 20pt;
}
```
选择所有元素，只要将p去掉，用`*`代替即可
``` css
*{
    font-size: 20pt;
}
```

## 类选择器
使用html的`class`属性来进行区分，在css中使用`.classname`来进行选择
``` html
<header>
    <style>
        .test{
            color:blue;
            font-size:20pt;
        }
    </style>
<header>
<body>
    <p class="test">dddd</p>
</body>
```
也可以指定特定的HTML元素使用class。
``` css
p.center {text-align:center;}
```
如上所示，所有的`class="center"`的 p 元素使用该样式表，其余元素不变。

``` css
.center p{text-align:center;}
```
如上所示，所有的`class="center"`元素内的 p 元素使用该样式表，其余元素不变。

## ID选择器
使用html的`id`属性进行区分，在css中使用`#idname`来进行选择
``` html
<header>
    <style>
        #test{
            color:blue;
            font-size:20pt;
        }
    </style>
<header>
<body>
    <p id="test">dddd</p>
</body>
```

## 根据属性选择
根据属性选择元素，使用`[属性名]`
``` html
<header>
    <style>
        [href]{
            color:blue;
            font-size:20pt;
        }
    </style>
<header>
<body>
    <a href="com1">dddd</a>
    <a href="com2">dddd</a>
</body>
```
示例中通过使用`[href]`对`href`属性进行了选择，方括号中也可以添加具体的值来针对该属性值为某一具体值的元素进行选择，例如选择第一个a标签包含的元素，可使用`[href="com1"]`来进行选择。

## 后代选择器
使用空格` `符号
选中某元素中的所有后代元素，如下所示，选中是`<div>`中的所有`<p>`标签
``` css
div p{
    background-color:yellow;
}
```

## 子元素选择器
使用大于号`>`
选中某元素中的直接后代元素。如下所示，选中是直接在`div`之下的`<p>`标签
``` html
<style>
div>p{
    background-color:yellow;
}
</style>

//示例
<div>
    <p>这一行会应用样式表，因为是<div>之下的第一代后代元素</p>
    <span>
    <p>这一行不会应用样式表，因为中间隔了一个<span>，不是第一代后代元素</p>
    </span>
</div>
```

## 相邻兄弟选择器
使用加号`+`
选择是在某个元素**之后第一次**出现的另一个元素，如下所示，选中的是`<div>`结束后的第一个`<p>`标签
``` html
<style>
div+p
{
  background-color:yellow;
}
</style>

<div>
<p>这行没被选中，因为<div>还没结束</p>
</div>
<p>这行被选中，是<div>结束后的第一个<p>元素</p>
<p>这行没被选中，是<div>结束后的第二个<p>元素</p>
```

## 后续兄弟选择器
使用波浪符号`~`
选择的是在某个元素**之后**的所有另一个元素，如下所示，选中的是`<div>`结束后的所有`<p>`标签（未包含在其他元素内）
``` html
<style>
div~p
{
	background-color:yellow;
}
</style>

<p>这行未被选中，因为在<div>之前，不会添加背景颜色。</p>

<div>
<p>未被选中，因为在 div 中。</p>
</div>

<p>被选中，因为不在 div 中，且没有被其他元素包裹</p>
<span>
    <p>这一行未被选中，因为包含在<span>中</p>
</span>
```

# 背景（Background）

## 背景颜色
使用`background-color`属性
``` html
<p style="background-color:red">fgffdfd</p>
```

## 背景图像
使用`background-image`属性
``` html
<p style="background-image:/img/banner_img1.jpg">ddddd</p>
```

## 背景的水平或垂直平铺
使用`background-repeat`属性
``` html
body{
    background-repeat:repeat-x; //在x方向平铺
    background-repeat:repeat-y; //在y方向平铺
    background-repeat:no-repeat; //不平铺
}
```
[示例](https://www.runoob.com/try/try.php?filename=trycss_background-image_gradient2)

## 背景位置
使用`background-position`属性
**方式1**
``` html
background-position:center center;
```
可选值有`left`、`right`、`top`、`center`、`bottom`
一个参数是水平方向，另一个参数是竖直方向，如果只指定一个参数，那另一值默认为center。

<hr />

**方式2**
``` html
background-position: 30% 20%; 
```
第一个值是水平位置，第二个值是垂直位置，左上角为0%，0%，右下角有100%，100%，如果只设定了一个值，那另一个值默认为50%。默认值0%，0%。

<hr />

**方式3**
``` html
background-position: 50px 100px;
```
使用像素进行定位，第一个值是水平位置，第二个值是垂直位置，左上角是0，0。如果只设定了一个值，那另一个值默认为50%。可以混用%和px。


## 背景固定方式
使用`background-attachment`属性
``` html
background-attachment:fixed;
```
可选值`scoll`、`fixed`、`local`
`scoll`表示背景图片随页面滚动而滚动，是默认值
`fixed`表示背景图片固定，不会随页面滚动而滚动
`local`表示背景图片会随着元素内容的滚动而滚动

## 背景大小
使用`background-size`属性
``` css
background-size:80px 60px;
```
可选值`length`、`percentage`、`cover`、`contain`
`length`：通过两个像素大小来表示，第一个值为宽度，第二个值为高度，若只设置一个参数，另一个参数为`auto`（自动）
`perccentage`：通过相对于背景定位区域的比例来表示，第一个值为宽度，第二个值为高度，若只设置一个参数，另一个参数为`auto`（自动）
`cover`：保持图像的纵横比并将图像缩放成将完全覆盖背景定位区域的最小大小
`container`：保持图像的纵横比并将图像缩放成将适合背景定位区域的最大大小

## 背景相对位置
使用`background-origin`属性
``` css
background-origin:content-box;
```
可选值`padding-box`、`border-box`、`content-box`
`padding-box`：背景图像关于填充框的相对位置
`border-box`: 背景图像关于边界框的相对位置
`content-box`：背景图像关于内容库的相对位置
[示例](https://www.runoob.com/try/try.php?filename=trycss3_background-origin)

## 指定绘图区的背景
使用`background-clip`属性
``` css
background-clip:content-box;
```
可选值`padding-box`、`border-box`、`content-box`
`padding-box`：默认值。背景绘制在边框方框内（剪切成边框方框）
`border-box`: 背景绘制在衬距方框内（剪切成衬距方框）
`content-box`：背景绘制在内容方框内（剪切成内容方框）。
[示例](https://www.runoob.com/try/try.php?filename=trycss3_background-clip)

# 文本（Text）

## 颜色
使用`color`属性
``` css
p{color:red;}
p{color:#ff0000;}
p{color:rgb(255,0,0);}
```
可以使用颜色名、十六进制颜色、rgb颜色、rgba颜色

## 对齐方式
使用`text-align`属性
``` css
h3 {text-align:right}
```
可选值`left`、`right`、`center`、`justify`
分别对应左端对齐，右端对齐，居中，两端对齐。

## 文本修饰（下划线等）
使用`text-decoration`属性
``` css
h1 {text-decoration:overline}
```
参数值`overline`、`underline`、`line-through`、`none`
分别对应上划线、下划线、删除线、无线。
可以多设几个参数值添加多条线，例如
``` css
h1 {text-decoration:overline underline line-through}
```
后面可以添加颜色值和线型，例如虚线——`dotted`，波浪线——`wavy`
示例：
``` css
h1 {
  text-decoration: underline overline dotted red;
}
 
h2 {
  text-decoration: underline overline wavy blue;
}
```

## 大小写
使用`text-transform`属性
``` css
p{text-transform:lowercase;}
```
可选项`none`、`capitalize`、`uppercase`、`lowercase`
`none`：默认，无格式
`capitalize`：每个单词首字母大写
`uppercase`：所有字母大写
`lowercase`：所有字母小写

## 缩进
使用`text-indent`属性
``` css
text-indent:50px;
```
1. 设置固定的缩进值，如50px;
2. 设定基于父元素宽度的百分比的缩进


## 行高
使用`line-height`属性
``` css
p{line-height:200%}
```
可选项`number`、`length`、`%`
`number`：设置数字，比如2-两倍行距
`length`：设置固定行间距，默认正常的行间距为20px;
`%`：用百分比来进行设置
``` html
<p style="line-height:50%">
小行距<br />
小行距
</p>

<p style="line-height:20px">
正常行距<br />
正常行距
</p>

<p style="line-height:2">
大行距<br />
大行距
</p>
```
<p style="line-height:50%">
小行距<br />
小行距
</p>

<p style="line-height:20px">
正常行距<br />
正常行距
</p>

<p style="line-height:2">
大行距<br />
大行距
</p>

# 盒子模型
![](/img/css/Box.png)
<b>
- Margin（外边框）:Border外的边框，透明，与其他元素之间的距离
- Border（边框）：围绕在内边框和内容外的边框，是最直观可见的边框
- Padding（内边框）：内容部分与边框之间的距离
- Content（内容）：盒子模型的内容部分是我们要显示的内容，例如文本和图像
</b>

我们设定的`width`和`height`属性指的是`Content`部分的宽度和高度
总宽度 = 内容宽度（width）+ 内边框宽度\*2 + 边框宽度\*2 + 外边框宽度\*2

# 边框（Border）

## 边框样式

使用`border-style`属性
``` html
border-style:solid;
```
可选项：（随颜色不同，效果不同）
<style>
p.none {border-style:none;}
p.dotted {border-style:dotted;}
p.dashed {border-style:dashed;}
p.solid {border-style:solid;}
p.double {border-style:double;}
p.groove {border-style:groove;}
p.ridge {border-style:ridge;}
p.inset {border-style:inset;}
p.outset {border-style:outset;}
p.hidden {border-style:hidden;}
</style>
<p class="none">none——无边框。</p>
<p class="dotted">dotted——虚线边框。</p>
<p class="dashed">dashed——虚线边框。</p>
<p class="solid">solid——实线边框。</p>
<p class="double">double——双边框。</p>
<p class="groove">groove——凹槽边框。</p>
<p class="ridge">ridge——垄状边框。</p>
<p class="inset">inset——嵌入边框。</p>
<p class="outset">outset——外凸边框。</p>
<p class="hidden">hidden——隐藏边框。</p>

## 边框宽度
使用`border-style`属性

## 分别设置四边框
<b>
- border-style:属性1，属性2，属性3，属性4;</b><br />
&emsp;&emsp;上->右->下->左<br />
<b>
- border-style:属性1，属性2，属性3</b><br />
&emsp;&emsp;上->左右->下<br />
<b>
- border-style:属性1，属性2</b><br />
&emsp;&emsp;上下->左右<br />
<b>
- border-style:属性1</b><br />
&emsp;&emsp;上下左右属性相同
<br /><br />
示例

``` html
<style>
p.test{
    border-top:thick double #ff0000;
    border-left:2px solid green;
    border-right:4px dotted #00ffff;
    border-bottom:hidden;
}
p.test2{
    border-left:4px solid #33b6ee;
    background-color:rgba(207,235,246);
    line-height:3;
    Padding-left:10px;
}
</style>
```

<style>
p.test{
    border-top:thick double #ff0000;
    border-left:2px solid green;
    border-right:4px dotted #00ffff;
    border-bottom:hidden;
}
p.test2{
    border-left:5px solid #33b6ee;
    background-color:rgba(207,235,246);
    line-height:3;
    Padding-left:10px;
}
</style>
<p class="test">示例<p>
<p class="test2">示例2<p>

## 轮廓 （outline）
轮廓（outline）是在`border`外的一条线，属性值与Border一致，outline不占用额外空间。
``` html
<p style="border:2px dashed black;outline:2px solid red;">test</p>
```

<p style="border:2px dashed black;outline:2px solid red;">test</p>

## 圆角（border-radius）
使用`border-radius`属性，单位为像素px

## 盒子阴影（box-shadow）
使用`box-shadow`属性
``` html
box-shadow: 10px 10px 5px #888888;
```
第一个参数：水平阴影的位置（为正即右移xxpx，为负左移）
第二个参数：垂直阴影的位置（为正即下移，为负上移）
（第三个参数，可选）：模糊程度
（第四个参数，可选）：阴影的大小
（第五个参数，可选）：阴影颜色

## 边界图片（border-image）
使用`border-image:url(image-url)`属性
使用图片作为边框样式，[示例](https://www.runoob.com/try/try.php?filename=trycss3_border-image)

# 外边框（Margin）

`margin`项有两个可选项，`length`和`auto`
`auto`：设置浏览器边距，取决于浏览器
`length`：固定的具体数值
<b>
- margin:边距1，边距2，边距3，边距4;</b><br />
&emsp;&emsp;上->右->下->左<br />
<b>
- margin:边距1，边距2，边距3</b><br />
&emsp;&emsp;上->左右->下<br />
<b>
- margin:边距1，边距2</b><br />
&emsp;&emsp;上下->左右<br />
<b>
- margin:边距1</b><br />
&emsp;&emsp;上下左右边距相同
<br /><br />

# 内边框（padding）
`padding`项，内容与`margin`相同

# 尺寸（Dimension）
最大高度——`max-height`
最大宽度——`max-width`
最小高度——`min-height`
最小宽度——`min-width`
都可以使用像素值或百分比来进行设置。

# 显示（display&visibility）
## 可见性
使用`display`和`visibility`标签
通过设置`display:none`和`visibility:hidden`标签来隐藏元素。
<p class="note note-primary">
<b>
visibility:hidden，可以隐藏元素，但是元素仍然占用空间，对布局会有影响。<br />
display:none，可以隐藏元素，同时元素不占用空间。</b>
</p>

## 👀块元素和内联元素

**块级元素特性：**
- 总是独占一行，表现为另起一行开始，而且其后的元素也必须另起一行显示;
- 宽度(width)、高度(height)、内边距(padding)和外边距(margin)都可控制;

**内联元素(inline)特性：**
- 和相邻的内联元素在同一行;
- 宽度(width)、高度(height)、内边距的top/bottom(padding-top/padding-bottom)和外边距的top/bottom(margin-top/margin-bottom)都不可改变，就是里面文字或图片的大小;

**块级元素主要有：**
address , blockquote , center , dir , div , dl , fieldset , form , h1 , h2 , h3 , h4 , h5 , h6 , hr , isindex , menu , noframes , noscript , ol , p , pre , table , ul , li

**内联元素主要有：**
a , abbr , acronym , b , bdo , big , br , cite , code , dfn , em , font , i , img , input , kbd , label , q , s , samp , select , small , span , strike , strong , sub , sup ,textarea , tt , u , var

👀CSS中，可以通过修改`dispaly`属性来改变块级显示或是内联显示
- display:block —— 显示为块级元素
- display:inline —— 显示为内联元素
- display:inline-block —— 显示为内联元素，表现为同行显示并可修改高度内外边距等属性

例如通常将`<ul>`加上`display:inline`或`display:inline-block`属性，来使得列表水平显示，用作导航栏之类。

# 定位（position）
使用`position`属性，和`top`、`bottom`、`left`、`right`属性配合使用。
``` css
position:static
```
可选项：`static`、`fixed`、`relative`、`absolute`、`sticky`

`static`：默认值，没有定位，不受`top`、`left`等属性的影响。
`fixed`：相对于窗口的固定位置，即使窗口滚动它也不动。通过四个属性值设定具体位置。
`relative`：相对于该元素的正常位置。但是占用空间不变，例如两个标题，占用两行，通过top属性使第二行覆盖第一行，则第二行所占位置仍然存在，成为空白。
`absolute`：绝对定位，相对于最近的以定位的父元素，若没有则相对于\<html\>，`absolute`定位的元素不占用空间，不影响布局，相当于“浮于文字上方”
`sticky`：sticky定位的元素在没有移出窗口时相当于relative，在移出窗口后就位于窗口最上方，就是顶部菜单栏的形式。

此外，可以通过`z-index`属性来指定元素的堆叠顺序。相当于手动规定不同的图层顺序。`z-index`的值越大，图层就在越上层。如果没有定义`z-index`属性的话，最后定位在HTML代码中的元素将在最前面。

# 裁剪（clip）
``` css
//固定格式
clip:rect(top, right, bottom, left)
```
`top`：表示从上方截去多少像素
`right`：表示左侧剩余多少像素
`bottom`：表示上方剩余多少像素
`left`：表示从左侧截去多少像素
🐷就很诡异

# 溢出处理（overflow）
使用`overflow`属性
``` css
overflow:hidden;
```
可选项：`visible`、`hidden`、`scroll`、`auto`
`visible`：默认值，溢出了就在下方继续显示
`hidden`：溢出后将溢出内容隐藏
`scroll`：提供一个滚动条
`auto`：在溢出后再提供一个滚动条以供查看内容

# 浮动（float&clear）
``` css
float:left;
clear:both;
```
可选项`left`、`right`分别对应靠左和靠右
使用`clear`可规定元素周围不出现浮动元素，可选项`left`、`right`、`both`
图片的浮动效果类似于word中“文字环绕型”

# 布局\对齐

## 元素居中对齐
使用`margin:auto`来进行元素居中对齐
``` html
<div style="
    margin: auto;
    width: 60%;
    border: 3px solid #73AD21;
    padding: 10px;
">
<p>元素居中对齐</p>
</div>
```
<div style="
    margin: auto;
    width: 60%;
    border: 3px solid #73AD21;
    padding: 10px;
">
<p>元素居中对齐</p>
</div>

## 文本居中对齐
使用`text-align`属性，

## 图片居中对齐

### 使用margin:auto
同样使用`margin:auto`来设置居中对齐，不过需要将图片使用`display:block`以块形式显示

### 使用div
可以在图像外层套一层`<div>`标签，并在div的样式表中设置`text-align:center`

## 左右对齐

### 使用position
使用`position:absolute`属性来对齐元素，设定`left:0px;`进行左对齐，`right:0px`右对齐

### 使用float
使用`float:left`左对齐，`float:right`右对齐。
但是当子元素的高度大于父元素时，子元素将溢出。这时可以给父元素添加`overflow:auto`来解决子元素溢出的问题。[示例](https://www.runoob.com/try/try.php?filename=trycss_layout_clearfix)

## 垂直居中对齐

### 使用padding
即在头部顶部使用`padding`，即可实现垂直居中
``` html
<p style="padding: 30px 0;border: 3px solid green;">垂直居中</p>
```
<p style="padding: 30px 0;border: 3px solid green;">垂直居中</p>

### 使用line-height
设置`line-hright`的值与`height`的值相等即可实现垂直居中
``` html
<p style="line-height:50px;height:50px;border: 3px solid green;">垂直居中</p>
```
<p style="line-height:50px;height:50px;border: 3px solid green;">垂直居中</p>

# 伪类
在选择器后添加冒号`:`来选择伪类，常用举例：
``` html
a:link{color:red;}  //未访问的链接
a:visited{color:blue;}  //已访问的链接
a:hover{color:aqua;}  //当鼠标悬停在上方时的样式
a:active{color:yellow;}   //已选中的链接，即按下还未松开的状态

a:before{
    content:"Read this -";
    background-color:yellow;
    color:red;
    font-weight:bold;   
}  //在所有"a"元素前插入的内容和样式

a:after{
    content:"Read this -";
    background-color:yellow;
    color:red;
    font-weight:bold;   
}  //在所有"a"元素后插入的内容和样式
```
# 👀多列

## 创建多列（column-count）
使用`column-count`属性，通过指定后面的数字来规定将元素分为几列
``` html
column-count:3;
```
<p style="column-count:3">上述代码说明将元素分成3列-----分割一下-----上述代码说明将元素分成3列-----分割一下-----上述代码说明将元素分成3列-----分割一下-----上述代码说明将元素分成3列-----分割一下-----上述代码说明将元素分成3列-----分割一下-----</p>

## 列与列的间隙（column-gap）
使用`column-gap`属性来设定列与列之间的间隙，下示代码将间隙设为50px;
``` html
column-gap:50px;
```
<p style="column-count:3;column-gap:50px;">上述代码说明将元素分成3列-----分割一下-----上述代码说明将元素分成3列-----分割一下-----上述代码说明将元素分成3列-----分割一下-----上述代码说明将元素分成3列-----分割一下-----上述代码说明将元素分成3列-----分割一下-----</p>

## 列边框

**边框样式**

使用`column-rule-style`属性

**边框颜色**

使用`column-rule-color`属性

**边框厚度**

使用`column-rule-width`属性

**缩写**
可使用`column-rule`属性来缩写

**示例**
``` html
column-rule-style:solid;
column-rule-width:1px;
column-rule-color:#cccccc;

-------或者---------
column-rule:1px solid #cccccc;
```
<p style="column-count:3;column-rule:1px solid #cccccc;">上述代码说明将元素分成3列-----分割一下-----上述代码说明将元素分成3列-----分割一下-----上述代码说明将元素分成3列-----分割一下-----上述代码说明将元素分成3列-----分割一下-----上述代码说明将元素分成3列-----分割一下-----</p>

## 指定元素跨越多少列（column-span）
使用`column-span`属性
``` html
column-span:all;
```
可选项`1`、`all`，[示例](https://www.runoob.com/try/try.php?filename=trycss3_column-span)

## 列宽度（column-width）
使用`column-width`属性可以设定每列的宽度，会根据宽度自动分列，不用规定列数。
``` html
column-width:100px;
```
<p style="column-width:100px">上述代码将列宽度设定为100px，在电脑上一般为5列。。上述代码将列宽度设定为100px，在电脑上一般为5列。。上述代码将列宽度设定为100px，在电脑上一般为5列。。上述代码将列宽度设定为100px，在电脑上一般为5列。。</p>

# 多媒体查询（@media）
格式：
``` css
@media not|only mediatype and (expressions) {
    CSS 代码...;
}
```
`mediatype`表示媒体类型，通过`not|only|all`来进行筛选

`mediatype`的可选项：
`print`：打印机
`screen`：用于电脑屏幕、平板、智能手机等
`speech`：用于屏幕阅读器

筛选项：
`not`：不应用于后述媒体类型
`only`：只应用于后述媒体类型
`all`：应用于所有媒体类型，使用all时可以省去媒体类型，也可以只写媒体类型省去all

expressions：
表达式，当所选设备满足表达式时应用css样式

[示例：](https://www.runoob.com/try/try.php?filename=trycss3_media_queries1)
``` html
<style>
    p.test-media{
        background-color:pink;
    }

    @media screen and (max-width:480px){
        p.test-media{
        background-color:lightgreen;
        }
    }
</style>
```


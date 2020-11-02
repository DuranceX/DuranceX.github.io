---
title: 主题中note提示框的使用
date: 2020-03-04 14:09:24
tags: [hexo, 美化]
categories: 博客美化
index_img: /img/美化/container.png
---
fluid主题中note提示框的挖掘。

<!-- more -->

# Fluid中note提示框的挖掘使用

在一个博客主题中看到了如下的"提示框"效果
![](/img/美化/container-example.png)

&emsp;&emsp;就想着能不能在fluid主题中实现类似的效果，按照博客中的教程进行了设置后发现并不能使用，应该是不同主题的缘故。这个想法也就作罢了。
&emsp;&emsp;但今天在根据fluid主题在github上的更新记录添加“文章更新时间”功能的时候，发现在post.ejs中使用了一个`note-warning`的类，原本只是想要修改一下这个note的样式，从黄色调成蓝色，然后在其对应的css文件中（路径：`fluid\source\lib\mdbootstrap\css\mdb.min.css`发现不止有`note-waring`类，还有`note-primary`、`note-info`等一系列类，一想这个跟上图中的提示框的代码相近，会不会有相同的效果？于是进行了尝试，发现果真如此！虽然不能像上图那个博客一样通过下面那种格式来使用
```
::: info
here if info
:::
```
但是在markdown中同样可以通过html的语法来进行调用。
``` html
<p class="note note-primary">here is note-primary</p>
<p class="note note-secondary">here is note-secondary</p>
<p class="note note-success">here is note-success</p>
<p class="note note-danger">here is note-danger</p>
<p class="note note-warning">here is note-warning</p>
<p class="note note-info">here is note-info</p>
<p class="note not-light">here is note-light</p>
```
效果依次为：
<p class="note note-primary">here is note-primary</p>
<p class="note note-secondary">here is note-secondary</p>
<p class="note note-success">here is note-success</p>
<p class="note note-danger">here is note-danger</p>
<p class="note note-warning">here is note-warning</p>
<p class="note note-info">here is note-info</p>
<p class="note not-light">here is note-light</p>

具体的样式可以在`fluid\source\lib\mdbootstrap\css\mdb.min.css`搜索`note`定位后进行修改🤪
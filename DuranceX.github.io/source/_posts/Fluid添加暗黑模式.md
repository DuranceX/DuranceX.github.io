---
title: Fluid添加暗黑模式
date: 2020-05-10 14:54:32
tags: [hexo 美化]
categories: 博客美化
index_img: /img/美化/darkmode.jpg
---

为Fluid添加暗色模式

<!-- more -->

之前一直就想为博客添加个暗色模式，但是拖延症晚期:crying_cat_face:，所以一直拖到了现在，主要的代码参考自[Royce](https://royce2003.top/posts/41212.html)的博客，emmm，这里还是把代码搬一下。。

### HTML

首先是HTML，在`\themes\fluid\layout\layout.ejs`中找到`<body>`标签，然后在下方加入以下代码

``` html
<div id="dark" onclick="switchDarkMode()"></div>
<script>
  var isNight = new Date().getHours() >= 22 || new Date().getHours() < 7;
  if( isNight || localStorage.getItem('dark') === '1') {
    if(!(isNight&&localStorage.getItem('noDark') === '1')) {
      document.body.classList.add('dark');
    }
  }
  document.getElementById('dark').innerHTML = document.querySelector("body").classList.contains("dark")?"🌙":"🌞";
</script>
```

> 这里原本是用了媒体查询的，可以根据浏览器是否开启深色模式来对应开启深色模式，不过貌似有点小问题:sweat:，比如我的浏览器开了深色模式，但我点击了按钮，切换成了亮色模式，那肯定是说明我是喜欢以亮色模式访问该网站，但当我换了一个页面的时候（比如换了一个文章或回到首页）它又会检测到深色模式后切换到深色模式，emmmm，所以就先删了。。

### JS

然后是JS，在主题下的`source\js`文件夹下新建一个 DarkMode.js 文件，在其中加入以下代码

``` js
//点击事件
function switchDarkMode() {
	if ($('body').hasClass('dark')) {
        /*$("#dark").html("🌞");*/
       document.getElementById("dark").style.background = "url('/img/dark.png')";
		document.body.classList.remove('dark');
		localStorage.setItem('noDark', '1');
		localStorage.setItem('dark', '0');
	} else {
        /*$("#dark").html("🌙"); */
        document.getElementById("dark").style.background = "url('/img/light.png')";
		document.body.classList.add('dark');
		localStorage.setItem('dark', '1');
		localStorage.setItem('noDark', '0');
	}
}
```

然后在Fluid主题的`_config.yml`中找到`custom_js`项，加入新建的 js 文件。

这个原版代码是通过注释中的两个字符——“🌞“和“🌙”来进行区分暗色模式和亮色模式。但个人觉得不太美观，同样，他的博客中也有一篇提到了 “返回页面顶”的一个类似于小挂件的效果，于是就想将那个挂件的效果改为更改模式，因此用PS粗粗地P了两个图，分别是带月亮dark.png和带太阳的light.png，在该段JS代码中，在切换模式的同时，将两个图片进行了切换。

### CSS

最后是CSS，在主题下的`source\css`文件夹下，新建一个`DarkMode.styl`因为使用的是 style 文件，所以可以不在 `_config.yml`中引入，直接在同目录下的`main.styl`中进行导入即可。添加以下代码。

``` css
/* 切换按钮 */
#dark
  cursor pointer
  position fixed
  z-index 100
  left 50px 
  width 70px
  height 600px
  top -350px
  box-shadow 0 0 /* 去除外边框的阴影 */

  & > i
    display none /* 隐藏一个小箭头图标，否则会在图片上出现箭头 */

/*暗黑模式*/
.dark
  background-color rgb(31, 31, 31)
  

  /* 主体 */
  #board 
    background-color #1c1c21
    color #a09c9c
  
  blockquote
    border-left .25em solid #68696a
  img  
    filter brightness(50%)

  p
  .index-info a  
    color #718096

  .index-info a:hover
    color #3aa7f9

  .markdown-body
    h1,h2,h3,h4,h5,h6,s,li  
      color rgb(191, 191, 191) !important

    
  .markdown-body a
    color rgb(153, 189, 230)

  /* 顶栏 */
  .navbar-col-show
  .top-nav-collapse  
    background-color #282c34
    
  .navbar a  
    color rgb(191, 191, 191) !important
    
  .animated-icon span   /* 手机端 */
    background-color rgb(191, 191, 191)


  /* page-number */
  .pagination a:hover
  .pagination .current  
    background-color #6b6b6b73
    color rgb(191,191,191)


  /* 打字机 */
  #subtitle
  .dark.typed-cursor--blink
  .scroll-down-arrow
    color #dfdfdf


  /* back to top */
  #scroll-top-button
    background-color #282c34

    i
      color #a09c9c
    

  /* Toc */
  .tocbot-list a
    color #a09c9c

  .tocbot-active-link
  footer a:hover
    color #3aa7f9 !important

  /* footer */
  footer
  footer a
    color #718096
    
  /* 表格 */
  .markdown-body table td
  .markdown-body table th 
    padding: 6px 13px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(54, 54, 54);
    border-image: initial;


  /* 归档页 */
  .list-group-item
    color rgb(191, 191, 191)
    background-color #282c34
    
  .list-group-item:hover
  .tagcloud a:hover
    background-color #46484d


  /* 友链页 */
  .links
    .card  
      background-color #1c1c21
        
    .card-body:hover  
      background-color #46484d
        
    .link-title
    .link-intro  
      color rgb(191, 191, 191)
    

  /* note标签 可能这配色有点丑 */
  .note-info
    background-color #3b5359
    border-color #006d80

  .note-danger
    background-color #783f42
    border-color #670009

  .note-success
    background-color #2a3e2e
    border-color #005915

  .note-warning
    background-color #5b543e
    border-color #846500

  .note-primary
    background-color rgb(69, 89, 110)
    border-color rgb(28, 67, 110)

  /* aPlayer */
  .aplayer 
    background rgb(28, 28, 33)  !important

  .aplayer-lrc:after
    background linear-gradient(rgba(28, 28, 33, 0) 0px, rgba(28, 28, 33, 0.8)) !important

  .aplayer-lrc:before
    background linear-gradient(rgb(28, 28, 33) 0px, rgba(28, 28, 33, 0)) !important

  .aplayer.aplayer-withlist .aplayer-info
    border-bottom 1px solid rgb(48, 48, 48) !important

  /* valine */
  .v .vwrap 
    margin-bottom 10px
    position relative
    border-width 1px
    border-style solid
    border-color rgb(41, 41, 41)
    border-image initial
    border-radius 4px
    overflow hidden
    padding 10px

  a:active
    color #3aa7f9 

  .drop-cap .index-card a .post-meta p
    color #a09c9c

```

对于原版CSS中的配色方案进行了微调，同时在CSS中添加了切换按钮的点击效果，原本是点击图片直接切换模式和图片，但感觉略显生硬，因此为它添加了一点小效果，就像是旧式的拉绳式的电灯，当按下时，“绳子变长”，即图片下移一部分，当鼠标松开时再回到原位，并更换图片。

将原版HTML中的\<div>标签改为\<a>标签，这样便可以通过`:active`来响应鼠标按下事件，只需要在鼠标按下时将图片下移即可。即在style文件最后添加

```stylus
#dark:active
  top -300px
```

> 原本想着是不是要用贝塞尔曲线来加个动画来着。。。后来发现根本也不会按那么久。单单点击只要让图片下移就可以有差不多的效果了。:see_no_evil:

<div>
<a class="btn"  href="https://cdn.jsdelivr.net/gh/DuranceX/BlogPhoto/img/light.png">light图片</a>
<a class="btn" href="https://cdn.jsdelivr.net/gh/DuranceX/BlogPhoto/img/dark.png"">dark图片</a>
</div>
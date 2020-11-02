---
title: fluid个性化
date: 2020-02-24 10:23:23
tags: [hexo, 美化]
categories: 博客美化
index_img: /img/美化/header.jpg
---

各类参数的修改位置及作用、网页音乐播放器、评论模块、一言的调用等.....
<!-- more -->

# fluid个性化及小插件的使用

## 网页标题浏览器恶搞

在` \themes\fluid\source\js` 下创建一个新的js文件，例如` FunnyTitle.js`，输入如下内容：
``` lua{javascript,}
// 浏览器搞笑标题
var OriginTitle = document.title;
var titleTime;
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        $('[rel="icon"]').attr('href', "/img/avatar.png");
        document.title = '╭(°A°`)╮ 页面崩溃啦 ~';
        clearTimeout(titleTime);
    }
    else {
        $('[rel="icon"]').attr('href', "/img/favicon.png");
        document.title = '(ฅ>ω<*ฅ) 噫又好啦 ~' + OriginTitle;
        titleTime = setTimeout(function () {
            document.title = OriginTitle;
        }, 2000);
    }
});
```
之后在`\themes\fluid\layout.ejs`中末尾输入
``` javascript
<!--浏览器搞笑标题-->
<script type="text/javascript" src="/js/FunnyTitle.js"></script>
```


## fluid鼠标点击效果更改

fluid主题的鼠标特效在` \themes\fluid\layout\_partial\plugins\mouse-click.ejs`中，找到如下图所示的代码
![](/img/美化/mouse-click.png)将数组中的字符串进行更改即可进行自定义
然后在**主题配置**（即fluid的`_config.yml`）中将`mouse-clik`项的style改为values


## 一言
[一言官网](https://hitokoto.cn/)

根据官网提供的示例，在` \themes\fluid\layout\layout.ejs`中添加如下代码
``` html
<!-- 以下写法，选取一种即可 -->

<!-- 现代写法，推荐 -->
<!-- 兼容低版本浏览器 (包括 IE)，可移除 -->
<script src="https://cdn.jsdelivr.net/npm/bluebird@3/js/browser/bluebird.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/whatwg-fetch@2.0.3/fetch.min.js"></script>
<!--End-->
<script>
  fetch('https://v1.hitokoto.cn')
    .then(function (res){
      return res.json();
    })
    .then(function (data) {
      var hitokoto = document.getElementById('hitokoto');
      hitokoto.innerText = data.hitokoto; 
    })
    .catch(function (err) {
      console.error(err);
    })
</script>

<!-- 老式写法，兼容性最忧 -->
<script>
  var xhr = new XMLHttpRequest();
  xhr.open('get', 'https://v1.hitokoto.cn');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      var data = JSON.parse(xhr.responseText);
      var hitokoto = document.getElementById('hitokoto');
      hitokoto.innerText = data.hitokoto;
    }
  }
  xhr.send();
</script>

<!-- 新 API 方法， 十分简洁 -->
<script src="https://v1.hitokoto.cn/?encode=js&select=%23hitokoto" defer></script>
```
然后在任意想要加入一言的位置添加
``` html
<p id="hitokoto">:D 获取中...</p>
```
例如我在页面的最底部，即hexo❤Fluid下方加入一言，即在` \themes\fluid\layout\_partial\footer.ejs`中加入该行代码。在页面中显示的具体位置由代码所在位置决定。

一言官网举例了几个网址供读取信息
``` html
https://v1.hitokoto.cn/（从7种分类中随机抽取）

https://v1.hitokoto.cn/?c=b （请求获得一个分类是漫画的句子）

https://v1.hitokoto.cn/?c=f&encode=text （请求获得一个来自网络的句子，并以纯文本格式输出
```
在本部分第一个代码块中将对应的网址更改即可，同样可以通过“&”的方式指定多个特定的类型
``` html
https://v1.hitokoto.cn/?c=c&c=d （从游戏分类和小说分类中获取一个句子）
```
参数列表如下，通过c=xx来使用

<table border="0">
<tr>
    <th>参数</th>
    <th>  </th>
    <th>描述</th>
</tr>
<tr >
	<td rowspan="7">C</td>
	<td>a</td>
	<td>Anime - 动画</td>
</tr>
<tr>
    <td>b</td>
    <td>Comic – 漫画</td>
</tr>
<tr>
    <td>c</td>
    <td>Game – 游戏</td>
</tr>
<tr>
    <td>d</td>
    <td>Novel – 小说</td>
</tr>
<tr>
    <td>e</td>
    <td>Myself – 原创</td>
</tr>
<tr>
    <td>f</td>
    <td>Internet – 来自网络</td>
</tr>
<tr>
    <td>g</td>
    <td>Other – 其他</td>
</tr>
</table>


## 音乐播放插件
这里使用的是插件是[APlayer](https://aplayer.js.org/#/zh-Hans/)
🎶Wow, such a beautiful HTML5 music player
原本用的是网易云的的外链播放器，然鹅！网易云几乎所有的歌都因版权问题无法生成外链播放器，即使通过一些方法生成了也无法播放，因此采用了APlayer。

首先安装Aplayer
``` git
cnpm install aplayer --save
```
我因为网络的问题替换了成了淘宝的镜像，若没有设置过直接使用npm即可。

在想要加入网页播放器的地方输入以下代码
``` html
<html>
  <head>
      <link href="https://cdn.bootcss.com/aplayer/1.10.1/APlayer.min.css" rel="stylesheet">
      <script src="https://cdn.bootcss.com/aplayer/1.10.1/APlayer.min.js"></script>
      <style>
          .demo{width:360px;margin:0px auto 20px auto}
          .demo p{padding:10px 0}
      </style>
  </head>
  <body>
    <div class="text-center">
      <div class="demo">
          <div id="player1">
              <pre class="aplayer-lrc-content">
                [00:00.00]鹿先森乐队 - 华年
                [00:00.30]
                [00:00.91]作曲：倍倍
                [00:01.66]作词：倍倍
                [00:01.26]编曲：鹿先森乐队
                [00:01.52]木吉他：杨博士
                [00:01.77]电吉他：董二胖
                [00:02.28]贝斯：李斯
                [00:02.17]键盘：冰冰
                [00:02.38]鼓：PP
                [00:02.48]和音：鱼椒盐、杨博士
                [00:02.83]弦乐：国际首席爱乐乐团
                [00:03.24]录音棚：55T.E.C、Big.J Studio
                [00:03.49]混音助理：茆博文
                [00:03.79]制作人：李卓
                [00:04.10]弦乐编写：李卓
                [00:04.25]混音：李卓
                [00:04.40]母带处理：周天澈
                [00:05.00]
                [00:05.80]在夏天结束的瞬间
                [00:07.42]怀念你年轻身影
                [00:11.42]你每天都在说的那些话
                [00:13.90]如今讲给谁人听
                [00:16.94]当过往散了爱慕
                [00:19.16]与光阴相向而行
                [00:22.71]你眼神烙印岁月最后的深情
                [00:25.88]
                [00:28.42]也许一次离别
                [00:29.69]就能抹去再多的重逢
                [00:33.91]那年一起种下的树啊
                [00:36.55]如今飘荡着一样的风
                [00:39.59]当誓言终将欺了日月
                [00:42.32]这爱恋不澈不浓
                [00:45.25]你裙摆绽放走向我脚步轻松
                [00:48.88]
                [00:50.61]可是命运啊
                [00:51.52]渴望啊和热烈啊
                [00:55.92]非将这生长赋予
                [00:57.39]悲欢交织的感动
                [01:01.93]夏日轻柔的晚风
                [01:04.81]壮阔波澜的相拥
                [01:07.16]已杂草丛生
                [01:10.56]都不及你第一次
                [01:12.13]望向我的面容
                [01:14.55]
                [01:19.23]也许一次离别
                [01:20.50]就能抹去再多的重逢
                [01:24.61]那年一起种下的树啊
                [01:27.44]如今飘荡着一样的风
                [01:30.37]当誓言终将欺了日月
                [01:33.16]这爱恋不澈不浓
                [01:36.21]你裙摆绽放走向我脚步轻松
                [01:39.55]
                [01:40.77]可是命运啊
                [01:42.44]渴望啊和热烈啊
                [01:46.69]非将这生长赋予
                [01:48.26]悲欢交织的感动
                [01:52.76]夏日轻柔的晚风
                [01:55.56]壮阔波澜的相拥
                [01:57.99]已杂草丛生
                [02:01.64]都不及你第一次
                [02:03.70]望向我的面容
                [02:05.10]
                [02:06.29]可是青春啊
                [02:07.82]鲜血啊和真切啊
                [02:12.18]请铭记呀
                [02:13.22]即使从未有过年轻
                [02:18.18]阳光穿过你的脖颈
                [02:20.96]酒杯碰碎的声音
                [02:23.27]时光忽暗忽明
                [02:27.68]都忘却吧
                [02:28.80]就像从未有过年轻
                [02:30.55]
                [03:02.65]可是命运啊
                [03:04.37]渴望啊和热烈啊
                [03:08.47]非将这生长赋予
                [03:10.94]悲欢交织的感动
                [03:14.65]夏日轻柔的晚风
                [03:17.47]壮阔波澜的相拥
                [03:19.69]已杂草丛生
                [03:23.54]都不及你第一次
                [03:24.91]望向我的面容
                [03:26.88]
                [03:28.94]可是青春啊
                [03:29.71]鲜血啊和真切啊
                [03:35.28]请铭记呀
                [03:36.50]即使从未有过年轻
                [03:41.50]阳光穿过你的脖颈
                [03:44.23]酒杯碰碎的声音
                [03:46.52]时光忽暗忽明
                [03:50.37]都忘却吧
                [03:51.33]就像从未有过年轻
                [03:55.73]都忘却吧
                [03:56.94]就像从未有过年轻
                [04:01.40]都忘却吧
                [04:02.56]就像从未有过年轻
                [04:06.91]书终烟灭夜深水静
              </pre>
          </div>
      </div>
    <script>
        var ap = new APlayer
                ({
                    element: document.getElementById('player1'),
                    narrow: false,
                    autoplay: false,
                    showlrc: true,
                    music: {
                            title: '华年',
                            author: '鹿先森乐队',
                            url: 'http://music.163.com/song/media/outer/url?id=542667160.mp3',
                            pic: 'http://p2.music.126.net/r94mVfx8ERhRr7Zzemhd_w==/109951163405599390.jpg'
                            }
                });
        ap.init();
    </script>
```
例如我将播放器加入到“关于”界面，就在`\themes\fluid\layout\about.ejs`中加入这段代码，在这里我将代码嵌入跟原有代码进入了稍微的整合，使结构清晰。
在上述代码的`script`块中，`autoplay`是自动播放，改为true则会在打开该页面时自动播放。
在网页版网易云音乐搜索歌曲，打开后将网址的最后一串数字替换到`url`中对应的数字部分即可更换歌曲![](/img/美化/music.png)
歌曲封面由`pic`字段决定，同样在网页版网易云音乐界面，在F12开发者模式中选中歌曲封面区域即可得到封面链接，替换至`pic`区域即可。歌词来自<https://www.90lrc.cn/>

参考网址：<https://blog.csdn.net/jclian91/article/details/80876198>

## 背景添加动态线条
在`\theme\fluid\layout\layout.ejs`文件中添加如下代码
``` javascript
<!--动态线条背景-->
<script type="text/javascript"
color="140,140,140" opacity='0.7' zIndex="-2" count="200" src="//cdn.bootcss.com/canvas-nest.js/1.0.0/canvas-nest.min.js">
</script>
```
其中：
- color：表示线条颜色，三个数字分别为(R,G,B)，默认：（0,0,0）
- opacity：表示线条透明度（0~1），默认：0.5
- count：表示线条的总数量，默认：150
- zIndex：表示背景的z-index属性，css属性用于控制所在层的位置，默认：-1
转自[TRHX博客](https://www.itrhx.com/2018/08/27/A04-Hexo-blog-topic-personalization/#【13】背景添加动态线条效果)


## 网站运行时间
在`\themes\fluid\layout\_partial\footer.ejs`中添加以下代码
``` javascript
<span id="timeDate">载入天数...</span><span id="times">载入时分秒...</span>
<script>
    var now = new Date(); 
    function createtime() { 
        var grt= new Date("21/02/2020 17:38:00");//在此处修改你的建站时间，格式：月/日/年 时:分:秒
        now.setTime(now.getTime()+250); 
        days = (now - grt ) / 1000 / 60 / 60 / 24; dnum = Math.floor(days); 
        hours = (now - grt ) / 1000 / 60 / 60 - (24 * dnum); hnum = Math.floor(hours); 
        if(String(hnum).length ==1 ){hnum = "0" + hnum;} minutes = (now - grt ) / 1000 /60 - (24 * 60 * dnum) - (60 * hnum); 
        mnum = Math.floor(minutes); if(String(mnum).length ==1 ){mnum = "0" + mnum;} 
        seconds = (now - grt ) / 1000 - (24 * 60 * 60 * dnum) - (60 * 60 * hnum) - (60 * mnum); 
        snum = Math.round(seconds); if(String(snum).length ==1 ){snum = "0" + snum;} 
        document.getElementById("timeDate").innerHTML = "本站已勉强运行 "+dnum+" 天 "; 
        document.getElementById("times").innerHTML = hnum + " 小时 " + mnum + " 分 " + snum + " 秒"; 
    } 
setInterval("createtime()",250);
</script>
```
{% blockquote THRX博客 - https://www.itrhx.com/2018/08/27/A04-Hexo-blog-topic-personalization/#【10】添加网站运行时间 %}
转自
{% endblockquote %}
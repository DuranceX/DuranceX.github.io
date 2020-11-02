---
title: Latex的Katex渲染引擎设置
date: 2020-03-03 14:01:40
tags: [problems,hexo]
categories: problems
index_img: /img/problems/katex.png
---
调用katex渲染引擎渲染latex中出现的一些问题
<!-- more -->

# Latex的Katex渲染引擎设置
&emsp;&emsp;由于需要在markdown中插入数学公式，因此了解到了Latex，但是在完成了公式的输入后发现hexo中并不能成功渲染Latex公式。为什么呢？这是因为hexo使用自带的`hexo-renderer-marked`引擎来渲染页面，但是`hexo-renderer-marked`引擎不能渲染Latex引擎，因此我们需要更换引擎。
供选择的有`hexo-renderer-kramed`和`hexo-renderer-markdown-it-plus`
不过由于`kramed`引擎不能支持markdown all in one中的下标"~ ~"以及 上标"^ ^"这类格式，因此本文使用`hexo-renderer-markdown-it-plus`引擎
在更换渲染引擎时首先需要先卸载原先的渲染引擎，再安装新引擎
``` js
npm uninstall hexo-renderer-marked --save
npm install hexo-renderer-markdown-it-plus --save
```
安装`kramed`的话同理
``` js
npm uninstall hexo-renderer-marked --save
npm install hexo-renderer-kramed --save
```

在安装完引擎后，在fluid的`_config.yml`中找到`math`项
``` yml
math: 
    enable: true
    specific: true 
    engine: katex  
```
将`enable`的值改为`true`，`engine`的值改为`katex`
由于这里将`specific`的值设为了`true`，所以在需要进行数学公式渲染的文章的`font-matter`中添加一条`math: true`，采用这种方法可以不影响不需要进行数学公式渲染的页面的加载速度。
这时候再`hexo s`发现界面中latex公式已经渲染成功了，但是不太美观
![](/img/problems/bad-katex.jpg)

这时候还需要在fluid主题下的`_static_prefix.yml`文件中进行配置
在文件最后找到`katex`，将其值设为`https://cdn.staticfile.org/KaTeX/0.11.1/`此时再刷新页面即可看到渲染后的数学公式了
![](/img/problems/good-katex.png)

若看不到效果的话，依次执行
``` git 
hexo clean
hexo g
hexo s
```
即可在localhost中看到渲染后的效果
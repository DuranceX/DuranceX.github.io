---
title: 博客使用Github作为图床
date: 2021-09-24 17:26:03
tags: [博客]
categories: 博客
---



使用GitHub作为图床，使用PicGo作为上传图片的工具

<!--more-->

## 创建Github图床

在这里我们需要额外新建一个库用来存储图片而不能在原来库的基础上进行存储，因为hexo在上传时会将服务器中的文件全部清空，然后再将本地文件进行上传。所以如果我们将图床地址设置为原有的库的话，在hexo deploy后，库中上传的图片都会被删除，这样图片链接自然就失效了，因此我们需要新建一个库。

首先在GitHub上新建一个新的repo。然后在settings中打开pages页面，设置一个自定义域名，这里就使用的博客域名下的二级域名images.starnight.top，在阿里云的云解析DNS中添加该二级域名的CNAME解析文件。

然后在该库中新建一个index.html文件，如果没有该文件，GitPages无法生成站点，打开会是个404报错，自然也就无法引用图片了。

## 设置PicGo

在Github上下载[PicGo](https://github.com/Molunerfinn/PicGo/releases)，在PicGo应用中选中Github图床进行设置

[![img](http://images.starnight.top/img/20210924180908.png)](http://images.starnight.top/img/20210924180908.png)

**设定仓库名**：即新创建的用于存放图片的repo

**设定分支名**：即选定仓库的选定分支名称

**设定Token**：Github生成的验证Token，见下

**指定存储路径**：即图片在Github库中的存放位置，默认情况下存放在库中的根目录下

**设定自定义域名**：即我们在settings中所设定的自定义域名

设置完成后即可进行图片的上传了。

## 生成Token

[![img](http://images.starnight.top/img/20210924181318.png)](http://images.starnight.top/img/20210924181318.png)

点击头像中的Settings，在左侧选项选择`Developer settings`，选择`Personal access tokens`，然后在右侧点击`Generate new token`来生成新的token

[![img](http://images.starnight.top/img/20210924181536.png)](http://images.starnight.top/img/20210924181536.png)

此处只要勾选repo即可

[![img](http://images.starnight.top/img/20210924181602.png)](http://images.starnight.top/img/20210924181602.png)

> 参考
>
> **知乎文章 -**[zhuanlan.zhihu.com/p/138012354](https://zhuanlan.zhihu.com/p/138012354)
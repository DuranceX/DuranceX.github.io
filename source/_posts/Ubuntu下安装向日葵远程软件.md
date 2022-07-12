---
title: Ubuntu下安装向日葵远程软件
date: 2020-10-19 09:02:56
tags: 杂
categories: 杂
---

在Ubuntu 20.04下安装向日葵远程软件。

<!-- more -->

先在向日葵官网下载对应的.deb文件，然后在终端中执行

```shell
sudo dpkg -i SunloginClient-10.0.2.24779_amd64.deb
```

此时可能会报错说缺少 `libwebkitgtk-3.0-0`如下图所示：

![libwebkitgtk-3.0-0](/img/problems/libwebkitgtk-3.0-0.webp)

解决方法：

1. 打开系统的源列表文件

```shell
sudo gedit /etc/apt/sources.list
```

2. 添加一项

```shell
deb http://cz.archive.ubuntu.com/ubuntu bionic main universe
```

3. 然后再执行下列操作

``` shell
sudo apt update
sudo apt install -f
```

然后找到向日葵打开即可运行。

![image-20201019164808406](/img/problems/SunloginClient.webp)


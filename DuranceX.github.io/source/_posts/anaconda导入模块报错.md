---
title: anaconda导入模块报错
date: 2020-10-23 11:45:08
tags: [problems]
categories: problems
---
Anaconda导入模块报错UserWarning: mkl-service package failed to import
<!-- more -->

**问题**

用新安装的anaconda运行之前的程序报错`UserWarning: mkl-service package failed to import`无法导入numpy，提示DLL错误

**解决**
是环境变量的配置问题，因为重新安装了anaconda所以环境变量没有配置
在环境变量中上半部分的用户变量中的`path`中添加下列路径
```
D:\anaconda
D:\anaconda\Library\bin
```
视具体类路径而言，总之就是anaconda的安装文件夹和其下的`Library\bin`文件夹
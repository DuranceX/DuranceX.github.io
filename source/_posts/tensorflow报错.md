---
title: tensorflow报错
date: 2020-10-23 12:26:23
tags: [problems]
categories: problems
---
tensorflow报错`UnknownError: Failed to get convolution algorithm. This is probably because cuDNN failed to initialize, so try looking to see if a warning log message was printed above.`
<!-- more -->
<br />

**问题**
在运行tensorflow时出现报错信息`UnknownError: Failed to get convolution algorithm. This is probably because cuDNN failed to initialize, so try looking to see if a warning log message was printed above.`

**解决方法**
方法一：
在项目中添加
```python
import os
os.environ['CUDA_VISIBLE_DEVICES'] = '/gpu:0'
```
可以正常运行，但此时没有使用GPU，而是使用的CPU进行运算

方法二：
重新安装cuDNN，在官网上下载对应的[cuDNN](https://developer.nvidia.com/rdp/cudnn-archive)版本，解压，将文件夹内的所有文件复制到CUDA安装目录`C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v10.0`下
再次运行可正常使用GPU进行运算

---
title: 多电脑同步hexo
date: 2020-11-02 20:48:33
tags: hexo
categories: hexo
---

最终在Surface Go2上也安装了hexo，跟笔记本一起，同步Hexo博客，这里记录部署的一些操作。

<!-- more-->

## 1. GitHub操作

首先在GitHub的xxx.github.io库中新建一个`source`分支，用来存放博客的静态资源文件，master分支仍用于存放hexo生成的页面。

在库中`Settings->Branches->Default branch`中将默认`branch`设为`source`分支。

## 2. 安装Hexo

安装Hexo部分见[CSDN的这篇文章](https://blog.csdn.net/sinat_37781304/article/details/82729029)

## 3. 配置Git

在surface Go2（第二台电脑）中，在git bash中输入

```git
git config --global user.name "username"
git config --global user.email "useremail"
```

建议是使用跟笔记本（原电脑）一样的内容，可以通过在原电脑的git bash中输入下述代码查看

```git
git config --global -l
```

之后创建新的ssh

```git
ssh-keygen -t rsa -C "useremail"
```

在命令行中会给出地址，一般在`C:/user/xxx/.ssh`中，在`.ssh`文件夹中打开`id_rsa.pub`，复制里面的内容。

打开GitHub的账户设置，在`Settings->SSH and GPG keys`点击右上角的`New SSH key`新建一个ssh，取个名，将复制的内容粘贴在下方的文本框中。

## 4.使用hexo

在新电脑上使用`git clone`将目标库的`source`分支克隆到本地，因为默认分支设为了`source`所以默认克隆的即是`source`分支下的内容。

将克隆下的文件复制到新电脑的博客目录下，保险起见，执行

```git
git pull --rebase origin master
```

{%  note  caution Tips %}

emmm，感觉git pull和git clone应该功能重合了。。

{% endnote %}

然后就可以在新电脑上编辑博客了，编辑完不要忘了`git push`

在原电脑上编辑时先`git pull`保持最新文件，然后继续修改即可。
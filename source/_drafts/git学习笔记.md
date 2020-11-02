---
title: git学习笔记
date: 2020-03-07 17:11:46
tags: [git]
categories: git
index_img: /img/git/header.jpg
---
git学习笔记，教程为廖雪峰的git教程

<!-- more -->

[廖雪峰教程](https:///www.liaoxuefeng.com)
# git学习笔记

## 安装git
[git官网](https://git-scm.com/downloads)下载
安装完成后在开始菜单找到"Git->Git Bash"出现一个类似CMD的窗口即安装成功
之后在窗口进行设置：
``` git
git config --global user.name "Name"
git config --global user.email "email@example.com"
```
其中`--global`此参数表明该设置使用该机器上的所有git仓库

## 创建版本库
新建一个文件夹后在git bash窗口进入该文件夹，输入
``` git
git init
```
通过该命令将该文件夹转变为Git可以管理的仓库。

## 添加文件
使用`git add xxx`命令添加文件，使用`git commit -m ""`命令来讲文件提交到本地版本库。
``` git
git add test.txt
git commit -m "add test.txt"
```
`-m`参数用来描述这一提交，是对这一次提交的说明，比如示例就是这一次提交中添加了一个叫做“test.txt”的文件

**git status**
`git status`命令用来返回当前仓库的状态
![](/img/git/maketxt.png)
比如上图显示在master分支没有commit，并且有一个新增的未追踪的test.txt文件
我们使用`git add`命令后，再使用`git status`就会如下图所示
![](/img/git/addtxt.png)
在使用`git commit`提交后显示`nothing to commit,working tree clean`说明当前目录没有未提交的操作
![](/img/git/committxt.png)
在我们修改了test.txt的内容后，使用`git status`显示修改的文件
![](/img/git/modifytxt.png)
但是怎么看我们进行了什么修改呢？使用`git diff xxx`命令可以查看某个文件的修改记录
![](/img/git/diff.png)
如上图所示，可以看到first被修改成了second

## 版本回退
现在我们一共进行了三次修改（second后改成了third），但是当修改次数多了我们也不可能记得到底做了哪些修改，那么就是`git log`命令登场的时候了。在窗口输入`git log`即可看到如下图所示的输出：
![](/img/git/log.png)
可以看到我们做了三次commit，这时候`-m`后的说明就派上用场了，告诉我们每次都做了什么修改，第一次我们添加了test.txt的文件，第二次将文件中的first改成了second，第三次将second改成了third。如果嫌显示信息太多，可以在`git log`后加上参数`--pretty=oneline`，在窗口输入`git log --pretty=oneline`后可以看到：
![](/img/git/--pretty=oneline.png)
图中高亮显示的`HEAD`表示当前的工作分支及版本。那么如果我们想要回退到之前的版本要怎么办呢？
这时候就要用到`git reset`命令了，之前我们了解了`HEAD`表示当前工作版本，那么上一个版本呢？是`HEAD^`，那上上个版本呢？是`HEAD^^`，理论上可以通过`^`的个数来回退到对应的版本，但是看着多累啊，所以可以使用`HEAD~100`来表示前第100个版本，好了，现在我们来回退版本，在窗口输入
``` git
git reset --hard HEAD^
```
再输入`git log`看看呢？
![](/img/git/HEAD^.png)
发现第三次提交记录已经不见了，那我们再打开文件看看呢？
![](/img/git/cattxt.png)
可以看到txt文件也回到第二次提交的版本，third回到了second，amazing~
但是其实另一种回退方式更常见，注意到`git log`后出现一串黄色的字符了吗，那个是`commit id`我们可以通过`commit id`来回退到对应的版本，例如我们再回退一个版本，回退到新建文件的版本，在图中我们可以看到第一次的`commit id`是`37f5c48b...`，那么我们就可以在窗口输入
``` git
git reset --hard 37f5c4
```
不用输入全，但输入的位数也不能太少，git会自动寻找对应的`commit id`如果位数太少，可能会找到多个`id`，这时输入`git log`会发现之前的提交记录全都不见了，打开文件看看？可以看到文件已经回到了刚新建时的状态。
![](/img/git/firstcommit.png)

那如果这时候我们说要回到第三次提交时的版本（即third版本）该怎么办呢？当然，如果记得那次提交的`commit id`的话可以直接通过`commit id`来进行回退，不过忘了的话也不要紧，在窗口输入`git reflog`，就可以看到历次的改动了，包括变换版本的操作
![](/img/git/reflog.png)
可以看到在每次操作的前面都有对应的`commit id`这时候就可以通过`git reset`来回退啦。

## 工作区和暂存区

git的工作方式其实存在
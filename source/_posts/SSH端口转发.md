---
title: SSH端口转发
date: 2023-11-09 02:17:48
tags: 服务器
categories: 服务器
---
### 背景
web部署在内网服务器上，而本机访问内网服务器首先需要通过堡垒机，再使用ssh连接内网服务器，但无法直接通过ip地址访问web页面，通过ssh进行端口转发来实现这一点。

### 操作
首先登陆堡垒机，确保能够ssh连接到内网服务器
#### ssh连接服务器
```shell
ssh user@hostname -p xxxx
# user为要登录的用户，hostname为主机ip或域名，通过-p来指定特定端口
# 示例
ssh root@127.0.0.1 -p 58759
```
#### 配置ssh
首先进入.ssh文件夹
```shell
cd .ssh
```
查看是否存在config文件
```shell
vim config
```
如果不存在则通过vim添加内容
```properties
Host *
	HostKeyAlgorithms +ssh-rsa
	KexAlgorithms +diffie-hellman-group1-sha1
```
config文件中添加的内容随具体情况而定，遇到`Unable to negotiate with 127.0.0.1 port 58759:no matching key exchange method found.Their offer:diffie-hellman-group1` 就添加`KexAlgorithms`参数，遇到`Unable to negotiate with XXX port : no matching host key type found. Their offer: ssh-rsa` 就添加`HostKeyAlgorithms`参数
之后就可以通过ssh命令连接服务器
#### ssh端口转发
```shell
 ssh -f -N -L localhost:8088:127.0.0.1:8088 root@127.0.0.1 -p 58759
```

这行命令是一个SSH端口转发的命令，用于建立本地端口转发，将本地端口8088上的流量通过SSH隧道传输到服务器127.0.0.1上的127.0.0.1主机的8088端口。（`localhost:8088`是本机端口，第一个`127.0.0.1:8088`是web页面的访问地址，第二个`127.0.0.1 -p 58759`是本机ssh连接内网服务器的地址和端口）

下面是每个选项和参数的解释：

1. `-f`: 这是一个SSH选项，它表示在后台运行SSH客户端。这意味着命令会立即返回，而SSH会在后台运行，维护端口转发。
2. `-N`: 这也是SSH选项，它表示不执行任何远程命令。通常，SSH会连接到远程主机并执行一个shell或其他命令，但 `-N` 选项告诉SSH只创建连接而不执行远程命令。
3. `-L localhost:12345:192.168.88.8:8888`: 这是本地端口转发的设置。它告诉SSH将本地主机的localhost（127.0.0.1）上的端口12345与远程主机10.20.20.20上的192.168.88.8的8888端口进行绑定。这意味着当您连接到本地主机的12345端口时，流量将通过SSH隧道传输到远程主机上的192.168.88.8的8888端口。
4. `user@10.20.20.20`: 这是SSH连接的目标远程主机。`user`是远程主机上的用户名，`10.20.20.20`是远程主机的IP地址。
5. `-p 22`: 这是SSH连接使用的端口号，通常是SSH默认的22端口。如果远程主机上的SSH服务器在不同的端口上运行，可以使用 `-p` 选项指定该端口号。
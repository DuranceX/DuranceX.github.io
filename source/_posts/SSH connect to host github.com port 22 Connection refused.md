---
title: SSH connect to host github.com port 22 Connection refused
date: 2024-01-17 15:06:54
tags: problem
categories: problems
---
在个人电脑上使用Git命令来操作GitHub上的项目，突然提示如下错误`ssh: connect to host github.com port 22: Connection refused`。

```bash
$ git pull
ssh: connect to host github.com port 22: Connection refused
fatal: Could not read from remote repository.
​
Please make sure you have the correct access rights
and the repository exists.
```

提示连接GitHub的22端口被拒绝，用浏览器访问Github发现正常访问，说明不是Github出了问题，怀疑可能是Github的22端口被屏蔽了，因此改用Github的443端口进行访问。

```bash
$ vim ~/.ssh/config

# Add section below to it
Host github.com
  Hostname ssh.github.com
  Port 443
```

通过修改SSH的config文件，让SSH在访问Github时使用443端口，再进行`git pull`操作发现可以正常下载数据。

---

Tips：
1. 使用`ssh -T git@github.com`来测试和GitHub的网络通信是否正常，如果提示`Hi xxxxx! You've successfully authenticated, but GitHub does not provide shell access.` 就表示一切正常。
2. `ssh -v`命令，`-v`表示verbose，会打出详细日志。
   ```bash
	ssh -vT git@github.com
	```
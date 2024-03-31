---
title: JS字符串操作连用问题
date: 2024-03-20 12:01:11
tags: [前端,js]
categories: [前端,js]
---
### 问题
有字符串“../../img/example.jpg”，想要提取出文件名example，使用js代码replace替换`../../img/`，再使用substring提取文件名时出现问题
```js
const str = '../../img/example.jpg'
console.log(str.replace('../../img/','')).substring(0,str.lastIndexOf('.'))
// example.jpg
```
无法去除后缀名，而当两者分开使用时可以正常出结果
```js
const str = '../../img/example.jpg'
const str_temp = str.replace('../../img/','')
console.log(str_temp.substring(0,str_temp.lastIndexOf('.'))
// example
```

## 原因
JS的replace和substring不对原字符串进行操作
所以在后者使用的`lastIndexOf`中仍读取的变量`str`仍是原数据，也就是结果为17，而进行了`replace`操作后的文本的读取结果应该为7
```js
let str = '../../img/example.jpg'
console.log(str.lastIndexOf('.')) 
// 17

str = str.replace('../../img/','')
console.log(str.lastIndexOf('.')) 
// 7
```
所以原代码的结果就是在replace后的`example.jpg`中读取`(0,17)`的字符串，自然也就是全部了

## 解决方案
1. 分开写，用一个临时变量进行存储
2. 在substring中再使用一次replace操作
   ```js
   x.replace('../../img/', '').substring(0, x.replace('../../img/', '').lastIndexOf('.'));
   ```

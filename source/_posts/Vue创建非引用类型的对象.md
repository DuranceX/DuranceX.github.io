---
title: Vue创建非引用类型的对象
date: 2023-11-01 15:03:36
tags: [前端,vue]
categories: [前端,vue]
---

### 场景描述
在Vue的data中定义了一个对象，在将该对象传输给后端时需要做一些修改，因此新建了一个对象让他等于该对象，之后对新建的对象进行修改，此时会导致原有对象的属性也会改变。

**显示的页面**
```html
<template>
  <p>
    姓名：{{user.name}}
  </p>
  <p>
    年龄：{{user.age}}
  </p>
  <button @click="update">
    复制对象，修改内容
  </button>
</template>
```

**JS**

```javascript
export default {
  data() {
    return {
      user:{
        name:"李四",
        age:17
      }
    }
  },
  methods:{
    update(){
      let newUser = this.user;
      newUser.name = "张三";
    }
  }
}
```

**显示效果**

![](https://images.starnight.top/img/Pasted%20image%2020230520201502.png)

### 问题描述
可以看到，在update方法中新设了一个对象，之后对该对象进行了修改，而呈现的结果是原对象仍然也发生了改变

![](https://images.starnight.top/img/Pasted%20image%2020230520201634.png)

### 问题解决

使用`JSON.parse()`和`JSON.stringify()`方法来创建对象
```javascript
var jsonStr = JSON.stringify(user);
var newUser = JSON.parse(jsonStr);
```

### 拓展
对于深拷贝和浅拷贝，以及该问题的其他实现方法（第三方库Lodash）参考文章
[在vue中子组件修改props引发的对js深拷贝和浅拷贝的思考 - 沉默术士 - 博客园 (cnblogs.com)](https://www.cnblogs.com/hutuzhu/p/10119698.html)
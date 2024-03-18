---
title: vue中自定义变量、ref和readonly定义变量的区别
date: 2023-12-30 23:59:54
tags: [前端,vue]
categories: [前端,vue]
---
在由选项式API转向组合式API时，发现响应式数据的定义往往通过ref来实现，但是直接定义变量的方式也能够在页面中实现显示，而后又有readonly来进行变量定义的方式，因此实验了一下其中的区别。

### 自定义变量
使用自定义变量时直接进行定义即可`let customVal:number = 10`
1. 自定义变量的值可以直接在模板中显示（包括文本和输入框等）
2. 点击按钮改变自定义变量的值时，后台数据会发生变化，但页面不会刷新，即显示的还是原来的值
3. 通过输入框改变值时（v-model绑定）可以将数值传输到后台数据并更改其值。

![](http://images.starnight.top/img/Pasted%20image%2020231231002900.png)

### ref定义变量
使用ref定义变量时需要使用ref()函数`let refVal:Ref<number> = ref(10)`
1. ref变量的值可以直接在模板中显示（包括文本和输入框等）
2. 点击按钮改变自定义变量的值时，后台和页面数据都发生变化，触发监听器
3. 通过输入框改变值时（v-model绑定）可以将数值传输到后台数据并更改其值，触发监听器
> vue中同样可以使用reactive来定义响应式变量，不过reactive只能定义对象、数组等类型，而ref既可以接受对象类型又可以接受原始数据类型（number，string，boolean等），所以reactive相当于是ref的子集，ref在接受对象类型的时候内部也是通过reactive来实现。

![](http://images.starnight.top/img/Pasted%20image%2020231231003237.png)

### readonly定义对象
使用readonly定义变量时需要使用readonly()函数`let readonlyVal:Readonly<{value:number}> = readonly({value:10})`
1. readonly变量的值可以直接在模板中显示，但只能作为文本显示，而不能投射到表单组件，即input等。
2. readonly变量只读，无法进行修改，后台试图修改readonly变量的操作会直接报错（编译时异常）
3. 无法在输入框中正常显示也无法修改

![](https://images.starnight.top/img/Pasted%20image%2020231231004101.png)

### 代码
```html
<script setup lang="ts">
import { ref,readonly, Ref, watch } from 'vue'

// 自定义变量
let customVal = 10;
function changeCustomValValue(){
  customVal++;
  document.getElementById('info').innerText="现在customVal的值为"+customVal;
}
watch(()=>customVal,()=>{
  document.getElementById('customTip').innerText="customVal的值发生变化";
})

//使用ref定义变量
let refVal:Ref<number> = ref(10);
function changeRefValValue(){
  refVal.value++;
}
watch(refVal,()=>{
  document.getElementById('refTip').innerText="refVal的值发生变化";
})


//使用readOnly定义变量
let readonlyVal:Readonly<{value:number}> = readonly({value:10});
function changeReadOnlyValValue(){
  try{
    readonlyVal.value++;
  }
  catch(e){
    document.getElementById('error').innerText=e;
  }
}
watch(readonlyVal,()=>{
  document.getElementById('readonlyTip').innerText="readonlyVal的值发生变化";
})
</script>


<template>
  <div>自定义变量</div>
  <div class="container">
    <button class="button" @click="changeCustomValValue">
      修改数据
    </button>
    <div class="output">
	  <div>数据值为：<input class="input" v-model="customVal"/></div>
      <div id="info"></div>
      <div id="customTip"></div>
    </div>
  </div>
  <div>ref定义变量</div>
  <div class="container">
    <button class="button" @click="changeRefValValue">
      修改数据
    </button>
    <div class="output">
      <div>数据值为：<input class="input" v-model="refVal"/></div>
      <div id="refTip"></div>
    </div>
  </div>
  <div>readOnly定义变量</div>
  <div class="container">
    <button class="button" @click="changeReadOnlyValValue">
      修改数据
    </button>
    <div class="output">
      <div>数据值为：<input class="input" v-model="readonlyVal"/></div>
      <div id="error"></div>
      <div id="readonlyTip"></div>
    </div>
  </div>
</template>


<style>
.container{
  background-color: #F1F1F1;
  width: 95%;
  height: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px;
  margin-bottom: 20px;
}
.button{
  margin-left: 20%;
  width: 20%;
  height: 20%;
  background-color: white;
  border: none;
  box-shadow:  0px 0px 15px lightgray;
  cursor: pointer;
}
.button:hover{
  background-color: lightcyan;
  transition: background-color 0.3s ease-in-out;
}
.button:active {
  background-color: skyblue;
  transition: background-color 0.3s ease-in-out;
}
.output{
  align-self:self-end;
  width: 40%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
```
---
title: Vue跨组件v-model实现
date: 2023-5-20 21:04:31
tags: [前端,vue]
categories: [前端,vue]
---

### 官网实现方法
[Vue官网]([组件 v-model | Vue.js (vuejs.org)](https://cn.vuejs.org/guide/components/v-model.html))提供了跨组件间使用`v-model`进行双向绑定的方法
```html
<!--父组件-->
<CustomInput v-model:"inputText" />

<!--子组件-->
<script> 
export default { 
	props: ['modelValue'], 
	emits: ['update:modelValue'] } 
</script> 

<template> 
	<input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" /> 
</template>
```
即父组件通过`props`传递参数`modelValue`，在子组件中将其绑定给输入框的`value`属性，这样就可以在子组件中显示`modelValue`的值，即vue中的单向绑定`v-bind`，然后给输入框的`input`事件注册一个自定义事件，通过`$emit`来触发父组件中的预设事件，更新`modelValue`的值，从而实现双向绑定

这里的`modelValue`是默认值，可以通过给`v-model`指定参数来更改这个名字
```html
<!--父组件-->
<CustomInput v-model:title="bookTitle" />

<!--子组件-->
<script> 
export default { 
	props: ['title'], 
	emits: ['update:title'] 
} 
</script> 
<template> 
	<input type="text" :value="title" @input="$emit('update:title', $event.target.value)" /> 
</template>
```

### 问题及解决办法
在项目里，我的子组件中使用的不是原生的`input`组件，而是Element的`el-input`组件，在通过上述代码进行双向绑定时，可以实现想要的效果，但是在控制台会不停的报错，如下图所示
![](https://images.starnight.top/img/vue_element_plus_error.png)
对此询问了ChatGPT，得到的解释是
>当在Vue中使用`el-input`组件进行跨组件的`v-model`绑定时，可能会在控制台中看到一些报错信息。这是因为`el-input`组件并不是Vue的官方组件，而是Element UI库中的组件。
>Element UI的`el-input`组件本身并不支持使用`v-model`进行跨组件的双向绑定。它只是一个输入框组件，它的`value`属性用于接收输入框的值，而不是作为一个双向绑定的`v-model`属性。

因此看来不能使用其value属性来进行传值，而对于方法中的`$event.target.value`的解释如下：
- 在Vue中，`$event`是一个特殊的变量，用于访问触发事件时的事件对象。在事件处理方法中，可以通过`$event`来访问该事件对象，并获取相关的信息。
- `$event.target`表示事件的目标元素，即事件被触发时实际发生事件的DOM元素。对于输入框等表单元素，`$event.target`通常指向触发事件的输入框元素本身。
- `$event.target.value`表示目标元素的值。对于输入框元素，`value`属性表示输入框当前的值。通过`$event.target.value`可以获取输入框的值。

也就是说`$event.target.value`即是修改后的数值，在项目中我传递过来的参数并不是一个简单的`String`值，而是一个`JSON`对象，同时在`el-input`中与该对象中的数值进行了`v-model`双向绑定，那么我直接将修改后的`JSON`对象作为数值回传即可。

```html
<!--父组件-->
<BasicInfoComponent v-model:basicInfo="basicInfo"/>

<!--子组件-->
<template>
	<el-input @input="$emit('update:basicInfo',basicInfo)" v-model="basicInfo.age"/>
</template>

<script>
export default{
	props:['basicInfo'],
	emits:['update:basicInfo']
}
</script>
```
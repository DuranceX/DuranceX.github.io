---
title: 通过Vite-plugin-svg-icons实现自定义的Icon组件
date: 2024-07-13 20:31:30
tags: [前端]
---

为了能够通过像UI库的图标组件一样，通过`name='icon-name'`的形式来引入自己的图标，而不是通过`img`标签的`src`属性写长长一串地址，所以通过svg sprite图来进行实现。

### 原理

svg sprite图的实现原理是利用svg的`symbol`元素，将每个icon包裹在`symbol`中，再通过svg的`use`标签来使用该`symbol`，也就是最终，svg图标会变成如下的样子

```xml
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <symbol class="icon" viewBox="0 0 1024 1024" id="icon名">{{省略的icon path}}</symbol>
    <symbol class="icon" viewBox="0 0 1024 1024" id="icon名">{{省略的icon path}}</symbol>
</svg>
```

此处的每个`symbol`都对应着一个元素，在需要使用icon的地方通过svg中的`use`标签根据icon的Id来进行读取

```html
<svg>
	<use xlink:href="#symbolId"></use>
</svg>
```

### svg sprite图的生成与导入

对于`vite`项目来说，可以使用`vite-plugin-svg-icons`插件，对于`webpack`项目来说可以使用`svg-sprite-loader`插件。

**安装**

首先安装`vite-plugin-svg-icons`插件

```shell
npm i vite-plugin-svg-icons
```

**配置**

之后在`vite.config.ts`中对插件进行配置

```ts
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

export default defineConfig({
  plugins: [
    vue()，
    createSvgIconsPlugin({
    	// 指定需要缓存的图标文件夹
    	iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')]
			// 指定symbolId格式
			symbolId: 'icon-[name]'
    })
  ]
})
```

之后还需要在`src/main.ts`中引入注册脚本

 ```ts
 import 'virtual:svg-icons-register'
 ```

至此svg sprite图已经生成，可以在页面中通过svg标签进行访问。访问的symbolId格式便是设置中的`icon-[图标文件名称]`

```html
<svg>
	<use xlnk:href='#test'></use>
</svg>
```

### 封装图标组件

在现在的情况下，我们仍然需要使用svg标签来引入图标，而不是像UI库一般通过组件形式来引入，因此我们创建一个Icon组件对图标进行封装。

```vue
<template>
    <svg :class="'svg-icon ' + classes" :style="{
        width: `${width}px`,
        height: `${height}px`,
        color: color
    }" @click="$emit('click')">
        <use :xlink:href="`#icon-${name}`" />
    </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'VIcon',
    props: {
        name: {
            type: String,
            required: true
        },
        width: {
            type: Number,
            default: 60
        },
        height: {
            type: Number,
            default: 60
        },
        color: {
            type: String,
            default: 'deepgrey'
        },
        classes: {
            type: String,
            default: ''
        }
    },
    setup(props) {
        return {
            props
        }
    }
})
</script>

<style scoped>
.svg-icon {
    font-weight: 500;
    fill: currentColor;
    stroke: currentColor;
}
</style>
```

在上述的代码中，我们将svg标签中的内容放置在组件中，并传入一些控制参数，用于调整图标的显示样式，并注册了点击事件，如果希望处理点击事件则可以在调用侧监听`click`事件并做相应的处理。

至此，便可在别处通过组件形式来使用图标了。

```vue
<template>
  <div>
    <h1>This is an about page</h1>
    <VIcon name="boy" color="lightblue" class="test test2" />
  </div>
</template>

<script setup lang="ts">
import VIcon from '@/components/VIcon.vue'
</script>
```

也可以在`src/main.ts`中将`VIcon`注册为组件，即可在别处使用时不再一一导入`VIcon`

```ts
import VIcon from './components/VIcon.vue'
import App from './App.vue'
...

const app = createApp(App)
...
app.component('VIcon',VIcon)
...
```

----

**Reference**

[懒人神器：svg-sprite-loader实现自己的Icon组件](https://segmentfault.com/a/1190000015367490)

[Github文档](https://github.com/vbenjs/vite-plugin-svg-icons/blob/main/README.zh_CN.md)

[vite.config.js配置入门详解](https://www.cnblogs.com/onesea/p/16095164.html)

[svg-sprite-loader的使用](https://www.cnblogs.com/sincisco/articles/18201676)

[Vue2/3 使用 svg-sprite-loader 实现 svg 图标按需加载](https://www.cnblogs.com/Leophen/p/14157256.html)

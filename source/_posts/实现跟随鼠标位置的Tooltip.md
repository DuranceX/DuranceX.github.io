---
title: 实现跟随鼠标位置的Tooltip
date: 2024-07-16 22:53:30
tags: [前端]
---

实现一个能够鼠标移动的Tooltip，在里面显示一些信息，并且可以进入以进行进一步的互动操作。

### 基础实现

首先定义一个背景图，当鼠标在背景图中移动的时候，Tooltip显示在鼠标的右下角，并显示当前鼠标在背景图中的坐标。

```vue
<!-- 
1. 定义一个包裹的容器，并将其position设置为relative
2. 在背景图中设置样式，并添加mousemove的事件监听器，当鼠标在背景图中移动的时候，实时更新数据
3. 设置tooltip的显示内容和样式，并通过style标签动态绑定其位置信息
-->
<template>
    <div style="position: relative;">
        <div class="canvasArea" @mousemove="handleMouseMove">
        </div>
        <div class="tooltip" :style="tooltipStyle">
            <div>Tooltip</div>
            <div>当前鼠标的相对于容器的横坐标是：{{ tooltip.offsetX }}</div>
            <div>当前鼠标的相对于容器的纵坐标是：{{ tooltip.offsetY }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const canvasRef = ref(null)
const tooltip = ref({
    offsetX: 0,
    offsetY: 0,
})

//通过event事件获取鼠标相对于容器的偏移坐标，并赋值给tooltip的属性
function handleMouseMove(event: MouseEvent) {
    tooltip.value.offsetX = event.offsetX
    tooltip.value.offsetY = event.offsetY
}

//通过计算属性来实时计算tooltip的位置
const tooltipStyle = computed(() => {
    return {
        left: (tooltip.value.offsetX + 10) + 'px ',
        top: (tooltip.value.offsetY + 10) + 'px',
    }
})

</script>

<style scoped>
.canvasArea {
    width: 800px;
    height: 600px;
    background-color: #f0f0f0;
}

.tooltip {
    background-color: white;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    padding: 20px;
    border-radius: 10px;
    position: absolute;
    z-index: 1;
}
</style>
```

这样就实现了一个跟随鼠标移动的Tooltip，在鼠标移动时更新其内部显示的信息。

此外，发现Tooltip在移动到背景图的边缘时文本会被换行显示，所以给样式添加`text-wrap:nowrap`来保证Tooltip样式不变。

### 显隐逻辑

之后需要给背景图添加`mouseenter`和`mouseleave`的事件监听器，当鼠标进入背景图时显示tooltip，当鼠标移开背景图时隐藏tooltip，这时候便可以给tooltip再添加一个`visible`属性，来控制其显示和隐藏。

```vue
<template>
    <div style="position: relative;">
        <div class="canvasArea" 
             @mousemove="handleMouseMove"
             @mouseenter="handleMouseEnter"
             @mouseleave="handleMouseLeave">
        </div>
        <div class="tooltip" :style="tooltipStyle" v-show="tooltip.visible">
            <div>Tooltip</div>
            <div>当前鼠标的相对于容器的横坐标是：{{ tooltip.offsetX }}</div>
            <div>当前鼠标的相对于容器的纵坐标是：{{ tooltip.offsetY }}</div>
        </div>
    </div>
</template>
```

添加对应的两个函数，并通过设置一个计时器来延迟Tooltip的消失时间

```ts
const timeTrigger = ref(null)
const tooltip = ref({
    visible: false,
    offsetX: 0,
    offsetY: 0,
})

// 当鼠标进入时清除计时器，并将tooltip设置为显示
function handleMouseEnter() {
    clearTimeout(timeTrigger.value)
    tooltip.value.visible = true
}

// 当鼠标离开时触发计时器，在100ms后隐藏tooltip
function handleMouseLeave() {
    timeTrigger.value = setTimeout(() => {
        tooltip.value.visible = false
    }, 100)
}
```

这样Tooltip就可以实现鼠标在背景图中移动时显示，移出背景图时隐藏的效果了。

### 可进入

之后是配置可进入的功能，由于在鼠标进入到Tooltip的时候仍然会触发背景图的`mouseleave`事件，所以需要在Tooltip中也添加一个`mouseenter`事件，在其中清除隐藏Tooltip的计时器，将Tooltip保持显示

```ts
function handleTooltipMouseEnter() {
    clearTimeout(timeTrigger.value)
}
```

这样当鼠标进入Tooltip的时候就可以保持Tooltip的显示，并在其中进行进一步的互动了。但是我们会发现一个问题，那就是鼠标几乎无法进入到Tooltip中，在尝试和观察后发现，导致难以进入的原因是**Tooltip太跟手了**，也就是鼠标移动到一个位置，Tooltip立马就更新到了新位置，导致鼠标的移动很难“快过”Tooltip，也就难以进入了。

既然是Tooltip的位置更新过快导致的问题，那么可以通过添加一个短暂的延时，来推迟Tooltip的移动，从而让鼠标可以有机会进入Tooltip。

在`mousemove`的handle函数中，将更新位置的部分代码用`setTimeout`函数包裹

```ts
function handleMouseMove(event: MouseEvent) {
    setTimeout(() => {
        tooltip.value.offsetX = event.offsetX
        tooltip.value.offsetY = event.offsetY
    }, 10)
}
```

至此，一个可进入的跟随鼠标移动的Tooltip就实现了。

### 暗色模式

为了实现暗色模式，可以通过css的媒体监听器来实现暗色模式的不同样式展示

```css
@media (prefers-color-scheme: dark) {
    .container {
        background-color: #333333;
    }

    .tooltip {
        background-color: #464646;
        color: lightgray;
    }
}
```

### 完整代码

```vue
<template>
    <div style="position: relative;">
        <div class="canvasArea" @mousemove="handleMouseMove" @mouseenter="handleMouseEnter"
            @mouseleave="handleMouseLeave">
        </div>
        <div class="tooltip" :style="tooltipStyle" v-show="tooltip.visible" @mouseenter="handleTooltipMouseEnter">
            <div>Tooltip</div>
            <div>当前鼠标的相对于容器的横坐标是：{{ tooltip.offsetX }}</div>
            <div>当前鼠标的相对于容器的纵坐标是：{{ tooltip.offsetY }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const timeTrigger = ref(null)
const tooltip = ref({
    visible: false,
    offsetX: 0,
    offsetY: 0,
})

function handleMouseMove(event: MouseEvent) {
    setTimeout(() => {
        tooltip.value.offsetX = event.offsetX
        tooltip.value.offsetY = event.offsetY
    }, 10)
}

function handleMouseEnter() {
    clearTimeout(timeTrigger.value)
    tooltip.value.visible = true
}

function handleMouseLeave() {
    console.log('leave')
    timeTrigger.value = setTimeout(() => {
        tooltip.value.visible = false
    }, 100)
}

function handleTooltipMouseEnter() {
    clearTimeout(timeTrigger.value)
}

const tooltipStyle = computed(() => {
    return {
        left: (tooltip.value.offsetX + 10) + 'px ',
        top: (tooltip.value.offsetY + 10) + 'px',
    }
})

</script>

<style scoped>
.canvasArea {
    width: 800px;
    height: 600px;
    background-color: #f0f0f0;
}

.tooltip {
    background-color: white;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    padding: 20px;
    border-radius: 10px;
    position: absolute;
    z-index: 1;
    text-wrap: nowrap;
}
</style>
```




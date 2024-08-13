---
title: ECharts的Tooltip不显示原因
date: 2024-07-20 17:26:04
tags:[前端]
---
## ECharts的Tooltip不显示原因

### 问题

在使用ECharts添加Tooltip的时候发现**浮窗不显示，但其辅助线可以正常显示**，网上查到的原因都说的是Vue的代理问题，不能将Echarts实例定义为`ref`或`reactive`对象，但我在代码里并没有将其定义为`ref`对象，且用上`makeRow`等方法后仍然不显示提示框。如下所示。
![](https://images.starnight.top/img/2cf41d75d3cbd1589193ad65bf92960.jpg)

## HTML结构检查

出现了问题首先查看控制台，发现没有报错，便去查看HTML的DOM树，发现在`canvas`标签下出现了一个`div`标签，其值随着鼠标的移动在不停发生变化，所以这个应该就是未能显示出来的浮窗，在将其移出`canvas`标签，并将其样式设为可见后发现这个确实就是被遮挡的浮窗。
![](https://images.starnight.top/img/9c2e2295d21d6782bd932c488f59601.jpg)
也就说这个浮窗能够正常出现和展示，但是由于其在`canvas`标签下而被遮挡住，无法在视图中出现，那如果将`canvas`换成`div`标签呢，结果发现浮窗就可以正常显示了。
![](https://images.starnight.top/img/b1c9690d7154e462f161e1c67fec8b9.jpg)

## 原因

在正常情况下，ECharts默认会将tooltip作为一个独立的DOM元素添加到图表容器中。这使得tooltip可以轻松地显示在图表上方，并且可以使用CSS进行样式设置。

而 Canvas是一个位图绘图表面，它本身不支持DOM元素。这意味着不能直接在canvas内部添加HTML元素。

**ECharts的实现**

当使用div作为容器时，ECharts会在div内部创建两个div元素：

- 一个div中包含一个canvas元素用于绘制图表
- 一个div中添加其他必要的DOM元素，如tooltip。

而当直接使用canvas元素初始化ECharts时，会导致tooltip无法正确显示，因为canvas本身不能包含其他DOM元素。

**G2**

G2的图表绘制也是同理，ECharts在使用`canvas`的情况下，至少图表能够正常的显示，因为当`canvas`作为容器时，其第一个用来绘制图表的div元素会删去，直接在该canvas上绘制，而G2则仍然会生成一个由`div`包裹的`canvas`标签用于绘制，所以G2在使用`canvas`作为容器的时候，连图表都无法生成显示。
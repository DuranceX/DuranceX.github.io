---
title: Hexo数学公式设置
date: 2020-11-13 12:26:23
tags: [博客]
categories: 博客
---



Hexo关于Latex的一些设置，避免重复渲染等问题。

<!--more-->

## 重装渲染引擎

由于需要在markdown中插入数学公式，因此了解到了Latex，但是在完成了公式的输入后发现hexo中并不能成功渲染Latex公式。为什么呢？这是因为hexo使用自带的`hexo-renderer-marked`引擎来渲染页面，但是`hexo-renderer-marked`引擎不能渲染Latex引擎，因此我们需要更换引擎。

在更换渲染引擎时首先需要先卸载原先的渲染引擎，再安装新引擎。

这里使用`kramed`引擎，虽然`kramed`引擎不能渲染markdown all in one中的下标”~ ~”以及 上标”^ ^”这类格式，但姑且可以用Mathjax的`_{}`和`^{}`代替

```
npm uninstall hexo-renderer-marked --save
npm install hexo-renderer-kramed --save
```

如果出现**数学公式重复渲染**的情况，在`<your-priject-dir>/node_modules/hexo-renderer-kramed/lib/renderer.js`中，将

```
function formatText(text) {
    // Fit kramed's rule: $$ + \1 + $$
    return text.replace(/`\$(.*?)\$`/g, '$$$$$1$$$$');
}
```

改为

```
function formatText(text) {
    return text;
}
```

如果出现**行内公式无法渲染**的情况，在`<your-project-dir>/node_modules/kramed/lib/rules/inline.js`中，将

```
escape: /^\\([\\`*{}\[\]()#$+\-.!_>])/,
```

改为

```
escape: /^\\([`*\[\]()#$+\-.!_>])/,
em: /^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
```

改为

```
em: /^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
```

## 使用hexo-renderer-mathjax

首先卸载原本的`hexo-math`

```
npm uninstall hexo-math --save
```

然后安装`hexo-renderer-mathjax`

```
npm install hexo-renderer-mathjax --save
```

若渲染出现问题，则更换Mathjax的CDN

在`<path-to-your-project>/node_modules/hexo-renderer-mathjax/mathjax.html`中，将

```
<script src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
```

改为

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-MML-AM_CHTML"></script>
```

> Tips
>
> 要想用Latex渲染花括号{}，如果`\{\}`不生效的话，可以改成`\\{\\}`
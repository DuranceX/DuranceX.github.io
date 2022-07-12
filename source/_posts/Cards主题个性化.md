---
title: Cards主题个性化
date: 2021-09-24 10:23:23
tags: [博客, 美化]
categories: 博客
---



博客主题从Fluid更换到Cards也有一段时间了，对Cards主题做了一些自定义，包括首页的横幅图片以及一些样式的调整

<!--more-->

### 首页添加横幅图片

在cards主题的示例博客中看到了[Alendia’s Blog](https://alendia.dev/)，一点开就看到了首页的图片，觉得很好看，便想着在自己的博客中也实现该效果。查看cards的样式文件发现该处主要有4个部分的样式，分别是logo，头像和介绍文本的样式，这三个样式嵌套在类为cover的div中，那我们要做的就是在最外层的div中设置背景图片。

**首先设置图片样式**

找到主题目录下的`\source\css\style\_functions\cover.styl`，将原来的`.cover`修改为`.cover_none`，并另外添加下列样式代码：

```css
.cover
    display: block;
    text-align: center;
    margin: 3rem auto;
    margin-top: 1rem;
    padding: 10rem 0;
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    opacity: 85%;
    box-shadow: 1px 1px 5px 0 rgba(0,0,0,0.02), 1px 1px 15px 0 rgba(0,0,0,0.03)

    .cover__logo
        max-width $max_width_logo
        margin-left auto
        margin-right auto

    .cover__avatar
        border-radius 50%
        width $avatar_width
        height $avatar_height
        margin 0 auto 1rem auto
    
    .cover__intro
        color: #fcfcfc

    .cover__title
        color: #fcfcfc
```

可以在这里直接添加`background-image`属性来添加背景图片，但为了修改方便，我在这里将背景图片的设置方式移到了主题的`_config.yml`文件中，在`_config.yml`文件中的`cover`项中，添加一个`banner`属性，在其中输入图片地址。

```xml
cover: 

  # 首页的横幅图片，输入图片地址
  banner: /img/banner.jpg
  # 显示在最上方 cover 处的站点名称
  sitename: Starry Night

  # 若 avatar 配置不为空，则优先使用 avatar 覆盖 sitename
  avatar: 
  
  # sitename/avatar 下方的一句话介绍
  description:
```

然后在`\layout\_partial\source\cover.ejs`文件中将代码修改为

```ejs
<%- partial('./header', null, {cache: false, path: path}) %>
<% if (page.cover !== false) { %>
    <% if (theme.cover.banner) { %>
        <div class="cover" style='background-image:url("<%= theme.cover.banner%>")'>
    <% } else { %>
        <div class="cover_none">
    <% } %>
    
        <div class="cover__logo">
            <% if (theme.cover.avatar) { %>
                <img no-lazy alt="author Image" class="cover__avatar" src="<%= url_for(theme.cover.avatar) %>">
            <% } else if (theme.cover.sitename) { %>
                <h1 class="cover__title" ><%= theme.cover.sitename %></h1>
            <% } else if (config.title) { %>
                <h1 class="cover__title" ><%= config.title %></h1>
            <% } %>
        </div>
        
        <% if (theme.cover.description) { %>
            <div class="cover__intro">
                <%- markdown(theme.cover.description) %> 
            </div>
        <% } %>
    </div>
<% } %>
```

其中主要部分在第一段`if、else`中，根据主题配置文件中的属性值判断，若banner属性为空，则采用主题默认的样式，若banner属性不为空，则采用另设的样式，显示背景图片。

------

### 一言及页尾添加自定义内容

和[fluid个性化](https://starnight.top/2020/02/24/fluid个性化/#一言)中写的一样，cards中对应的内容在

页首：`\layout\_partial\source\cover.ejs`

页脚：`\layout\_partial\source\footer.ejs`

------

### 修改样式

**修改行代码块样式**

修改`\source\css\style\_base\markdown.styl`文件中的`code`类样式

```stylus
code
    padding .2em .4em
    margin 0
    font-size $code_fontsize
    background-color var(--bg-code)
    border-radius 3px
    color #338bd4
```

**修改目录样式**

原有的目录样式感觉离文章太近，因此想要增加一些距离

修改`\source\css\style\_functions\toc.styl`文件中的`post-side\.post-side__toc\.toc`处的样式代码，将其中的`padding-left`由`0.6rem`修改为`1rem`

```stylus
.toc
    display none
    width 'calc((100vw - %s) / 2 - 12.6px)' % $max_width_main
    height 'calc(100vh - %s * 2 - 20px)' % $header_height
    padding-left 1rem
```

------

### 文章封面设置属性兼容index_img

原来使用的是Fluid主题，其中文章封面的设置使用的是`index_img`属性，而cards主题使用的是`thumbnail`属性，文章较多懒得一一修改，便想着怎么让cards也可以使用`index_img`属性。在`\layout\_meta\thumbnail.ejs`文件中，将代码修改成

```ejs
<% if (theme.meta.thumbnail.enable === true && (post.thumbnail || theme.meta.thumbnail.default || post.index_img)) { %>
    <% if (theme.lazyload && theme.lazyload.enable === true) { %>
        <div class="post-thumbnail lazy" data-bg="<%= post.thumbnail || post.index_img || theme.meta.thumbnail.default %>"></div>
    <% } else { %>
        <div class="post-thumbnail" style="background-image: url('<%= post.thumbnail || post.index_img || theme.meta.thumbnail.default %>');"></div>
    <% } %>
<% } %>
```
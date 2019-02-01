# Lagou-CMS

> 这是一个仿拉勾的后台管理系统. 前端主要用到了bootstrap3 + adminLTE + SME-Router + art-template + jQuery + webpack4 等技术, 项目采用的是前后端分离的架构, 主要实现了增，删，改，查等的功能，以及 站内搜索，分页效果等。

> 本文主要是针对前端页面做一个记录

## Build Setup

```bash
# Clone project
git clone https://github.com/PanJiaChen/vue-admin-template.git

# Install dependencies
npm install

# 建议不要用cnpm  安装有各种诡异的bug 可以通过如下操作解决npm速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# Serve with hot reload at localhost:3000
npm start

# Build for development without minification
npm run build
```

## 目录结构

```
    |-- config                // 构建相关
    |-- dist                  // 打包后的文件夹
    |-- src                   // 源代码
    |   |-- admin.html        // 登录注册
    |   |-- index.html        // 首页
    |   |-- assets            // 静态资源
    |   |-- javascript      
    |   |   |-- admin.js      // 登录注册逻辑入口
    |   |   |-- index.js      // 首页逻辑入口
    |   |   |-- controllers   // controll逻辑层
    |   |   |-- models        // model数据层
    |   |   |-- router        // 路由
    |   |   |-- util          // 全局公共方法
    |   |   |-- views         // views视图
    |   |-- stylesheets       // 样式
    |-- static                // 第三方不打包资源

```

## 搭建项目开发环境

- ### 项目中用的是webpack版本是 4.X 版本. 在4.0以后, webpack打包需要加区分是开发环境还是生产环境, 区别在于是否压缩

```
webapack的基本命令:

    --help 查看所有的命令

    --mode development production none

    -o 配置出口

    --config 配置 配置文件

    一般都是通过配置文件来进行使用：

    webpack默认会根据webpack.config.js中的配置进行模块化打包
```

- ### 插件Plugin

``` js
1. html-webpack-plugin 可自动复制一份html到出口文件夹

2. copy-webpack-plugin 可以将文件进行复制

3. webpack.BannerPlugin 为每个打包后的文件头部添加注释
```

- ### dev server

```
  项目中, 用webpack-dev-server, 在启动的时候就会开启热更新服务
der-server可以理解为根据入口和出口文件进行一个隐式打包, 它是存在内存中, 所以我们看不到打包后的文件, 并且入口和出口文件要写对
```

- ### css/scss/...等文件的处理

``` js
    1. css-loader 可以将引入到js中的css模块中的代码放入到js中

    2. style-loader 可以将js中的css代码放入到style标签中去

    3. sass-loader  可以将sass代码编译成css代码

    4. 针对图片，我们直接将图片打包（复制）到输出目录，直接引入，也可以模块化使用

    5. url-loader 基于file-loader，专业处理图片，但是在文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURL。

    6. File-loader 默认情况下，生成的文件的文件名就是文件内容的 MD5 哈希值并会保留所引用资源的原始扩展名.简单来说，file-loader 就是将文件（由于一般是图片文件为主，所以下面通常使用图片两字作为替代，方便理解。其他的包括字体文件等），在进行一些处理后（主要是处理文件名和路径），移动打包后的目录中。
    相较于 url-loader, File-loader可以将图片转为base64字符串，file-loader 在功能上更加强大一些；

    7. babel-loader 编译ES高级语法
```

## 项目分析

 -  开发架构: RMVC + SPA + MPA
 > [RMVC → Jump](http://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html)

 > [SME-Router → Jump](https://sme-fe.github.io/website-router/zh/)

> [art-template → Jump](https://aui.github.io/art-template/zh-cn/index.html)

```
 Router     : 使用了SME-Router实现前端路由切换(基于hash), 

 Model      : 提供数据和数据交互的方法, 利用大量的promise, async, await来进行js异步编程

 Views      : html片段, 利用了art-template模板引擎进行数据的渲染

 Controller : 每一个路由/页面独立逻辑处理

 使用了adminLTE模板进行高效快速的开发,

 使用了大量Jquery插件优化用户体验

 引入了高德地图api进行定位和地图显示功能

 引入了 chart.js图表

 字体图标主要是 Font Awesome
```

- 权限验证

``` js
Token(令牌)
    后端不再存储认证信息，而是在用户登录的时候生成一个token，然后返回给前端，前端进行存储，在需要进行验证的时候将token一并发送到后端，后端进行验证

    1. 用户登录的时候，生成token

        jwt -> json web tokens

        token 中应该包含 payload （数据） cert （密钥） 确定加密方式 SHA256

        npmjs -> jsonwebtoken

    `加密的方式：对称加密和非对称加密，对称加密指的是加密解密使用同一个密钥，非对称加密使用公钥和私钥，加密用私钥加密，解密用公钥解密`

    2. 返回给前端 cookie 
    3. 前端进行存储
    4. 前端在进行数据请求的时候发送token到后端
    5. 后端进行token验证，而且进行过期时间的验证

    生成私钥：

    ssh-keygen -t rsa -b 2048 -f private.key

    生成公钥

    openssl rsa -in private.key -pubout -outform PEM -out public.key
```

- 遇到的问题:
    
    -  sme-router在异步实例化的时候会出现无法匹配路由的情况，必须保证在init前，router-view已经渲染完成..., 目前是因为devServer时浏览器自动打开, 此时route-view还未渲染完成, 因此第一次进入时会匹配不到路由

    - 模块件私有空间变量不共享，利用events模块实现基于事件机制的发布订阅模式实现跨模块通信

    - 因为项目中也用到了MPA(多页面应用), 我把登录注册与首页分开了, 用的也是webpack4.X版本, 在入口文件写错格式, 导致打包后无法匹配对应的js文件, 正确格式 : `main: ['./src/javascript/index']` , 'main'对应了HtmlWebpackPlugin中的chunks

    - 做完该项目, 我觉得最重要的还是mvc分层架构思想, 每一个模块处理各自对应的事情, 这样代码在维护或迭代, 就变得更加的方便,更加容易了
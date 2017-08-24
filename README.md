## express+mongodb+webpack+vue的简历项目

* ####  更新，添加登录注册逻辑。
* ####  登录账号将注册用户并绑定resume.config.js中的配置数据。同步数据库更改简历数据的方式，一个是更改配置文件然后点击同步按钮，一个通过修改数据到完成。
* #### 无法直接通过修改页面同步修改后台数据，修改页面功能只是在保存图片，当前问题所在在于，修改页面使用的是contenteditable="true"属性，但是无法实现与数据双向绑定，如果依赖于监听的话又会代码很乱很麻烦。
* > 当前问题还是在Vue跨域的问题，虽然通过proxyTable可以解决开发环境的跨域问题，但是在生产环境时会丢失主域的，这个需要后台配合设置跨域，可以使用nginx反向代理。
* > 关于生产环境node服务器部署，推荐Docker+Nginx+PM2处理访问量比较大的站点，我也在看这部分。当然也有同学推荐用用forever替代PM2，这部分学习一下之后再进行讨论。


![](https://github.com/MIFind/myResume/blob/master/exam/ex5.gif)  

>后端采用node.js，使用express框架搭建路由和中间件的处理。
这里使用的monogoose只是一个orm，一个对象关系映射的操作工具。
webpack进行vue的配置。
>server里面是后端代码，后端的入口和中间件的配置在server.js里面，在这里面配置的mongoose。
现在nosql的数据库很好用，简单，但是如果多表连表的查询我还是有点不太清楚怎么办，因为是基于model层的处理。
这里简单介绍一下mongoose的使用。
首先建立了一个models，通过schema来映射字段，model也包含操作的能力。

![](https://github.com/MIFind/myResume/blob/master/exam/ex1.png)  

>然后简单看一下我的后台中间件的操作，其实crud就是直接使用Model。

![](https://github.com/MIFind/myResume/blob/master/exam/ex2.png)  

>遇到的问题：
    跨域问题，首先通过设置使服务端具备接受跨域的请求的能力。

![](https://github.com/MIFind/myResume/blob/master/exam/ex3.png)  

>然后测试发现依然会有问题，但是在首页我会调一个get和一个post，get的接口是没有问题，post的还是会提示Access-Control-Allow-Origin的问题。
然后通过Webpack的代理解决的这个问题，这个过程相当于一个代理转发，将原接口代理到你想要的域中。
具体看代码：
在config》index.js中配置proxyTable。

![](https://github.com/MIFind/myResume/blob/master/exam/ex4.png)  


### 运行
* 1 安装好环境包括node+vue+mongo
* 2 连接mongo数据库（要到mongodb/bin/mongod，最好写一个脚本来连接。）
* 3 运行node服务器(node server)
* 3 运行Vue(npm run dev)

#### 对于mongo来说推荐一个插件，intellij idea系列的都可以安装（AS/WebStorm）：Mongo Plugin很好用，比那些妖艳笨拙的图形化好很多。


















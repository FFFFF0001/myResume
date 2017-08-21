##express+mongodb+webpack+vue的简历项目

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
    跨域问题，使用node和vue组织必然是会遇到的跨域问题，node我默认的端口是3000，vue的默认端口是8080。首先通过设置使服务端具备接受跨域的请求的能力。
![](https://github.com/MIFind/myResume/blob/master/exam/ex3.png)  
>然后测试发现依然会有问题，但是在首页我会调一个get和一个post，get的接口是没有问题，post的还是会提示Access-Control-Allow-Origin的问题。
然后通过Webpack的代理解决的这个问题，这个过程相当于一个代理转发，将原接口代理到你想要的域中。
具体看代码：
在config》index.js中配置proxyTable。
![](https://github.com/MIFind/myResume/blob/master/exam/ex4.png)  


### 运行
* 1 安装好环境包括node+vue+mongo
* 2 链接mongo数据库
* 3 运行node服务器(node server)
* 3 运行Vue(npm run dev)

#### 对于mongo来说推荐一个插件，intellij idea系列的都可以安装（AS/WebStorm）：Mongo Plugin很好用，比那些妖艳笨拙的图形化好很多。


















# 1. express的理解
    用来快速搭建后台路由的web框架(库)
    它本身的功能非常简单, 需要通过其中间件来扩展其功能

# 2. express的基本使用
    const express = require('express')
    const app = express()
    app.get('/', (req, res) => res.send('hello express!'))
    app.listen('3000', () => {
      console.log('服务器在3000上启动成功: 请访问: http://localhost:3000')
    })

# 3. Route(路由)的理解和使用
    每个路由就是一个key与value组成的映射关系
    key是请求方式与path的组合, 多个路由之间key不能相同
    value是callback, 用来处理请求, 返回响应

# 4. Reuest与Response
    1). request对象
        Request对象是路由回调函数中的第一个参数，代表了用户发送给服务器的请求
        query	包含get请求的所有query参数的对象
        params	包含get请求的所有param参数的对象
        body	包含post请求的所有请求参数的对象
        cookies	包含所有请求携带cookie数据的对象
        method: 请求方式
        get(header): 根据请求头的名称得到对应的值

    2). response对象
        response对象是路由回调函数中的第二个参数，代表了服务器发送给用户的响应
        res.send(body)	返回响应体
        res.json(obj/array)	以json格式返回响应体
        res.redirect(path)	重定向到指定路径
        res.render(viewName, dataObj)	渲染模板后返回
    3). GET请求的2种参数
        query参数:
            路由path: /xxx
            请求路径: /xxx?name=tom&age=12
            获取参数数据: const {name, age} = req.query
        params参数:
            路由path: /xxx/:name/:age
            请求路径: /xxx/tom/12
            获取参数数据: const {name, age} = req.params
    4). POST请求2种格式的文本参数
        urlencoded格式
            格式: username=tom&pwd=123
            服务器端得使用对应的中间件: app.use(express.urlencoded())
            注意: 表单使用此格式, 服务器端都会支持此格式
        json格式
            格式: {“username”: “tom”, “pwd”: “123”}
            端得使用对应的中间件: app.use(express.json())
            注意: 服务器端可能不支持此格式

# 5. middleware(中间件)
    1). 一种特别的函数: (req, res, next) => {}
    2). 作用: 为express处理请求做特定处理工作, 比如: 解析post请求参数
    3). 分类
        1)内置中间件
            express.static(rootPath): 指定静态资源根路径的中间件
            express.Router(): 路由器中间件
            express.urlencoded()
            express.json()
        2)第三方中间件
            body-parser: 解析post请求体的中间件
            cookie-parser: 解析cookie的中间件
            express-session: 处理session的中间件
        3)自定义中间件
            function xxx (req, res. next) {}
    4). 声明使用中间件
        app.use(path, middleware)
        app.use(middleware) // path为/, 匹配处理任意请求

# 6. ejs的理解和使用
    1). 是什么:  EJS是一个高效的服务器端的JS模板引擎库
    2). 搭建环境
        npm i ejs --save
        app.set("view engine" , "ejs");
        app.set("views","views")
    3). 使用ejs做服务器端渲染
        返回响应: res.render(‘模板文件名称’, 包含数据的对象)
        ejs模板文件语法
            <%=JS表达式%>
            <%
                n条JS语句
            %>


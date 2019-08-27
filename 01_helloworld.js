// 1. 引入express
const express = require('express')
// 2. 创建一个后台应用对象
const app = express()

// 3. 注册一个路由处理请求
app.get('/', (req, res) => res.send('hello express!'))

// 4. 启动服务器监听在指定端口上
app.listen('3000', () => {
  console.log('服务器在3000上启动成功: 请访问: http://localhost:3000')
})
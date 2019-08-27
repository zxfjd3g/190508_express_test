const express = require('express')
const app = express()

// 注册GET类型的路由
app.get('/get_test', (req, res) => {
  console.log('GET路由/get_test 接收并处理GET请求')
  res.send('/get_test GET路由返回响应数据')
})

// 注册POST类型的路由
app.post('/post_test', (req, res) => {
  console.log('POST路由/post_test 接收并处理POST请求')
  res.send('/post_test POST路由返回响应数据')
})

app.listen('3000', () => {
  console.log('服务器在3000上启动成功: 请访问: http://localhost:3000')
})
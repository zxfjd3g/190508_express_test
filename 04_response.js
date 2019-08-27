/*
测试response的理解和使用
1. 理解:
   代表服务器向浏览器返回的响应对象(包含特定的数据)
2. 语法
    res.send(data)
    res.json(dataObj)
    res.redirect(path)
    res.cookie(key, value): 后面讲
 */

const express = require('express')
const app = express()

app.get('/response_test', (req, res) => {
  // 1. 向客户端返回响应数据
 /*  if (Date.now()%2===1) {
    res.send('/response_test response')
  } else {
    // res.send({code: 0, data: {_id: 123, name: 'tom', age: 12}})
    res.json({code: 0, data: {_id: 123, name: 'tom', age: 12}})
  } */
  
  // 2. 重定向
  res.redirect('http://www.atguigu.com')
})

app.listen('3000', () => {
  console.log('服务器在3000上启动成功: 请访问: http://localhost:3000')
})
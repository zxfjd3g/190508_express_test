const express = require('express')
const app = express()

/*
需求1: 让public下的资源可以直接访问
实现: 使用内置中间件, express.static(rootPath): 返回function (req, res, next){}
*/
app.use(express.static('public'))
/*
需求2: 实现通过req.body读取post请求参数
实现: 使用第三方中间件: body-parser
      body-parser: 解析post请求请求体数据, 并保存到req的body属性
 */
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

/*
需求3: post请求的name参数不能是xxx, 否则返回提示文本
实现: 使用自定义中间件
 */
app.use((req, res, next) => {
  const name = req.body.name
  if (name==='xxx') {
    res.send('用户名不能骂人!')
  } else {
    next() // 放行
  }
})


app.get('/get_test', (req, res) => {
  console.log('GET路由/get_test 接收并处理GET请求')
  res.send('/get_test GET路由返回响应数据')
})

app.post('/post_test', (req, res) => {
  console.log('POST路由/post_test 接收并处理POST请求', req.body.name)
  res.send('/post_test POST路由返回响应数据')
})

app.listen('3000', () => {
  console.log('服务器在3000上启动成功: 请访问: http://localhost:3000')
})
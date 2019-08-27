/*
测试request对象的理解和使用
1. 理解:
  request代表请求的对象, 包含请求相关信息数据
2. 相关重要API
  query: 包含所有query参数的对象
  params: 包含所有param参数的对象
  body: 包含所有post请求参数的对象
  cookies: 包含所有cookie的对象(后面讲)
 */
/*
测试用例:
测试1: GET请求获取请求参数
测试2: GET请求获取请求的其它数据
测试3: POST请求获取请求参数
测试4: POST请求获取请求的其它数据
 */

const express = require('express')
const app = express()

/*
测试1: GET请求获取请求参数
http://localhost:3000/get_test?name=tom&pwd=123
http://localhost:3000/get_test2/tom/123
*/
app.get('/get_test', (req, res) => {
  const {name, pwd} = req.query
  console.log(`get请求 name=${name},pwd=${pwd}`)

  res.send(`get请求 name=${name},pwd=${pwd}`)
})
app.get('/get_test2/:name/:pwd', (req, res) => {
  const {name, pwd} = req.params
  console.log(`get请求2 name=${name},pwd=${pwd}`)

  res.send(`get请求2 name=${name},pwd=${pwd}`)
})

// 测试2: GET请求获取请求的其它数据
app.get('/get_test3', (req, res) => {
  console.log(
    req.path,
    req.hostname,
    req.method,
    req.get('Accept')
  )

  res.send(`get_test3 path=` + req.path)
})

/* 
express本身没有解析请求体参数
*/
app.use(express.urlencoded({extended: false})) // 用来解析urlencoded格式的请求体的中间件: 解析请求休参数并保存到body上
app.use(express.json()) // 用来解析json格式的请求体的中间件

// 测试3: POST请求获取请求参数
// http://localhost:3000/post_test 请求体: name=tom&pwd=123
// http://localhost:3000/post_test 请求体: {"name": "tom", "age": 12}
app.post('/post_test', (req, res) => {
  const {name, pwd} = req.body
  res.send(`post请求 name=${name},pwd=${pwd}`)
})

// 测试4: POST请求获取请求的其它数据
app.post('/post_test2', (req, res) => {
  console.log(
    req.path,
    req.hostname,
    req.method,
    req.get('Content-Type')
  )

  res.send(`post request path=` + req.path)
})


app.listen('3000', () => {
  console.log('服务器在3000上启动成功: 请访问: http://localhost:3000')
})
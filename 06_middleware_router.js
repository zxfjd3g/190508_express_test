/*
测用路由器中间件的理解和使用
1. 理解
  路由器是express的一个内置中间件
  用于定义各种不同的路由
2. 使用
  const router = express.Router()
  router.get(path, ...callback)
  router.post(path, ...callback)
  app.use('/', router)
 */
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
app.use(bodyParser.urlencoded({extended: true}))
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

// 得到路由器(中间件函数)
const router = express.Router()
// 通过路由器中间件来注册路由
const users = []
router.post('/add_user', (req, res, next) => {
  const {name, pwd, sex} = req.body
  if (users.find(user => user.name===name)) { // name重复了
    res.send({status:1, msg: '此用户名已存在'})
  } else {
    users.push({id: Date.now(), name, pwd, sex})
    res.send({status: 0, data: users})
  }
  
})
// 声明使用路由器中间件
app.use('/api', router)

app.listen('3000', () => {
  console.log('服务器在3000上启动成功: 请访问: http://localhost:3000')
})
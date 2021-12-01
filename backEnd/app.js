var express = require('express')
var router = require('./router.js')
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
const { DB_URL } = require('./InstructorAndDB')
// 连接数据库
mongoose.connect(DB_URL);

var app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*') // 跨域最重要的一步 设置响应头
    next(); // 执行next函数执行后续代码
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(router)


app.listen(5000, function () {
    console.log('app is running at port 5000')
})
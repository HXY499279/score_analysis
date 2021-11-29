var express = require('express')
var router = require('./router.js')
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
const { DB_URL } = require('./InstructorAndDB')
// 连接数据库
mongoose.connect(DB_URL);

var app = express()

app.engine('html', require('express-art-template'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(router)


app.listen(5000, function () {
    console.log('app is running at port 5000')
})
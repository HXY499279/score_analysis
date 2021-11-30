const express = require("express")
const router = express.Router();
const Model = require("./models/model")
// 引入数据常量_各专业信息
const { Instructor } = require('./InstructorAndDB')
// 引入工具
const {
  getAverage,
  getPassNum,
  getClassScoreDetail,
  getMajorScoreDetail
} = require('./util')

// 获取所有人的平均分
router.get("/total-average", async (req, res) => {
  const stus = await Model.find({})
  const _total_average = getAverage(stus)
  const _num = stus.length
  const _pass_num = getPassNum(stus)
  res.send({ _total_average, _pass_num, _num })
})

// 获取辅导员的信息
router.get("/instructor", async (req, res) => {
  res.send(Instructor)
})

// 不同专业的请求route
router.get("/majors", async (req, res) => {
  const promises = Instructor.majors.map(async (item) => {
    const stus = await Model.find({ major: item.MAJOR })
    // 专业数据
    const data = getMajorScoreDetail(stus)
    // 各班级数据总和
    const classes = await getClassScoreDetail(Model, item.MAJOR, item.CLASSES)
    return {
      major: {
        name: item.MAJOR,
        data
      },
      classes
    }
  })
  Promise.all(promises)
    .then(sendData => {
      res.send(sendData)
    })
})


module.exports = router

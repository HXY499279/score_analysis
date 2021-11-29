const express = require("express")
const router = express.Router();
const Model = require("./models/model")
// 引入数据常量_各专业信息
const { Instructor: { majors } } = require('./InstructorAndDB')
// 引入工具
const {
  getAverage,
  getClassAverageAndFraction
} = require('./util')

// 获取所有人的平均分
router.get("/total-average", async (req, res) => {
  const stus = await Model.find({})
  const total_average = getAverage(stus)
  res.send({ total_average })
})

// 不同专业的请求route
router.get("/majors", async (req, res) => {
  const promises = majors.map(async (item) => {
    // 专业平均分
    const stus = await Model.find({ major: item.MAJOR })
    const major_average = getAverage(stus)
    // 各班级的平均分以及各分数段的人数
    const classAverageAndFraction = await getClassAverageAndFraction(Model, item.MAJOR, item.CLASSES)

    return {
      major: item.MAJOR,
      major_average,
      classAverageAndFraction
    }
  })
  Promise.all(promises)
    .then(sendData => {
      res.send(sendData)
    })
})


module.exports = router

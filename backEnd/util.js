// 获取平均分
const getAverage = (stus) => {
  let pureData = stus.filter((item, i) => {
    if (isNaN(+item.score) === false) {
      return item
    }
  })
  pureData.forEach((item, i) => {
    pureData[i] = +item.score
  })
  return (pureData.reduce((a, b) => a + b) / pureData.length).toFixed(2) * 1
}

// 获取分数段人数,包括下限，不包括上限
const getStuNumberByLimit = (stus, floor, upper) => {
  const pureStus = stus.filter(item => {
    const condition = upper === 100 ? (floor <= +item.score && +item.score <= upper) : (floor <= +item.score && +item.score < upper)
    if (condition) {
      return item
    }
  })
  return pureStus.length
}

// 获取班级平均成绩和班级各分数段的人数，异步函数，返回Promise
const getClassAverageAndFraction = (Model, major, classes) => {
  const promises = classes.map(async (_class, i) => {
    const stus = await Model.find({ major: major, class: _class })
    const _average = getAverage(stus)
    const _0_60 = getStuNumberByLimit(stus, 0, 60)
    const _60_70 = getStuNumberByLimit(stus, 60, 70)
    const _70_80 = getStuNumberByLimit(stus, 70, 80)
    const _80_90 = getStuNumberByLimit(stus, 80, 90)
    const _90_100 = getStuNumberByLimit(stus, 90, 100)
    return {
      _class,
      _average,
      _0_60,
      _60_70,
      _70_80,
      _80_90,
      _90_100
    }
  })

  return Promise.all(promises)
}

module.exports = {
  getAverage,
  getClassAverageAndFraction
}
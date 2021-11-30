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
  const average = pureData.length?(pureData.reduce((a, b) => a + b) / pureData.length).toFixed(2) * 1:0
  return average
}

// 获取方差
const getStandard_deviation = (stus, average) => {
  let sum = 0
  stus.forEach(item => {
    sum += Math.pow((+item.score) - average, 2)
  })
  const variance = sum / stus.length
  const standard_deviation = Math.sqrt(variance)
  return standard_deviation.toFixed(2) * 1
}

// 获取及格人数
const getPassNum = (stus) => {
  let _pass_num = 0
  stus.forEach(item => {
    if (+item.score >= 60) {
      _pass_num++
    }
  })
  return _pass_num
}

// 获取单个分数段人数,包括下限，不包括上限
const getStuNumberByScoreLimit = (stus, floor, upper) => {
  const pureStus = stus.filter(item => {
    const condition = upper === 100 ? (floor <= +item.score && +item.score <= upper) : (floor <= +item.score && +item.score < upper)
    if (condition) {
      return item
    }
  })
  return pureStus.length
}

const GetAllScoreLimit = (stus) => {
  const _0_60 = getStuNumberByScoreLimit(stus, 0, 60)
  const _60_70 = getStuNumberByScoreLimit(stus, 60, 70)
  const _70_80 = getStuNumberByScoreLimit(stus, 70, 80)
  const _80_90 = getStuNumberByScoreLimit(stus, 80, 90)
  const _90_100 = getStuNumberByScoreLimit(stus, 90, 100)
  return {
    _0_60,
    _60_70,
    _70_80,
    _80_90,
    _90_100
  }
}

// 获取专业平均成绩和班级各分数段的人数，男女平均分，标准差，及格人数，总人数

const getMajorScoreDetail = (stus) => {
  const _average = getAverage(stus)
  // 及格人数
  const _pass_num = getPassNum(stus)
  // 总人数
  const _num = stus.length
  // 标准差
  const _standard_deviation = getStandard_deviation(stus, _average)
  // 专业各分数段人数
  const _0_100 = GetAllScoreLimit(stus)
  return {
    _average,
    _pass_num,
    _num,
    _standard_deviation,
    _0_100,
  }
}

// 获取班级平均成绩和班级各分数段的人数，男女平均分，标准差，及格人数，总人数
// 异步函数，返回Promise
const getClassScoreDetail = (Model, major, classes) => {
  const promises = classes.map(async (_class, i) => {
    const stus = await Model.find({ major: major, class: _class })
    // 及格人数
    const _pass_num = getPassNum(stus)
    // 总人数
    const _num = stus.length
    // 班级平均分
    const _average = getAverage(stus)
    // 男女平均分
    const stus_nan = stus.filter(item => {
      if (item.gender === "男") {
        return item
      }
    })
    const stus_nv = stus.filter(item => {
      if (item.gender === "女") {
        return item
      }
    })
    const _nan_average = getAverage(stus_nan)
    const _nv_average = getAverage(stus_nv)
    // 标准差
    const _standard_deviation = getStandard_deviation(stus, _average)
    // 各分数段人数
    const _0_100 = GetAllScoreLimit(stus)
    return {
      name: _class,
      data: {
        _pass_num,
        _num,
        _average,
        _nan_average,
        _nv_average,
        _0_100,
        _standard_deviation,
      }
    }
  })
  return Promise.all(promises)
}

module.exports = {
  getAverage,
  getPassNum,
  getStandard_deviation,
  GetAllScoreLimit,
  getClassScoreDetail,
  getMajorScoreDetail
}
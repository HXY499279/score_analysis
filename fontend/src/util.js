// 获取及格率
export const getRate = (passNum, num) => {
  const rate = ((passNum / num) * 100).toFixed(1) * 1
  return rate
}
// 数据处理
export const getMajorData = (majors) => {
  if(majors){
    let data = majors?.map(item => {
      return item.major
    })
    return data
  }
}

export const getClassData = (majors) => {
  if(majors){
    let data = majors?.map(item => {
      return item.classes
    })
    return data?.flat()
  }
}

export const getLineChartData = (data) => {
  let dataArr = data.map(item => {
    return [
      {
        item: item.name,
        type: '平均分',
        value: item.data._average
      },
      {
        item: item.name,
        type: '标准差',
        value: item.data._standard_deviation
      },
    ]
  })
  return dataArr.flat()
}
export const getHistogramLineChart = (data) => {
  // { name: '2014', type: 'Sales', value: 1000 },

  let dataArr = data.map(item => {
    const { name, data: { _0_100, _num } } = item
    const retArr = []
    for (let [sub, num] of Object.entries(_0_100)) {
      retArr.push({ name, type: (sub.replace(/_/, '')).replace(/_/, '-'), value: getRate(num, _num) })
    }
    return retArr
  })
  dataArr = dataArr.flat()
  return dataArr || []
}
export const getHistogramChart = (data) => {
  // { type: 'Apple', name: '整体', value: 30 }

  let dataArr = data.map(item => {
    const { name, data: { _0_100: { _90_100 }, _num, _pass_num } } = item
    const retArr = [
      {
        name,
        type: "及格率",
        value: getRate(_pass_num, _num)
      },
      {
        name,
        type: "优秀率",
        value: getRate(_90_100, _num)
      },
    ]
    return retArr
  })
  dataArr = dataArr.flat()
  return dataArr || []
}
export const getHistogramAverageChart = (data) => {
  // { type: 'Apple', name: '整体', value: 30 }
  console.log(data);
  let dataArr = data.map(item => {
    const { name, data: { _nan_average, _nv_average, _average } } = item
    const retArr = [
      {
        name,
        type: "男生平均分",
        value: _nan_average
      },
      {
        name,
        type: "班级平均分",
        value: _average
      },
      {
        name,
        type: "女生平均分",
        value: _nv_average
      },
    ]
    return retArr
  })
  dataArr = dataArr.flat()
  return dataArr || []
}











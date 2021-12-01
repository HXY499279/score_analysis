import React, { useEffect, useState } from 'react'
import { getHistogramAverageChart, getClassData } from '../../util'
import { Chart } from '@antv/g2';

let chart = null

export const ClassHistogramAverageChart = (props) => {
  const { majors, keyword } = props
  const data = getClassData(majors)
  /* 
    data = [
      { year: '2014', type: 'Sales', sales: 1000 },
      { year: '2015', type: 'Sales', sales: 1170 },
    ]
  */
  useEffect(() => {

    chart = new Chart({
      container: `histogram-average-chart_${keyword}`,
      autoFit: true,
      height: 500,
    });

    chart.scale('value', { nice: true, });

    chart.legend({
      position: 'top'
    });

    chart
      .interval()
      .position('name*value').color('type')
      .adjust([{
        type: 'dodge',
        marginRatio: 0
      }])
      .label('value', function () {
        return {
          offset: -10,
          content: (obj) => {
            if (obj.value) {
              return obj.value 
            }
          },
        };
      });

  }, [])

  if (data?.length) {
    chart?.data(getHistogramAverageChart(data));
    chart.render();
  }

  return (
    <div id={`histogram-average-chart_${keyword}`} />
  )
}
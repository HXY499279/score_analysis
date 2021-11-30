import React, { useEffect, useState } from 'react'
import { Chart } from '@antv/g2';
import { getLineChartData, getMajorData } from '../../util'

let chart = null

export const MajorLineChart = (props) => {
  const { majors, keyword } = props
  const data = getMajorData(majors)
  /* 
    data = [
      {name: '经济金融', data: {…}},
      {name: '经济金融', data: {…}}
    ]
  */
  useEffect(() => {
    chart = new Chart({
      container: `line-chart_${keyword}`,
      autoFit: true,
      height: 500,
    });

    chart.scale({
      item: {
        range: [0, 1],
      },
      value: {
        nice: true,
      },
    });

    chart.tooltip({
      showCrosshairs: true,
      shared: true,
    });

    chart.axis('value', {
      label: {
        formatter: (val) => {
          return val;
        },
      },
    });

    chart
      .line()
      .position('item*value')
      .color('type')
      .shape('smooth');

    chart
      .point()
      .position('item*value')
      .color('type')
      .shape('circle')
      .style({
        stroke: '#fff',
        lineWidth: 1,
      });
  }, [])

  if (data?.length) {
    chart.data(getLineChartData(data));
    chart.render();
  }

  return (
    <div id={`line-chart_${keyword}`} />
  )
}
import React, { useEffect, useState } from 'react'
import { getHistogramLineChart, getMajorData } from '../../util'
import { Chart, registerInteraction } from '@antv/g2';
import { ISMOBILE } from '../../App';

let chart = null

export const MajorHistogramLineChart = (props) => {
  const { majors, keyword } = props
  const data = getMajorData(majors)
  /* 
    data = [
      { year: '2014', type: 'Sales', sales: 1000 },
      { year: '2015', type: 'Sales', sales: 1170 },
    ]
  */
  useEffect(() => {
    registerInteraction('element-link', {
      start: [
        { trigger: 'interval:mouseenter', action: 'element-link-by-color:link' }
      ],
      end: [
        { trigger: 'interval:mouseleave', action: 'element-link-by-color:unlink' }
      ]
    });

    chart = new Chart({
      container: `histogram_line-chart_${keyword}`,
      autoFit: true,
      height: 500,
    });

    chart.scale({
      sales: {
        max: 2400,
        tickInterval: 600,
        nice: true,
      },
    });

    chart.tooltip({
      showMarkers: false
    });

    chart
      .interval()
      .position('name*value')
      .color('type')
      .adjust('stack')
      .label('value', function () {
        return {
          offset: -10,
          content: (obj) => {
            if (obj.value && !ISMOBILE) {
              return obj.value + "%";
            }
          },
        };
      });

    chart.interaction('element-highlight-by-color');
    chart.interaction('element-link');
  }, [])

  if (data?.length) {
    chart.data(getHistogramLineChart(data));
    chart.render();
  }

  return (
    <div id={`histogram_line-chart_${keyword}`} />
  )
}
import React, { useEffect, useState } from 'react'
import { Row, Col } from "antd"
import axios from "axios"
import {
  Total,
  Introducing,
  MajorHistogramLineChart,
  MajorLineChart,
  MajorHistogramChart,
  ClassHistogramLineChart,
  ClassLineChart,
  ClassHistogramChart,
  ClassHistogramAverageChart
} from './components';
import 'antd/dist/antd.css';
import styles from './App.module.css';

axios.interceptors.response.use((res) => {
  return res?.data
})

// 定义全局变量用于移动端适配
export let ISMOBILE = 0

console.log(document.body.clientWidth);

var browser = {
  versions: function () {
    var u = navigator.userAgent, app = navigator.appVersion;
    return {         //移动终端浏览器版本信息

      trident: u.indexOf('Trident') > -1, //IE内核

      presto: u.indexOf('Presto') > -1, //opera内核

      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核

      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核

      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端

      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端

      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器

      iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器

      iPad: u.indexOf('iPad') > -1, //是否iPad

      webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部

    };

  }(),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

if (browser.versions.mobile) {//判断是否是移动设备打开。browser代码在下面
  var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    //在微信中打开
    ISMOBILE = 24
  } else if (ua.match(/WeiBo/i) == "weibo") {
    //在新浪微博客户端打开
    ISMOBILE = 24
  } else if (ua.match(/QQ/i) == "qq") {
    //在QQ空间打开
    ISMOBILE = 24
  } else if (browser.versions.ios) {
    //是否在IOS浏览器打开
    ISMOBILE = 24
  } else if (browser.versions.android) {
    //是否在安卓浏览器打开
    ISMOBILE = 24
  }
} else {
  //否则就是PC浏览器打开
}


function App() {
  const [total, setTotal] = useState(null)
  const [majors, setMajors] = useState(null)
  const [Instructor, setInstructor] = useState(null)

  useEffect(() => {
    axios.get("/total-average")
      .then(res => {
        setTotal(res)
      })
    axios.get("/majors")
      .then(res => {
        setMajors(res)
      })
    axios.get("/instructor")
      .then(res => {
        setInstructor(res)
      })
  }, [])

  return (
    <div className={styles["App"]}>
      <p
        style={{ textAlign: "center", marginBottom: "20px" }}
      >
        <span style={{ fontSize: "25px", fontWeight: 800 }}>成绩单数据可视化分析</span>
        {ISMOBILE ? <br /> : <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>}
        <span>{`数据来源：${Instructor?.dataSources}`}</span>
      </p>
      <Row gutter={[16, 24]}>
        <Col className="gutter-row" span={ISMOBILE || 6}>
          <Total total={total} Instructor={Instructor} />
        </Col>
        <Col className="gutter-row" span={ISMOBILE || 18}>
          <Introducing />
        </Col>
        <Col className="gutter-row" span={ISMOBILE || 24}>
          <p
            style={{ textAlign: "center", marginBottom: "20px", fontSize: "28px" }}
          >
            专业
          </p>
        </Col>
        <Col className="gutter-row" span={ISMOBILE || 8}>
          <div className={styles["chart-wrap"]}>
            <span className={styles["chart-title"]}>标准差与平均分</span>
            <MajorLineChart majors={majors} keyword="major" />
          </div>
        </Col>
        <Col className="gutter-row" span={ISMOBILE || 8}>
          <div className={styles["chart-wrap"]}>
            <span className={styles["chart-title"]}>分数段占比</span>
            <MajorHistogramLineChart majors={majors} keyword="major" />
          </div>
        </Col>
        <Col className="gutter-row" span={ISMOBILE || 8}>
          <div className={styles["chart-wrap"]}>
            <span className={styles["chart-title"]}>及格率与优秀率</span>
            <MajorHistogramChart majors={majors} keyword="major" />
          </div>
        </Col>
        <Col className="gutter-row" span={ISMOBILE || 24}>
          <p
            style={{ textAlign: "center", marginBottom: "20px", fontSize: "28px" }}
          >
            班级
          </p>
        </Col>
        <Col className="gutter-row" span={ISMOBILE || 12}>
          <div className={styles["chart-wrap"]}>
            <span className={styles["chart-title"]}>标准差与平均分</span>
            <ClassLineChart majors={majors} keyword="class" />
          </div>
        </Col>
        <Col className="gutter-row" span={ISMOBILE || 12}>
          <div className={styles["chart-wrap"]}>
            <span className={styles["chart-title"]}>分数段占比</span>
            <ClassHistogramLineChart majors={majors} keyword="class" />
          </div>
        </Col>
        <Col className="gutter-row" span={ISMOBILE || 24}>
          <div className={styles["chart-wrap"]}>
            <span className={styles["chart-title"]}>及格率与优秀率</span>
            <ClassHistogramChart majors={majors} keyword="class" />
          </div>
        </Col>
        <Col className="gutter-row" span={ISMOBILE || 24}>
          <div className={styles["chart-wrap"]}>
            <span className={styles["chart-title"]}>男女生班级贡献对比</span>
            <ClassHistogramAverageChart majors={majors} keyword="class" />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Select } from "antd"
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

const { Option } = Select;


axios.interceptors.response.use((res) => {
  return res.data
})


function App() {
  const [total, setTotal] = useState(null)
  const [majors, setMajors] = useState(null)
  console.log(majors);
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
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>{`数据来源：${Instructor?.title}`}</span>
      </p>
      <Row gutter={[16, 24]}>
        <Col className="gutter-row" span={8}>
          <Total total={total} Instructor={Instructor} />
        </Col>
        <Col className="gutter-row" span={16}>
          <Introducing />
        </Col>
        <Col className="gutter-row" span={24}>
          <p
            style={{ textAlign: "center", marginBottom: "20px", fontSize: "25px" }}
          >
            专业
          </p>
        </Col>
        <Col className="gutter-row" span={8}>
          <div className={styles["chart-wrap"]}>
            <span className={styles["chart-title"]}>标准差与平均分</span>
            <MajorLineChart majors={majors} keyword="major" />
          </div>
        </Col>
        <Col className="gutter-row" span={8}>
          <div className={styles["chart-wrap"]}>
            <span className={styles["chart-title"]}>分数段</span>
            <MajorHistogramLineChart majors={majors} keyword="major" />
          </div>
        </Col>
        <Col className="gutter-row" span={8}>
          <div className={styles["chart-wrap"]}>
            <span className={styles["chart-title"]}>及格率与优秀率</span>
            <MajorHistogramChart majors={majors} keyword="major" />
          </div>
        </Col>
        <Col className="gutter-row" span={24}>
          <p
            style={{ textAlign: "center", marginBottom: "20px", fontSize: "25px" }}
          >
            班级
          </p>
        </Col>
        <Col className="gutter-row" span={12}>
          <div className={styles["chart-wrap"]}>
            <span className={styles["chart-title"]}>标准差与平均分</span>
            <ClassLineChart majors={majors} keyword="class" />
          </div>
        </Col>
        <Col className="gutter-row" span={12}>
          <div className={styles["chart-wrap"]}>
          <span className={styles["chart-title"]}>分数段</span>
            <ClassHistogramLineChart majors={majors} keyword="class" />
          </div>
        </Col>
        <Col className="gutter-row" span={24}>
          <div className={styles["chart-wrap"]}>
            <span className={styles["chart-title"]}>及格率与优秀率</span>
            <ClassHistogramChart majors={majors} keyword="class" />
          </div>
        </Col>
        <Col className="gutter-row" span={24}>
        <div className={styles["chart-wrap"]}>
            <span className={styles["chart-title"]}>男女生班级贡献</span>
            <ClassHistogramAverageChart majors={majors} keyword="class" />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default App;

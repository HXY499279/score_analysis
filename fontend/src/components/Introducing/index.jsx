import { Card } from "antd"
import styles from "./index.module.css"

export const Introducing = () => {
  return (
    <Card title="功能介绍" className={styles["introducing-card"]}>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        从专业和班级两个角度展现数据的差异。专业：根据平均分和方差的综合实力对比，各分数段人数占比查看，及格率优秀率对比。
        班级：根据平均分和方差的综合实力对比，各分数段人数占比查看，及格率优秀率对比，男女生分数贡献情况。
      </p>
    </Card>
  )
}
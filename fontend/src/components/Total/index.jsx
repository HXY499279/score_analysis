import { Card } from "antd"
import { getRate } from '../../util';
import styles from "./index.module.css"

export const Total = (props) => {
  const { total, Instructor } = props
  return (
    <Card title={`辅导员：${Instructor?.name}`} className={styles["total-card"]}>
      <p>总平均分：{total?._total_average}</p>
      <p>及格率：{getRate(total?._pass_num, total?._num)}% </p>
      <p>总及格人数：{total?._pass_num}</p>
      <p>总人数：{total?._num}</p>
    </Card>
  )
}
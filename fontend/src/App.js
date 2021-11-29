import React, { useEffect, useState } from 'react'
import './App.css';
import { Chart } from '@antv/g2';
import axios from "axios"

axios.interceptors.response.use((res) => {
  return res.data
})


function App() {
  const [total_average, setTotal_average] = useState(0)
  const [majors, setMajors] = useState(null)

  useEffect(() => {
    axios.get("/total-average")
      .then(res => {
        setTotal_average(res.total_average)
      })
    axios.get("/majors")
      .then(res => {
        console.log(res);
        setMajors(res)
      })
  }, [])

  return (
    <div className="App">
      {/* <p>
        总平均分：{total_average}<br />
        经济金融平均分：{jjjr?.total_average}<br />
        管工平均分：{gg?.total_average}
      </p>
      <p>
        经济金融1班平均分：{jjjr?.class1_average}<br />
        经济金融2班平均分：{jjjr?.class2_average}<br />
        经济金融3班平均分：{jjjr?.class3_average}
      </p>
      <p>
        管工1班平均分：{gg?.class1_average}<br />
        管工2班平均分：{gg?.class2_average}<br />
        管工3班平均分：{gg?.class3_average}<br />
        管工4班平均分：{gg?.class4_average}<br />
        管工5班平均分：{gg?.class5_average}<br />
        管工6班平均分：{gg?.class6_average}
      </p> */}
      <p>

      </p>
      <p>

      </p>
      <p>

      </p>
    </div>
  );
}

export default App;

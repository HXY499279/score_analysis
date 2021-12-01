# 辅导员成绩分析可视化

本系统提供辅导员所带专业的单次考试成绩单分析，需要自行初始化操作，操作如下

## 1. 规范 Excel 文件

将成绩单整理成下面的格式
| sno | sname | gender | class | major | score |
| ------ | ----- | ------ | ----- | ----- | ----- |
| 123456 | hxx | 男 | 1 | 管工 | 100 |

## 2. 将 Excel 数据转换为 JSON 格式

1. 新建文件夹，命名为 excel_to_json
2. 在 excel_to_json 文件夹中使用 npm init -y
3. 然后下载依赖包使用 npm install xls-to-json
4. 在 excel_to_json 文件夹中创建文件 util.js，复制以下代码到 util.js 文件

```js
const x_to_j = require("xls-to-json");
x_to_j(
  {
    // 在此处修改程序入口和输出
    input: "./excel/total.xlsx",
    output: "./json/total.json",
  },
  (err, res) => {
    if (err) {
      console.error(err);
    } else {
      console.log(res);
    }
  }
);
```

5. 在 excel_to_json 文件夹创建 excel 文件夹和 json 文件夹
6. 在 excel 文件夹中放入被转换的 excel 文件
7. 在 excel_to_json 文件夹下执行 node util.js
8. 完成转换，转换结果在 json 文件夹下

## 3. 导入 JSON 数据到 MongoDB 数据库中

1. 打开 MongoDB Compass 可视化操作界面，新建数据库 schoolReport
2. 新建集合 zs_gs_half_totals，在集合中导入 JSON 数据

## 4. 克隆本项目到本地

1. 本地新建文件夹 project
2. git clone git@github.com:HXY499279/score_analysis.git / git clone https://github.com/HXY499279/score_analysis.git
3. 进入 score_analysis 文件夹

## 5. 启动后台 backEnd

### 5.1 新建辅导员信息并导出

1. 进入 backEnd/InstructorAndDB.js 文件
2. 确认 const 常量 MONGODB_URL（数据库地址）是否与你的本地 MongoDB 新建数据库吻合，必要请修改

```js
const MONGODB_URL = "mongodb://localhost:27017/schoolReport";
```

3. 创建新的辅导员信息

```js
const newInstructor = {
  // 该成绩单辅导员名字
  name:"新辅导员",
  // 数据来源，描述本次数据的来源
  dataSources:"成绩单",
  // MongoDB数据库新建集合的名字
  tableName: "zs_gs_half_totals",
  // 专业班级信息一定要和新建数据库中导入的成绩单数据吻合，仔细填写，请勿写错
  majors: [
    {
      // 专业
      MAJOR: "信管",
      // 该专业下的班级
      CLASSES: ["3012001", "3012002", "3012003", "3012004"]
    },
    {
      MAJOR: "工商",
      CLASSES: ["3015001", "3015002", "3015003", "3015004"]
    },
    ...
  ]
}
```

4. 导出辅导员信息和数据库地址

```js
module.exports = {
  Instructor: newInstructor,
  DB_URL: MONGODB_URL,
};
```

### 5.2 启动后台程序

1. 退出到 backEnd 文件夹下
2. 执行 node app.js 或 nodemon app.js （如果 npm install nodemon 了）
3. 程序默认打开在 5000 端口号，如有需要请自行更改

## 6. 启动前台 fontEnd

1. 进入到 fontEnd 文件夹下
2. 如果修改了后台端口号，请进入 package.json 文件配置新的 proxy
3. 在 fontEnd 文件夹下执行 npm start

## 7. 项目启动成功，显示成绩单可视化数据！

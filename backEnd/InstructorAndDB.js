const MONGODB_URL = "mongodb://localhost:27017/schoolReport"
/* 
  在这里添加辅导员的信息，并且导出想要被数据分析的辅导员
*/
const ZS = {
  name:"张盛",
  dataSources:"大一上高数半期成绩单",
  tableName: "zs_gs_half_totals",
  majors: [
    {
      MAJOR: "经济金融",
      CLASSES: ["03152101", "03152102", "03152103",]
    },
    {
      MAJOR: "管工",
      CLASSES: ["03172101", "03172102", "03172103", "03172104", "03172105", "03172106"]
    },
  ]
}
const TEST = {
  name:"测试",
  dataSources:"测试成绩分析",
  tableName: "tests",
  majors: [
    {
      MAJOR: "信管",
      CLASSES: ["3012001", "3012002", "3012003", "3012004"]
    },
    {
      MAJOR: "工商",
      CLASSES: ["3015001", "3015002", "3015003", "3015004"]
    },
  ]
}
const HXL = {
  name:"黄晓兰",
  dataSources:"大一上高数半期成绩单",
  tableName: "hxl_gs_half_totals",
  majors: [
    {
      MAJOR: "工商管理类",
      CLASSES: ["03122101", "03122102", "03122103","03122104","03122105"]
    },
    {
      MAJOR: "电子商务类",
      CLASSES: ["03162101", "03162102"]
    },
    {
      MAJOR: "邮政工程",
      CLASSES: ["18012101", "18012102"]
    },
  ]
}

module.exports = {
  Instructor: HXL,
  DB_URL: MONGODB_URL
}
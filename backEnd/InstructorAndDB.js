const MONGODB_URL = "mongodb://localhost:27017/schoolReport"
/* 
  在这里添加辅导员的信息，并且导出想要被数据分析的辅导员
*/
const ZS = {
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

module.exports = {
  Instructor: ZS,
  DB_URL: MONGODB_URL
}
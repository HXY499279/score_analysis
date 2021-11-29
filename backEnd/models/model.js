const mongoose = require('mongoose');
const Schema = mongoose.Schema
// 定义字段类型
const tableSchema = new Schema({
  sno: String,
  sname: String,
  gender: String,
  class: String,
  major: String,
  score: Number | String
})
// 导入辅导员
const { Instructor } = require("../InstructorAndDB")
// 根据辅导员连接对应的成绩单
const createModel = (Instructor) => {
  const Model = mongoose.model(Instructor.tableName, tableSchema)
  return Model
}

module.exports = createModel(Instructor)
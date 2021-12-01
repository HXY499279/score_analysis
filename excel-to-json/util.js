const x_to_j = require("xls-to-json");
x_to_j({
  input: "./excel/total.xlsx",
  output: "./json/total.json"
}, (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log(res);
  }
});
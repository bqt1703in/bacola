const mongoose = require("mongoose");
module.exports.connect = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/bacola");
    console.log("Kết nối cơ sở dữ liệu thành công!!!");
  } catch (error) {
    console.log("Kết nối cơ sở dữ liệu thất bại!!!");
  }
};

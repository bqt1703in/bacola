const mongoose = require("mongoose");
module.exports.connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://quangtruong1703:quangtruong1703@bacolaproject.kfswjj7.mongodb.net/bacola_db?retryWrites=true&w=majority&appName=bacolaProject"
    );
    console.log("Kết nối cơ sở dữ liệu thành công!!!");
  } catch (error) {
    console.log("Kết nối cơ sở dữ liệu thất bại!!!");
  }
};

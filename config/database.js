const mongoose = require("mongoose");
module.exports.connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://buiquangtruong1703:MV4pUHKzZJQ0Lxr6@cluster0.39xt7kf.mongodb.net/bacola"
    );
    console.log("Kết nối cơ sở dữ liệu thành công!!!");
  } catch (error) {
    console.log("Kết nối cơ sở dữ liệu thất bại!!!");
  }
};
// const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri =
//   "mongodb+srv://buiquangtruong1703:MV4pUHKzZJQ0Lxr6@cluster0.39xt7kf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

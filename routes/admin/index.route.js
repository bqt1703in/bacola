const dashboardRoutes = require("./dashboard.route");
const productsRoutes = require("./products.route");

module.exports = (app) => {
  app.use("/admin/dashboard", dashboardRoutes);
  app.use("/admin/products", productsRoutes);
};

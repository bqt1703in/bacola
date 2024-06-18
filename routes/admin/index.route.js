const dashboardRoutes = require("./dashboard.route");
const productsRoutes = require("./products.route");
const categoriesRoutes = require("./categories.route");
const rolesRoutes = require("./roles.route");

module.exports = (app) => {
  app.use("/admin/dashboard", dashboardRoutes);
  app.use("/admin/products", productsRoutes);
  app.use("/admin/products-categories", categoriesRoutes);
  app.use("/admin/roles", rolesRoutes);
};

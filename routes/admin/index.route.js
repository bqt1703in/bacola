const dashboardRoutes = require("./dashboard.route");
const productsRoutes = require("./products.route");
const categoriesRoutes = require("./categories.route");
const rolesRoutes = require("./roles.route");
const accountsRouters = require("./acounts.route");
const authRouters = require("./auth.route");
const authMiddleware = require("../../middlewares/admin/auth.middlewre");
const myAccountRouters = require("./my-account.route");
module.exports = (app) => {
  app.use("/admin/dashboard", authMiddleware.requireAuth, dashboardRoutes);
  app.use("/admin/products", authMiddleware.requireAuth, productsRoutes);
  app.use(
    "/admin/products-categories",
    authMiddleware.requireAuth,
    categoriesRoutes
  );
  app.use("/admin/roles", authMiddleware.requireAuth, rolesRoutes);
  app.use("/admin/accounts", authMiddleware.requireAuth, accountsRouters);
  app.use("/admin/auth", authRouters);
  app.use("/admin/my-account", authMiddleware.requireAuth, myAccountRouters);
};

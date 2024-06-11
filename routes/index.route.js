const clientRoutes = require("./client/index.route");
const adminRoutes = require("./admin/index.route");

module.exports = (app) => {
  clientRoutes(app);
  adminRoutes(app);
};

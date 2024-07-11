const Accounts = require("../../models/accounts.model");
const Roles = require("../../models/roles.model");

module.exports.requireAuth = async (req, res, next) => {
  if (!req.cookies.token) {
    res.redirect("/admin/auth/login");
  } else {
    const user = await Accounts.findOne({ token: req.cookies.token }).select(
      "-password -token"
    );
    if (!user) {
      res.redirect("/admin/auth/login");
    } else {
      const role = await Roles.findOne({ _id: user.role }).select(
        "title permissions"
      );
      res.locals.user = user;
      res.locals.role_user = role;
      next();
    }
  }
};

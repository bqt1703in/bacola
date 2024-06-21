const Accounts = require("../../models/accounts.model");
module.exports.requireAuth = async (req, res, next) => {
  if (!req.cookies.token) {
    res.redirect("/admin/auth/login");
  } else {
    const user = await Accounts.findOne({ token: req.cookies.token });
    if (!user) {
      res.redirect("/admin/auth/login");
    } else {
      next();
    }
  }
};

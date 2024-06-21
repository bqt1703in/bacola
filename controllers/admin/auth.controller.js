const Accounts = require("../../models/accounts.model");
const md5 = require("md5");
module.exports.login = async (req, res) => {
  if (req.cookies.token) {
    const user = await Accounts.findOne({ token: req.cookies.token });
    if (user) {
      res.redirect("/admin/dashboard");
    } else {
      res.render("admin/pages/auth/login.pug", {
        pageTitle: "Đăng nhập",
      });
    }
  } else {
    res.render("admin/pages/auth/login.pug", {
      pageTitle: "Đăng nhập",
    });
  }
};
module.exports.loginPost = async (req, res) => {
  req.body.password = md5(req.body.password);
  const accounts = await Accounts.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (accounts) {
    if (accounts.status == "inactive") {
      req.flash(
        "error",
        "Tài khoản của bạn đã bị khoá. Vui lòng liên hệ quản trị viên để được giải quyết"
      );
      res.redirect("back");
    } else {
      res.cookie("token", accounts.token);
      res.redirect("/admin/dashboard");
    }
  } else {
    req.flash("error", "Email hoặc mật khẩu không đúng");
    res.redirect("back");
  }
};
module.exports.logout = (req, res) => {
  // const isConfirm = confirm("Bạn muốn đăng xuất");
  // if (isConfirm) {
  res.clearCookie("token");
  res.redirect("/admin/auth/login");
  // }
};

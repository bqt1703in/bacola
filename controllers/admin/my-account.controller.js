const Accounts = require("../../models/accounts.model");
const md5 = require("md5");

module.exports.myAccount = (req, res) => {
  res.render("admin/pages/my-account/my-account.pug");
};
module.exports.edit = (req, res) => {
  res.render("admin/pages/my-account/edit.pug");
};

module.exports.editPatch = async (req, res) => {
  const emailExist = await Accounts.findOne({
    _id: { $ne: res.locals.user.id },
    email: req.body.email,
    deleted: false,
  });
  if (emailExist) {
    req.flash("error", `Email ${req.body.email} đã tồn tại`);
  } else {
    if (req.body.password) {
      req.body.password = md5(req.body.password);
    } else {
      delete req.body.password;
    }
    await Accounts.updateOne({ _id: res.locals.user.id }, req.body);
    req.flash("success", "Cập nhật thông tin thành công");
  }
  res.redirect("back");
};

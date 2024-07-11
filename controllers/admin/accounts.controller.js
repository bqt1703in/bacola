const Accounts = require("../../models/accounts.model");
const Roles = require("../../models/roles.model");
const md5 = require("md5");
const generate = require("../../helpers/generateString");

module.exports.accounts = async (req, res) => {
  let find = {
    deleted: false,
  };
  const accounts = await Accounts.find(find).select("-password -token");
  accounts.map(async (account) => {
    const role = await Roles.findOne({ _id: account.role, deleted: false });
    return (account.roleTitle = role.title);
  });
  const roles = await Roles.find(find);
  res.render("admin/pages/accounts/accounts.pug", {
    pageTitle: "Danh sách tài khoản",
    accounts: accounts,
  });
};

module.exports.create = async (req, res) => {
  let find = {
    deleted: false,
  };
  const roles = await Roles.find(find);
  res.render("admin/pages/accounts/create.pug", {
    pageTitle: "Tạo tài khoản",
    roles: roles,
  });
};

module.exports.createPost = async (req, res) => {
  try {
    const emailExist = await Accounts.findOne({
      email: req.body.email,
      deleted: false,
    });
    if (!emailExist) {
      req.body.password = md5(req.body.password);
      req.body.token = generate.generateRandomSring(20);
      const account = new Accounts(req.body);
      await account.save();
      req.flash("success", "Tạo tài khoản thành công");
      res.redirect("/admin/accounts");
    } else {
      req.flash("error", `Email ${req.body.email} đã tồn tại`);
      res.redirect("back");
    }
  } catch (error) {
    res.redirect("/admin/accounts");
  }
};

module.exports.edit = async (req, res) => {
  const account = await Accounts.findOne({ _id: req.params.id });
  const roles = await Roles.find({ deleted: false });
  res.render("admin/pages/accounts/edit.pug", {
    pageTitle: "Cập nhật tài khoản",
    account: account,
    roles: roles,
  });
};

module.exports.editPatch = async (req, res) => {
  const emailExist = await Accounts.findOne({
    _id: { $ne: req.params.id },
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
    await Accounts.updateOne({ _id: req.params.id }, req.body);
    req.flash("success", "Cập nhật thông tin thành công");
  }
  res.redirect("back");
};

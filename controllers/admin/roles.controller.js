const Roles = require("../../models/roles.model");
module.exports.roles = async (req, res) => {
  let find = {
    deleted: false,
  };
  const roles = await Roles.find(find);
  res.render("admin/pages/roles/roles.pug", {
    pageTitle: "Danh sách quyền",
    roles: roles,
  });
};

module.exports.create = (req, res) => {
  res.render("admin/pages/roles/create.pug", {
    pageTitle: "Tạo nhóm quyền",
  });
};

module.exports.createPost = async (req, res) => {
  const role = new Roles(req.body);
  await role.save();
  res.redirect("/admin/roles");
};
module.exports.edit = async (req, res) => {
  const find = {
    deleted: false,
    _id: req.params.id,
  };
  const role = await Roles.findOne(find);
  res.render("admin/pages/roles/edit.pug", {
    pageTitle: "Sửa nhóm quyền",
    role: role,
  });
};

module.exports.editPatch = async (req, res) => {
  try {
    await Roles.updateOne({ _id: req.params.id }, req.body);
    req.flash("success", "Cập nhật thông tin thành công");
    res.redirect("back");
  } catch (error) {
    res.redirect("/admin/roles");
    req.flash("error", "Cập nhật thất bại, vui lòng thử lại");
  }
};

module.exports.permissions = async (req, res) => {
  const find = {
    deleted: false,
  };
  const roles = await Roles.find(find);
  res.render("admin/pages/roles/permissions.pug", {
    pageTitle: "Phân quyền",
    roles: roles,
  });
};

module.exports.permissionsPatch = async (req, res) => {
  try {
    const permissions = JSON.parse(req.body.permissions);
    for (const item of permissions) {
      await Roles.updateOne(
        { _id: item.id },
        { permissions: item.permissions }
      );
    }
    req.flash("success", "Cập nhật thành công");
  } catch (error) {
    req.flash("error", "Đã xãy ra lỗi, vui lòng thử lại");
  }
  res.redirect("back");
};

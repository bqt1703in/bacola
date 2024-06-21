module.exports.createPost = (req, res, next) => {
  if (!req.body.fullName) {
    req.flash("error", "Họ tên không được bỏ trống");
    res.redirect("back");
    return;
  }

  if (!req.body.password) {
    req.flash("error", "Mật khẩu không được để trống");
    res.redirect("back");
    return;
  }
  if (!req.body.email) {
    req.flash("error", "Email không được để trống");
    res.redirect("back");
    return;
  }
  next();
};

module.exports.editPost = (req, res, next) => {
  if (!req.body.fullName) {
    req.flash("error", "Họ tên không được bỏ trống");
    res.redirect("back");
    return;
  }

  if (!req.body.email) {
    req.flash("error", "Email không được để trống");
    res.redirect("back");
    return;
  }
  next();
};

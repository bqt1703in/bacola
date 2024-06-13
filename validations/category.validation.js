module.exports.createPost = (req, res, next) => {
  if (!req.body.title) {
    req.flash("error", "Tên danh mục không được bỏ trống");
    res.redirect("back");
    return;
  }
  next();
};

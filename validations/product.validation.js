module.exports.createPost = (req, res, next) => {
  if (!req.body.title) {
    req.flash("error", "Tiêu đề không được bỏ trống");
    res.redirect("back");
    return;
  }

  if (req.body.title.length < 8) {
    req.flash("error", "Tiêu đề phải dài tối thiểu 8 kí tự");
    res.redirect("back");
    return;
  }
  next();
};

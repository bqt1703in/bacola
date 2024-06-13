const Categories = require("../../models/categories.model");

module.exports.categories = async (req, res) => {
  const find = {
    deleted: false,
  };
  const categories = await Categories.find(find);
  res.render("admin/pages/categories/categories.pug", {
    pageTitle: "Danh mục sản phẩm",
    categories: categories,
  });
};
module.exports.create = (req, res) => {
  res.render("admin/pages/categories/create.pug", {
    pageTitle: "Tạo danh mục",
  });
};
module.exports.createPost = async (req, res) => {
  if (!req.body.position) {
    const countCategories = await Categories.count();
    req.body.position = countCategories + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  const category = new Categories(req.body);
  await category.save();
  req.flash("messages", "Tạo danh mục thành công");
  res.redirect("/admin/products-categories");
};

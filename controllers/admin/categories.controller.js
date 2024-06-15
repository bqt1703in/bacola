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
module.exports.create = async (req, res) => {
  let find = {
    deleted: false,
  };
  const createTree = (arr, parentID = "") => {
    const tree = [];
    arr.forEach((item) => {
      if (item.parent === parentID) {
        const newItem = item;
        const children = createTree(arr, item.id);
        if (children.length > 0) {
          newItem.children = children;
        }
        tree.push(newItem);
      }
    });
    return tree;
  };
  const categories = await Categories.find(find);
  const newCategories = createTree(categories);

  res.render("admin/pages/categories/create.pug", {
    pageTitle: "Tạo danh mục",
    categories: newCategories,
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

module.exports.edit = async (req, res) => {
  const category = await Categories.findOne({ _id: req.params.id });
  let find = {
    deleted: false,
  };
  const createTree = (arr, parentID = "") => {
    const tree = [];
    arr.forEach((item) => {
      if (item.parent === parentID) {
        const newItem = item;
        const children = createTree(arr, item.id);
        if (children.length > 0) {
          newItem.children = children;
        }
        tree.push(newItem);
      }
    });
    return tree;
  };
  const categories = await Categories.find(find);
  const newCategories = createTree(categories);
  res.render("admin/pages/categories/edit.pug", {
    pageTitle: "Chỉnh sửa danh mục",
    category: category,
    categories: newCategories,
  });
};

module.exports.editPatch = async (req, res) => {
  try {
    req.body.position = parseInt(req.body.position);
    await Categories.updateOne({ _id: req.params.id }, req.body);
    req.flash("success", "Cập nhật thành công");
  } catch (error) {
    req.flash("error", "Đã xãy ra lỗi, vui lòng thử lại!");
    res.redirect("/admin/products-categories");
  }
  res.redirect("back");
};

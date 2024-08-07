const Product = require("../../models/products.model");
const paginationHelper = require("../../helpers/pagination");
const searchHelper = require("../../helpers/search");
const Account = require("../../models/accounts.model");

module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
  };
  const objSearch = searchHelper(req.query); // Tìm kiếm sản phẩm
  if (objSearch.regex) {
    find.title = objSearch.regex;
  }
  if (req.query.status == "active" || req.query.status == "inactive") {
    find.status = req.query.status;
  } else {
  }

  const countProduct = await Product.count(find);
  const totalPage = Math.ceil(countProduct / 4);
  if (req.query.page > totalPage) {
    req.query.page = 1;
  }

  const objPagination = paginationHelper(
    {
      currentPage: 1,
      limitItems: 4,
    },
    countProduct,
    req.query
  );

  let sort = {};
  if (req.query.sort) {
    const [keySort, valueSort] = req.query.sort.split("-");
    sort[keySort] = valueSort;
  } else {
    sort.position = "desc";
  }

  const products = await Product.find(find)
    .sort(sort)
    .limit(objPagination.limitItems)
    .skip(objPagination.skip);

  for (const product of products) {
    const userCreated = await Account.findOne({
      _id: product.createdBy.account_id,
    });
    if (userCreated) {
      product.createdBy.fullName = userCreated.fullName;
    }
    const updatedBy = product.updatedBy.slice(-1)[0];
    if (updatedBy) {
      const userUpdated = await Account.findOne({ _id: updatedBy.account_id });
      product.updatedBy.fullName = userUpdated.fullName;
    }
  }

  res.render("admin/pages/products/products.pug", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    pagination: objPagination,
  });
};

module.exports.changeStatus = async (req, res) => {
  const updatedBy = {
    account_id: res.locals.user.id,
    updatedAt: Date.now(),
  };
  await Product.updateOne(
    { _id: req.params.id },
    { status: req.params.status, $push: { updatedBy: updatedBy } }
  );
  res.redirect("back");
};

module.exports.changeMulti = async (req, res) => {
  const ids = req.body["value-submit"].split(", ");
  const typeChange = req.body["type-change"];
  const updatedBy = {
    account_id: res.locals.user.id,
    updatedAt: Date.now(),
  };

  switch (typeChange) {
    case "active":
      await Product.updateMany(
        { _id: { $in: ids } },
        { status: "active", $push: { updatedBy: updatedBy } }
      );
      req.flash("messages", "Thay đổi trạng thái sản phẩm thành công");
      break;
    case "inactive":
      await Product.updateMany(
        { _id: { $in: ids } },
        { status: "inactive", $push: { updatedBy: updatedBy } }
      );
      req.flash("messages", "Thay đổi trạng thái sản phẩm thành công");
      break;
    case "delete-all":
      await Product.updateMany({ _id: { $in: ids } }, { deleted: true });
      req.flash("messages", "Xoá các sản phẩm thành công");
      break;
    default:
      break;
  }
  res.redirect("back");
};
module.exports.delete = async (req, res) => {
  await Product.updateOne({ _id: req.params.id }, { deleted: true });
  req.flash("messages", "Xóa sản phẩm thành công");
  res.redirect("back");
};

module.exports.create = (req, res) => {
  res.render("admin/pages/products/create.pug", {
    pageTitle: "Thêm mới sản phẩm",
  });
};

module.exports.createPost = async (req, res) => {
  req.body.price = parseFloat(req.body.price);
  req.body.discountPercentage = parseFloat(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  req.body.createdBy = {
    account_id: res.locals.user.id,
  };

  if (!req.body.position) {
    const countProduct = await Product.count();
    req.body.position = countProduct + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  const product = new Product(req.body);
  await product.save();
  req.flash("messages", "Thêm sản phẩm thành công");
  res.redirect("/admin/products");
};

module.exports.edit = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    res.render("admin/pages/products/edit.pug", {
      pageTitle: "Chỉnh sửa sản phẩm",
      product: product,
      imgName: product.thumbnail.split("/")[2],
    });
  } catch (error) {
    res.redirect("/admin/products");
  }
};

module.exports.editPatch = async (req, res) => {
  req.body.position = parseInt(req.body.position);
  req.body.price = parseInt(req.body.price);
  req.body.stock = parseInt(req.body.stock);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }
  try {
    const updatedBy = {
      account_id: res.locals.user.id,
      updatedAt: Date.now(),
    };

    await Product.updateOne(
      { _id: req.params.id },
      {
        ...req.body,
        $push: { updatedBy: updatedBy },
      }
    );
  } catch (error) {}
  req.flash("success", "Cập nhật thông tin sản phẩm thành công");
  res.redirect("back");
};

module.exports.detail = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    res.render("admin/pages/products/detail.pug", {
      pageTitle: product.title,
      product: product,
    });
  } catch (error) {
    res.redirect("/admin/products");
  }
};

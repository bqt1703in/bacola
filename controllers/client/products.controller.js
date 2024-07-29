const Product = require("../../models/products.model");
const pagination = require("../../helpers/pagination");
const Categories = require("../../models/categories.model");
module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
    status: "active",
  };
  const countProduct = await Product.count(find);
  const objPagination = pagination(
    {
      currentPage: 1,
      limitItems: 8,
    },
    countProduct,
    req.query
  );

  const products = await Product.find(find)
    .sort({ position: "desc" })
    .limit(objPagination.limitItems)
    .skip(objPagination.skip);
  res.render("client/pages/products/products.pug", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    pagination: objPagination,
  });
};

module.exports.detail = async (req, res) => {
  const find = {
    slug: req.params.slug,
  };
  const product = await Product.findOne(find);
  const title = product.title;
  res.render("client/pages/products/detail.pug", {
    pageTitle: title,
    product: product,
  });
};

module.exports.category = async (req, res) => {
  const slug = req.params.slug;
  const category = await Categories.findOne({ slug: slug });

  res.render("client/pages/products/categories.pug", {
    pageTitle: category.title,
    category: category,
  });
};

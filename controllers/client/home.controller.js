const Categories = require("../../models/categories.model");
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await Categories.find(find);
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
  const categories = createTree(records);
  console.log(categories);
  res.render("client/pages/home/home.pug", {
    pageTitle: "Bacola - Trang chủ",
    categories: categories,
  });
};

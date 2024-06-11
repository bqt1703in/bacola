module.exports.index = (req, res) => {
  res.render("client/pages/home/home.pug", {
    pageTitle: "Bacola - Trang chủ",
  });
};

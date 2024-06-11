module.exports.dashboard = (req, res) => {
  res.render("admin/pages/dashboard/dashboard.pug", {
    pageTitle: "Trang quản trị viên",
    active: "active",
  });
};

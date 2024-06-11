module.exports = (obj, countProduct, query) => {
  if (query.page) {
    obj.currentPage = parseInt(query.page);
  }
  obj.skip = (obj.currentPage - 1) * obj.limitItems;
  obj.totalPage = Math.ceil(countProduct / obj.limitItems);
  return obj;
};

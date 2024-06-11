module.exports = (query) => {
  let objSearch = {
    keyword: "",
  };
  if (query.search) {
    objSearch.keyword = query.search;
    const regex = new RegExp(objSearch.keyword, "i");
    objSearch.regex = regex;
  }
  return objSearch;
};

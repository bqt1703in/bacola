// Xử lí phân trang
const pagination = document.querySelectorAll("[button-pagination]");
const buttonNext = document.querySelector("[button-next]");
const buttonPrevsios = document.querySelector("[button-previous]");
if (pagination) {
  let url = new URL(window.location.href);

  pagination.forEach((button) => {
    button.addEventListener("click", () => {
      let page = button.getAttribute("button-pagination");
      if (page) {
        url.searchParams.set("page", page);
      } else {
        url.searchParams.delete("page");
      }
      window.location.href = url;
    });
  });
}

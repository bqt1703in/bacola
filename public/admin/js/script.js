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

// Xử lí tìm kiếm
const formSearch = document.querySelector(".form-search");
if (formSearch) {
  let url = new URL(window.location.href);
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const keyword = e.target.elements.keyword.value;
    if (keyword) {
      url.searchParams.set("search", keyword);
    } else {
      url.searchParams.delete("search");
    }
    window.location.href = url;
  });
}

// Xử lí bộ lọc
const buttonStatus = document.querySelectorAll("[button-status]");
if (buttonStatus.length > 0) {
  let url = new URL(window.location.href);
  buttonStatus.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault;
      const status = button.getAttribute("button-status");
      if (status == "active" || status == "inactive") {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }
      window.location.href = url;
    });
  });
}

// Xử lí chọn nhiều sản phẩm
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
  const checkAll = document.querySelector("input[name='check-all']");
  const checkSingle = document.querySelectorAll("input[name='id']");
  // Xử lí chọn check-all
  checkAll.addEventListener("click", () => {
    if (checkAll.checked) {
      checkSingle.forEach((checkbox) => {
        checkbox.checked = true;
      });
    } else {
      checkSingle.forEach((checkbox) => {
        checkbox.checked = false;
      });
    }
  });
  // Xử lí chọn từng checkbox
  checkSingle.forEach((checkbox) => {
    checkbox.addEventListener("click", () => {
      const countCheckbox = document.querySelectorAll(
        "input[name='id']:checked"
      ).length;
      if (countCheckbox == checkSingle.length) {
        checkAll.checked = true;
      } else {
        checkAll.checked = false;
      }
    });
  });
}

// Xử lí thay đổi trạng thái sản phẩm
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if (buttonChangeStatus.length > 0) {
  const formChangeStatus = document.querySelector("#form-change-status");
  buttonChangeStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("data-status");
      const id = button.getAttribute("data-id");
      const statusChange = status == "active" ? "inactive" : "active";
      const action = `/admin/products/change-status/${statusChange}/${id}?_method=PATCH`;
      formChangeStatus.action = action;
      formChangeStatus.submit();
    });
  });
}

// Xủ lí nhiều sản phẩm
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();
    const checkeds = document.querySelectorAll("input[name='id']:checked");
    const typeChange = e.target.elements["type-change"].value;
    console.log(typeChange);
    if (typeChange == "delete-all") {
      const isConfirm = confirm("Bạn chắc chắn muốn xóa các sản phẩm này?");
      if (!isConfirm) {
        return;
      }
    }
    if (checkeds.length > 0) {
      let ids = [];
      checkeds.forEach((checked) => {
        let id = checked.value;
        ids.push(id);
      });
      formChangeMulti.querySelector("input[name='value-submit']").value =
        ids.join(", ");
      formChangeMulti.submit();
    } else {
      alert("Vui lòng chọn ít nhất một sản phẩm");
    }
  });
}

// Xóa một sản phẩm
const buttonDelete = document.querySelectorAll("[button-delete]");
if (buttonDelete.length > 0) {
  const formDelete = document.querySelector("#form-delete-item");
  buttonDelete.forEach((button) => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Bạn chắc chắn muốn xoá sản phẩm này");
      if (!isConfirm) {
        return;
      }
      const id = button.getAttribute("data-id");
      console.log(id);
      formDelete.action = `/admin/products/delete/${id}?_method=DELETE`;
      formDelete.submit();
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    var alertElement = document.querySelector(".alert");
    if (alertElement) {
      alertElement.classList.remove("show");
      alertElement.classList.add("hide");
      setTimeout(function () {
        alertElement.style.display = "none";
      }, 150); // Thời gian chờ để hoàn thành animation của Bootstrap
    }
  }, 3000); // Thời gian chờ 5 giây trước khi ẩn thông báo
});

// Xử lí xem trước ảnh
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
  const inputImage = uploadImage.querySelector(".input-image");
  const imagePreview = uploadImage.querySelector(".image-preview");
  const buttonDeleteImagePreview = document.querySelector(
    ".delete-image-preview"
  );
  inputImage.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      imagePreview.src = URL.createObjectURL(file);
    }
    buttonDeleteImagePreview.classList.remove("d-none");
    buttonDeleteImagePreview.classList.add("d-block");
  });

  if (buttonDeleteImagePreview) {
    buttonDeleteImagePreview.addEventListener("click", () => {
      inputImage.value = "";
      imagePreview.src = "";
      buttonDeleteImagePreview.classList.remove("d-block");
      buttonDeleteImagePreview.classList.add("d-none");
    });
  }
}

// Xử lí xóa ảnh xem trước

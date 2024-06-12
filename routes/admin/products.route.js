const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;

// const storageMulter = require("../../helpers/storageMulter");
// const upload = multer({ storage: storageMulter() });
const multer = require("multer");
const upload = multer();
const validate = require("../../validations/product.validation");
const controller = require("../../controllers/admin/products.controller");
const uploadImgToCloudMiddleware = require("../../middlewares/admin/uploadImageToCloud.middleware");

cloudinary.config({
  cloud_name: "drxbrewm7",
  api_key: "843414465798738",
  api_secret: "Hu-4A_M4lMcmBtXK8_RzLsQnU1s",
});

router.get("/", controller.index);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-multi/", controller.changeMulti);
router.delete("/delete/:id", controller.delete);
router.get("/create", controller.create);
router.post(
  "/create",
  upload.single("thumbnail"),
  validate.createPost,
  uploadImgToCloudMiddleware,
  controller.createPost
);
router.get("/edit/:id", controller.edit);
router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  validate.createPost,
  controller.editPatch
);

router.get("/detail/:id", controller.detail);
module.exports = router;

const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/categories.controller");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const upload = multer();
const validate = require("../../validations/category.validation");
const uploadImgToCloudMiddleware = require("../../middlewares/admin/uploadImageToCloud.middleware");

cloudinary.config({
  cloud_name: "drxbrewm7",
  api_key: "843414465798738",
  api_secret: "Hu-4A_M4lMcmBtXK8_RzLsQnU1s",
});
router.get("/", controller.categories);
router.get("/create", controller.create);
router.post(
  "/create",
  upload.single("thumbnail"),
  validate.createPost,
  uploadImgToCloudMiddleware,
  controller.createPost
);
module.exports = router;

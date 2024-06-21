const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;

const multer = require("multer");
const upload = multer();
const controller = require("../../controllers/admin/accounts.controller");
const uploadImgToCloudMiddleware = require("../../middlewares/admin/uploadImageToCloud.middleware");
const validate = require("../../validations/account.validation");

cloudinary.config({
  cloud_name: "drxbrewm7",
  api_key: "843414465798738",
  api_secret: "Hu-4A_M4lMcmBtXK8_RzLsQnU1s",
});

router.get("/", controller.accounts);
router.get("/create", controller.create);
router.post(
  "/create",
  upload.single("avatar"),
  validate.createPost,
  uploadImgToCloudMiddleware,
  controller.createPost
);
router.get("/edit/:id", controller.edit);
router.patch(
  "/edit/:id",
  upload.single("avatar"),
  validate.editPost,
  uploadImgToCloudMiddleware,
  controller.editPatch
);
module.exports = router;

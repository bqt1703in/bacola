const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/my-account.controller");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const upload = multer();
const uploadImgToCloudMiddleware = require("../../middlewares/admin/uploadImageToCloud.middleware");

cloudinary.config({
  cloud_name: "drxbrewm7",
  api_key: "843414465798738",
  api_secret: "Hu-4A_M4lMcmBtXK8_RzLsQnU1s",
});

router.get("/", controller.myAccount);
router.get("/edit", controller.edit);
router.patch(
  "/edit",
  upload.single("avatar"),
  uploadImgToCloudMiddleware,
  controller.editPatch
);
module.exports = router;

const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/roles.controller.js");
router.get("/", controller.roles);
router.get("/create", controller.create);
router.post("/create", controller.createPost);
router.get("/edit/:id", controller.edit);
router.patch("/edit/:id", controller.editPatch);
module.exports = router;

const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/auth.controller.js");
const validate = require("../../validations/auth.validation.js");
router.get("/login", controller.login);
router.post("/login", validate.login, controller.loginPost);
router.get("/logout", controller.logout);
module.exports = router;

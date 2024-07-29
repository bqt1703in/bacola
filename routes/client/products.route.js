const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/products.controller");

router.get("/products", controller.index);
router.get("/products/:slug", controller.detail);
router.get("/products/category/:slug", controller.category);

module.exports = router;

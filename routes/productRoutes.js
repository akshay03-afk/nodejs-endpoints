const express = require("express");
const router = express.Router();

const { createProduct , getProducts, getProduct} = require("../controllers/productController");

//middleware
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/authMiddleware");

router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRoles("admin"), createProduct)
router.route("/products").get(getProducts);
router.route("/product/:id").get(getProduct);

module.exports = router;
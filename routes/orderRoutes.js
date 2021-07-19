const express = require("express");
const router = express.Router();

const { newOrder, getSingleOrder, getMyOrders, allOrders } = require("../controllers/orderController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/authMiddleware");

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders/myorders").get(isAuthenticatedUser, getMyOrders);
router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), allOrders)

module.exports = router;
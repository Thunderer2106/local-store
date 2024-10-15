const express = require("express");
const {
  getOrders,
  transfertoOrders,
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", protect, transfertoOrders);
router.get("/getOrders", protect, getOrders);

module.exports = router;

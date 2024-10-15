const express = require("express");
const {
  addItemToCart,
  getCartItems,
  removeCartItems,
  modifyCartItems
} = require('../controllers/cartController');


const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post( "/", protect,addItemToCart);
router.get("/getCartItems", protect, getCartItems);
router.put("/user/removeItem",protect,removeCartItems);
router.post("/modifyCart",protect,modifyCartItems);

module.exports = router;

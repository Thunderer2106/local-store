const express = require("express");
const router = express.Router();
const {
  addProduct,
  getProducts,
  getAllProducts,
  filterByCat,
  getProductById,
  getProductsHome,
} = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");
const { upload } = require("../utils/fileUpload");

router.post("/", upload.single("image"), protect, addProduct);
router.get("/getpro", getProducts);
router.get("/getAll", getAllProducts);
router.get("/cat", filterByCat);
router.get("/getid/:id", getProductById);
router.get("/gethomesearch", getProductsHome);

module.exports = router;

const express = require("express");
const router = express.Router();

const productController = require("../Controller/productController");

// CSV Import
router.post("/import", productController.csvImporting);

// Create Product
router.post("/create", productController.createProduct);

// Edit Product
router.put("/edit", productController.editProduct);

// Get all products
router.get("/all", productController.getAllProducts);

// Get all products as CSV
router.get("/export", productController.getCSVProducts);

// Pagination products
router.post("/list", productController.getProducts);

// Delete product
router.delete("/delete", productController.deleteProduct);

router.get("/number_of_products",productController.getNumberOfProducts)

module.exports = router;

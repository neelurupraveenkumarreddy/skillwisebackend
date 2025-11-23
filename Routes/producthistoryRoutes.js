const express = require("express");
const router = express.Router();

const productHistoryController = require("../Controller/producthistoryController");

// Get ALL product history
router.get("/all", productHistoryController.getAllhistory);

// Get history for a specific product
router.get("/:id", productHistoryController.getHistory);

module.exports = router;
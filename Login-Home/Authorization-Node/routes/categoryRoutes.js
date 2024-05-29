const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const { authenticateToken } = require("../middlewares/authMiddleware");

// Load initial data from JSON file
const initialData = require("../initialData.json");

router.get("/loadData", authenticateToken, categoryController.loadData);

router.get("/", authenticateToken, categoryController.getAllCategories);

router.post("/add", authenticateToken, categoryController.addCategory);

router.post(
  "/update/:id",
  authenticateToken,
  categoryController.updateCategory
);

router.post(
  "/delete/:id",
  authenticateToken,
  categoryController.deleteCategory
);

module.exports = router;

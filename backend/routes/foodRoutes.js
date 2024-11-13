const express = require("express");
const router = express.Router();
const foodController = require("../controllers/foodController");

// Create a new meal
router.post("/", foodController.createMeal);

// Get all meals
router.get("/", foodController.getAllMeals);

// Get a single meal by ID
router.get("/:id", foodController.getMealById);

// Update a meal by ID
router.put("/:id", foodController.updateMeal);

// Delete a meal by ID
router.delete("/:id", foodController.deleteMeal);

module.exports = router;

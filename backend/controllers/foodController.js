const Meal = require("../models/meal"); // Import the Meal model

// Create a new meal (food item)
const createMeal = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      ingredients,
      price,
      caloric,
      protein,
      carbs,
      fats,
      allergens,
      image,
      available,
    } = req.body;

    // Ensure image is a string or set it to an empty string if invalid
    const imageUrl = typeof image === "string" ? image : "";

    // Create the new meal
    const newMeal = new Meal({
      name,
      description,
      category,
      ingredients,
      price,
      caloric,
      protein,
      carbs,
      fats,
      allergens,
      image: imageUrl,
      available: available || false,
    });

    await newMeal.save();
    res.status(201).json(newMeal);
  } catch (err) {
    console.error("Error creating meal:", err);
    res
      .status(500)
      .json({ message: "Error creating meal", error: err.message });
  }
};

// Get all meals
const getAllMeals = async (req, res) => {
  try {
    const meals = await Meal.find();
    res.status(200).json(meals);
  } catch (err) {
    console.error("Error fetching meals:", err);
    res
      .status(500)
      .json({ message: "Error fetching meals", error: err.message });
  }
};

// Get a single meal by ID
const getMealById = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }
    res.status(200).json(meal);
  } catch (err) {
    console.error("Error fetching meal:", err);
    res
      .status(500)
      .json({ message: "Error fetching meal", error: err.message });
  }
};

// Update a meal by ID
const updateMeal = async (req, res) => {
  try {
    const updatedMeal = await Meal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedMeal) {
      return res.status(404).json({ message: "Meal not found" });
    }
    res.status(200).json(updatedMeal);
  } catch (err) {
    console.error("Error updating meal:", err);
    res
      .status(500)
      .json({ message: "Error updating meal", error: err.message });
  }
};

// Delete a meal by ID
const deleteMeal = async (req, res) => {
  try {
    const deletedMeal = await Meal.findByIdAndDelete(req.params.id);
    if (!deletedMeal) {
      return res.status(404).json({ message: "Meal not found" });
    }
    res.status(200).json({ message: "Meal deleted successfully" });
  } catch (err) {
    console.error("Error deleting meal:", err);
    res
      .status(500)
      .json({ message: "Error deleting meal", error: err.message });
  }
};

module.exports = {
  createMeal,
  getAllMeals,
  getMealById,
  updateMeal,
  deleteMeal,
};

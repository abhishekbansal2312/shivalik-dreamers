const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: [String], // Categories as an array of strings, admin can add categories
    default: [],
  },
  ingredients: {
    type: [String], // Ingredients as an array of strings, admin will add ingredient names
    default: [],
  },
  price: {
    type: Number,
    required: true,
  },
  caloric: {
    type: Number, // Total calorie count for the entire meal
    required: true,
  },
  protein: {
    type: Number, // Protein content in grams
    required: true,
  },
  carbs: {
    type: Number, // Carbohydrate content in grams
    required: true,
  },
  fats: {
    type: Number, // Fat content in grams
    required: true,
  },
  allergens: {
    type: [String], // List of allergens for the meal
    default: [],
  },
  image: {
    type: String, // URL to the meal image
  },
  available: {
    type: Boolean,
    default: true, // Whether the meal is available for ordering
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Meal model
const Meal = mongoose.model("Meal", MealSchema);

module.exports = Meal;

import React, { useState } from "react";
import {
  FaUtensils,
  FaLeaf,
  FaFire,
  FaEgg,
  FaCarrot,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
  FaDollarSign,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import Modal from "../Modal"; // Assuming Modal component is imported
import UpdateMealForm from "./UpdateMealForm"; // Assuming UpdateMealForm component is imported

const MealCard = ({ meal, isAdmin, onEdit, onDelete, darkMode }) => {
  const [isOpen, setIsOpen] = useState({
    mealDetails: false, // Added state for meal details dropdown
    availability: false,
  });
  const [showEditMeal, setShowEditMeal] = useState(false); // State for handling the modal visibility
  const [editingMeal, setEditingMeal] = useState(null); // State for the meal being edited

  const mealImage = meal.image || "https://via.placeholder.com/150";
  const mealName = meal.name || "Unnamed Meal";

  const toggleSection = (section) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const handleEditMeal = (meal) => {
    setEditingMeal(meal);
    setShowEditMeal(true); // Show the modal when "Edit" is clicked
  };

  return (
    <div
      className={`border p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col ${
        darkMode
          ? "bg-gray-800 text-white border-gray-600"
          : "bg-white text-black border-gray-300"
      }`}
    >
      <img
        src={mealImage}
        alt={`Image of ${mealName}`}
        className="w-full h-48 object-cover rounded-t-lg mb-4"
      />
      <h2 className="text-2xl font-semibold">{mealName}</h2>
      <p className="text-sm mt-2">{meal.description}</p>

      <div className="flex items-center text-gray-600 mt-3">
        <FaUtensils className="mr-2 text-gray-500" />
        <span className="text-sm">Category: {meal.category}</span>
      </div>

      {/* Meal Details Dropdown */}
      <ul className="mt-4 space-y-3">
        <li
          className="flex items-center cursor-pointer"
          onClick={() => toggleSection("mealDetails")}
        >
          <FaLeaf className="mr-2 text-green-600" />
          <span className="text-sm font-medium">Meal Details</span>
          {isOpen.mealDetails ? (
            <FaChevronUp className="ml-2" />
          ) : (
            <FaChevronDown className="ml-2" />
          )}
        </li>
        {isOpen.mealDetails && (
          <div className="ml-6 space-y-2 text-sm">
            {/* Ingredients */}
            <div>
              <span className="font-medium">Ingredients:</span>
              <span>{meal.ingredients.join(", ")}</span>
            </div>

            {/* Calories */}
            <div>
              <span className="font-medium">Calories:</span>
              <span>{meal.caloric} kcal</span>
            </div>

            {/* Protein */}
            <div>
              <span className="font-medium">Protein:</span>
              <span>{meal.protein} g</span>
            </div>

            {/* Carbohydrates */}
            <div>
              <span className="font-medium">Carbohydrates:</span>
              <span>{meal.carbs} g</span>
            </div>

            {/* Allergens */}
            <div>
              <span className="font-medium">Allergens:</span>
              <span>
                {meal.allergens.length ? meal.allergens.join(", ") : "None"}
              </span>
            </div>
          </div>
        )}

        {/* Availability */}
        <li className="flex items-center">
          {meal.available ? (
            <FaCheckCircle className="text-green-500 mr-2" />
          ) : (
            <FaTimesCircle className="text-red-500 mr-2" />
          )}
          <span className="text-sm font-medium">Availability</span>
          <span className="ml-2 text-sm">
            {meal.available ? "Available" : "Not Available"}
          </span>
        </li>
      </ul>

      {/* Price */}
      <div className="flex items-center text-lg font-bold mt-4">
        <span>₹{meal.price.toFixed(2)}</span>
      </div>

      {/* Admin Controls */}
      {isAdmin && (
        <div className="flex mt-4 space-x-4">
          {/* Update Meal Button */}
          <button
            onClick={() => handleEditMeal(meal)} // Open the modal for the selected meal
            className="text-yellow-500 hover:bg-yellow-500 hover:text-white py-2 px-4 rounded-md text-sm transition-all duration-200 ease-in-out"
          >
            Update Meal
          </button>
          <button
            onClick={() => onDelete(meal._id)}
            className="text-red-500 hover:bg-red-500 hover:text-white py-2 px-4 rounded-md text-sm transition-all duration-200 ease-in-out"
          >
            Delete
          </button>
        </div>
      )}

      {/* Modal for editing the meal */}
      {showEditMeal && (
        <Modal
          isOpen={showEditMeal}
          title={"Edit Meal"}
          onClose={() => setShowEditMeal(false)} // Close the modal
        >
          <UpdateMealForm
            meal={editingMeal}
            onCancel={() => setShowEditMeal(false)} // Close modal on cancel
            setMeals={onEdit} // Assume onEdit updates the meals
            darkMode={darkMode}
          />
        </Modal>
      )}
    </div>
  );
};

export default MealCard;

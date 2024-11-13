// MealCard.js
import React from "react";
import { Link } from "react-router-dom";

const MealCard = ({ meal, isAdmin, onEdit, onDelete }) => {
  const mealImage = meal.image || "https://via.placeholder.com/150";
  const mealName = meal.name || "Unnamed Meal";

  return (
    <div className="border p-4 rounded shadow-md">
      <img
        src={mealImage}
        alt={`Image of ${mealName}`}
        className="w-full h-48 object-cover rounded"
      />
      <h2 className="text-xl mt-2 font-semibold">{mealName}</h2>
      <p className="text-sm mt-1">{meal.description}</p>
      <p className="text-lg font-bold mt-2">${meal.price.toFixed(2)}</p>

      <Link
        to={`/meals/${meal._id}`}
        className="text-blue-500 hover:underline mt-2 block"
      >
        View Details
      </Link>

      {isAdmin && (
        <div className="flex mt-2">
          <button
            onClick={() => onEdit(meal)}
            className="text-yellow-500 hover:underline mr-4"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(meal._id)}
            className="text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default MealCard;

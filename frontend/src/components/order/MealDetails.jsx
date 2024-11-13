import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import mealsData from "./sampleData.json";
import { useAuth } from "../../provider/AuthProvider"; // Import useAuth to check user role

const MealDetails = ({ darkMode }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [meal, setMeal] = useState(null);
    const { user } = useAuth(); // Get the user object from the context

    useEffect(() => {
        // Find the meal by ID from the JSON data
        const selectedMeal = mealsData.find((meal) => meal._id === id);
        setMeal(selectedMeal);
    }, [id]);

    const handleDelete = () => {
        // Filter out the meal from mealsData to simulate the deletion
        const updatedMeals = mealsData.filter((meal) => meal._id !== id);

        // Simulate successful deletion and redirect back to the meals list
        alert("Meal deleted");
        navigate("/menu");
    };

    const handleEdit = () => {
        // Navigate to the edit page for this meal
        navigate(`/menu/edit/${id}`);
    };

    if (!meal) return <p>Loading...</p>;

    return (
        <div
            className={`p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
        >
            <img src={meal.image} alt={meal.name} className="w-full h-64 object-cover rounded mb-4" />
            <h1 className="text-3xl">{meal.name}</h1>
            <p className="text-lg">{meal.description}</p>
            <div className="mt-4">
                <h2 className="text-xl">Ingredients:</h2>
                <ul>
                    {meal.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
            </div>
            <div className="mt-4">
                <h2 className="text-xl">Nutrition:</h2>
                <p>Calories: {meal.caloric} kcal</p>
                <p>Protein: {meal.protein} g</p>
                <p>Carbs: {meal.carbs} g</p>
                <p>Fats: {meal.fats} g</p>
            </div>
            {/* Show buttons only for admin or member roles */}
            {user && (user.role === "admin" || user.role === "member") && (
                <div className="mt-4">
                    <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
                        Delete Meal
                    </button>
                    <button onClick={handleEdit} className="bg-blue-500 text-white px-4 py-2 rounded ml-2">
                        Edit Meal
                    </button>
                </div>
            )}
        </div>
    );
};

export default MealDetails;

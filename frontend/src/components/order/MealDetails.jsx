import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import mealsData from './sampleData.json';

const MealDetails = ({ darkMode }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [meal, setMeal] = useState(null);

    useEffect(() => {
        // Find the meal by ID from the JSON data
        const selectedMeal = mealsData.find((meal) => meal._id === id);
        setMeal(selectedMeal);
    }, [id]);

    const handleDelete = () => {
        // Simulate delete and navigate back
        alert('Meal deleted');
        navigate('/meals');
    };

    if (!meal) return <p>Loading...</p>;

    return (
        <div className={`p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
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
            <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded mt-4">Delete Meal</button>
            <Link to={`/meals/edit/${meal._id}`} className="bg-blue-500 text-white px-4 py-2 rounded mt-4 ml-2">Edit Meal</Link>
        </div>
    );
};

export default MealDetails;

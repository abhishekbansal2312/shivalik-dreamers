import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import mealsData from './sampleData.json';
import { useAuth } from '../../provider/AuthProvider'; // Assuming you have an AuthContext for user info

const MealsList = ({ darkMode }) => {
    const [meals, setMeals] = useState([]);
    const { user } = useAuth(); // Access the logged-in user from context

    useEffect(() => {
        // Set the imported JSON data as the initial state
        setMeals(mealsData);
    }, []);

    // Check if the user is either an admin or cafeteria member
    const canAddMeal = user && (user.role === 'admin' || user.role === 'member');

    return (
        <div className={`p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            <h1 className="text-2xl mb-4">Meals</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {meals.map((meal) => (
                    <div key={meal._id} className="border p-4 rounded shadow-md">
                        <img src={meal.image} alt={meal.name} className="w-full h-48 object-cover rounded" />
                        <h2 className="text-xl mt-2">{meal.name}</h2>
                        <p className="text-sm">{meal.description}</p>
                        <p className="text-lg font-bold mt-2">${meal.price}</p>
                        <Link to={`/menu/${meal._id}`} className="text-blue-500 hover:underline mt-2 block">View Details</Link>
                    </div>
                ))}
            </div>

            {canAddMeal && (
                <Link to="/menu/add" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
                    Add New Meal
                </Link>
            )}
        </div>
    );
};

export default MealsList;

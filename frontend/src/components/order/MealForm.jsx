import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import mealsData from './sampleData.json';

const MealForm = ({ darkMode }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [meal, setMeal] = useState({
        name: '', description: '', category: [], ingredients: [], price: 0, caloric: 0, protein: 0, carbs: 0, fats: 0, allergens: [], image: '', available: true
    });

    useEffect(() => {
        if (id) {
            // Find the meal by ID from the local JSON data
            const existingMeal = mealsData.find((meal) => meal._id === id);
            if (existingMeal) {
                setMeal(existingMeal);
            }
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMeal({ ...meal, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (id) {
            // Simulate updating the meal
            console.log("Meal updated:", meal);
        } else {
            // Simulate adding a new meal
            console.log("New meal added:", meal);
        }
        
        // Navigate back to meals list
        navigate('/meals');
    };

    return (
        <div className={`p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            <h1 className="text-2xl mb-4">{id ? 'Edit Meal' : 'Add New Meal'}</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={meal.name} onChange={handleChange} placeholder="Name" className="w-full mb-2" />
                <textarea name="description" value={meal.description} onChange={handleChange} placeholder="Description" className="w-full mb-2" />
                <input type="number" name="price" value={meal.price} onChange={handleChange} placeholder="Price" className="w-full mb-2" />
                {/* Add more inputs for other fields */}
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{id ? 'Update Meal' : 'Add Meal'}</button>
            </form>
        </div>
    );
};

export default MealForm;

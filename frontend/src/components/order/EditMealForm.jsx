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

    const handleArrayChange = (e, field) => {
        const { value } = e.target;
        setMeal(prevMeal => ({
            ...prevMeal,
            [field]: value.split(',').map(item => item.trim())
        }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setMeal({ ...meal, [name]: checked });
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

        // Navigate back to menu list
        navigate('/menu');
    };

    return (
        <div className={`p-8 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            <h1 className="text-3xl font-bold mb-6">{id ? 'Edit Meal' : 'Add New Meal'}</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block font-medium mb-2">Meal Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={meal.name} 
                        onChange={handleChange} 
                        placeholder="Enter meal name" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-2">Description</label>
                    <textarea 
                        name="description" 
                        value={meal.description} 
                        onChange={handleChange} 
                        placeholder="Enter meal description" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-2">Categories (Comma Separated)</label>
                    <input 
                        type="text" 
                        name="category" 
                        value={meal.category.join(', ')} 
                        onChange={(e) => handleArrayChange(e, 'category')} 
                        placeholder="e.g. Vegan, Gluten-Free" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-2">Ingredients (Comma Separated)</label>
                    <input 
                        type="text" 
                        name="ingredients" 
                        value={meal.ingredients.join(', ')} 
                        onChange={(e) => handleArrayChange(e, 'ingredients')} 
                        placeholder="e.g. Tomato, Lettuce, Chicken" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block font-medium mb-2">Price</label>
                        <input 
                            type="number" 
                            name="price" 
                            value={meal.price} 
                            onChange={handleChange} 
                            placeholder="Price in USD" 
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-2">Calories</label>
                        <input 
                            type="number" 
                            name="caloric" 
                            value={meal.caloric} 
                            onChange={handleChange} 
                            placeholder="Total Calories" 
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block font-medium mb-2">Protein (g)</label>
                        <input 
                            type="number" 
                            name="protein" 
                            value={meal.protein} 
                            onChange={handleChange} 
                            placeholder="Protein in grams" 
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-2">Carbs (g)</label>
                        <input 
                            type="number" 
                            name="carbs" 
                            value={meal.carbs} 
                            onChange={handleChange} 
                            placeholder="Carbohydrates in grams" 
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block font-medium mb-2">Fats (g)</label>
                        <input 
                            type="number" 
                            name="fats" 
                            value={meal.fats} 
                            onChange={handleChange} 
                            placeholder="Fats in grams" 
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-2">Allergens (Comma Separated)</label>
                        <input 
                            type="text" 
                            name="allergens" 
                            value={meal.allergens.join(', ')} 
                            onChange={(e) => handleArrayChange(e, 'allergens')} 
                            placeholder="e.g. Nuts, Dairy" 
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block font-medium mb-2">Image URL</label>
                    <input 
                        type="text" 
                        name="image" 
                        value={meal.image} 
                        onChange={handleChange} 
                        placeholder="Enter image URL" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex items-center mb-6">
                    <input 
                        type="checkbox" 
                        name="available" 
                        checked={meal.available} 
                        onChange={handleCheckboxChange} 
                        className="mr-2"
                    />
                    <label className="font-medium">Available for Order</label>
                </div>

                <button 
                    type="submit" 
                    className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {id ? 'Update Meal' : 'Add Meal'}
                </button>
            </form>
        </div>
    );
};

export default MealForm;

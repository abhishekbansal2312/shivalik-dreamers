// src/components/HomePage.jsx
import React from 'react';

const foodItems = [
  { id: 1, name: 'Veg Biryani', image: 'https://via.placeholder.com/400x300.png?text=Veg+Biryani' },
  { id: 2, name: 'Chicken Curry', image: 'https://via.placeholder.com/400x300.png?text=Chicken+Curry' },
  { id: 3, name: 'Paneer Tikka', image: 'https://via.placeholder.com/400x300.png?text=Paneer+Tikka' },
  { id: 4, name: 'Dal Tadka', image: 'https://via.placeholder.com/400x300.png?text=Dal+Tadka' },
];

const HomePage = ({ darkMode }) => {
  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} font-sans`}>

      {/* Full-Screen Image Banner */}
      <div className="relative w-full h-screen">
        <img
          src="https://via.placeholder.com/1500x800.png?text=Hostel+Cafeteria"
          alt="Hostel Cafeteria Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white">
          <h1 className="text-5xl font-bold">Welcome to the Hostel Cafeteria</h1>
        </div>
      </div>

      {/* Interactive Section */}
      <section className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} p-10`}>
        <h2 className="text-3xl text-center font-semibold mb-6">Order Your Favorite Meal</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {foodItems.map((food) => (
            <div
              key={food.id}
              className={`${darkMode ? 'bg-gray-700' : 'bg-white'} relative rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300`}
            >
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold">{food.name}</h3>
                <button className={`${darkMode ? 'bg-green-600' : 'bg-green-500'} mt-2 px-4 py-2 text-white rounded-md hover:bg-green-700`}>
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default HomePage;

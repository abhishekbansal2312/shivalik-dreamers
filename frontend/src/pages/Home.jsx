// src/components/HomePage.jsx
import React from 'react';

const foodItems = [
  { id: 1, name: 'Veg Biryani', image: 'https://via.placeholder.com/400x300.png?text=Veg+Biryani', category: 'Main Course' },
  { id: 2, name: 'Chicken Curry', image: 'https://via.placeholder.com/400x300.png?text=Chicken+Curry', category: 'Main Course' },
  { id: 3, name: 'Paneer Tikka', image: 'https://via.placeholder.com/400x300.png?text=Paneer+Tikka', category: 'Appetizers' },
  { id: 4, name: 'Dal Tadka', image: 'https://via.placeholder.com/400x300.png?text=Dal+Tadka', category: 'Main Course' },
  { id: 5, name: 'Chocolate Cake', image: 'https://via.placeholder.com/400x300.png?text=Chocolate+Cake', category: 'Desserts' },
  { id: 6, name: 'Ice Cream', image: 'https://via.placeholder.com/400x300.png?text=Ice+Cream', category: 'Desserts' },
  { id: 7, name: 'Spring Rolls', image: 'https://via.placeholder.com/400x300.png?text=Spring+Rolls', category: 'Appetizers' },
  { id: 8, name: 'Mango Lassi', image: 'https://via.placeholder.com/400x300.png?text=Mango+Lassi', category: 'Beverages' },
  // ... Add more items as needed
];

const categories = [
  { name: 'Main Course', icon: '🍛' },
  { name: 'Appetizers', icon: '🍢' },
  { name: 'Desserts', icon: '🍰' },
  { name: 'Beverages', icon: '🥤' },
];

const HomePage = ({ darkMode }) => {
  // Function to filter top 4 items from each category
  const getTopItemsByCategory = (category) => {
    return foodItems.filter((item) => item.category === category).slice(0, 4);
  };

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

      {/* What Would You Like Section */}
      <section className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} p-10`}>
        <h2 className="text-3xl text-center font-semibold mb-6">What Would You Like?</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className={`${darkMode ? 'bg-gray-700' : 'bg-white'} flex flex-col items-center p-6 rounded-lg shadow-lg text-center hover:scale-105 transform transition-all duration-300`}
            >
              <span className="text-5xl mb-4">{category.icon}</span>
              <h3 className="text-xl font-semibold">{category.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Category Top 4 Options + View More */}
      <section className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} p-10`}>
        {categories.map((category) => (
          <div key={category.name} className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold">{category.name}</h3>
              <button className="text-blue-500 hover:underline">View More</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {getTopItemsByCategory(category.name).map((food) => (
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
          </div>
        ))}
      </section>
    </div>
  );
};

export default HomePage;

// src/components/ExploreMenu.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ExploreMenu = ({ darkMode }) => {
    const navigate = useNavigate();

    return (
        <div
            className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}
                relative overflow-hidden flex flex-col items-center p-12 rounded-lg shadow-md transition-all duration-300`}
        >
            {/* Animated Background Circles */}
            <motion.div
                className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500 opacity-40 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.1, 0.4] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-300 opacity-40 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.1, 0.4] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Title */}
            <motion.h2
                className="text-4xl font-bold mb-6 relative z-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.05, color: "#4299E1" }}
            >
                Discover Our Menu
            </motion.h2>

            {/* Description */}
            <motion.p
                className="text-lg mb-8 text-center max-w-md relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.02, color: "#2B6CB0" }}
            >
                Browse through a variety of delicious options, from appetizers to desserts. Find your next favorite meal here!
            </motion.p>

            {/* Button */}
            <motion.button
                onClick={() => navigate('/meals')}
                className="px-8 py-3 font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg shadow-lg
                    hover:bg-gradient-to-r hover:from-indigo-500 hover:to-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 relative z-10"
                whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px rgba(66, 153, 225, 0.6)" }}
                whileTap={{ scale: 0.95 }}
            >
                Explore the Menu
            </motion.button>
        </div>
    );
};

export default ExploreMenu;

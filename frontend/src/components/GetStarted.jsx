// src/components/GetStarted.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const GetStarted = ({ darkMode }) => {
    const navigate = useNavigate();
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
                } flex flex-col items-center justify-center h-screen p-6 relative`}
        >
            {/* Background Animations */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute w-72 h-72 bg-blue-400 rounded-full opacity-30"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0.5, 0.3],
                        x: ["-50%", "50%", "-50%"],
                        y: ["-50%", "50%", "-50%"]
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute w-48 h-48 bg-purple-500 rounded-full opacity-30"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                        x: ["50%", "-50%", "50%"],
                        y: ["50%", "-50%", "50%"]
                    }}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            <motion.h1
                className="text-3xl font-bold mb-4 relative z-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
            >
                Welcome to Our Platform!
            </motion.h1>

            <motion.p
                className="text-lg mb-8 relative z-10 text-center max-w-xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
            >
                Join us to explore new features and improve your experience. Get started now by logging in!
            </motion.p>

            <motion.button
                onClick={() => navigate('/login')}
                className="px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200 relative z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                animate={{
                    boxShadow: hovered
                        ? '0px 0px 20px rgba(59, 130, 246, 0.5)'
                        : '0px 0px 10px rgba(59, 130, 246, 0.3)',
                }}
            >
                Get Started
            </motion.button>
        </div>
    );
};

export default GetStarted;

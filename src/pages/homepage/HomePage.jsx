// import React from 'react'
// import Navbar from '../../components/navbar/Navbar'


// function HomePage() {
//   return (
//     <Navbar/>
    
      
       
//   )
// }

// export default HomePage


// src/HomePage.js
import React from 'react';
import Navbar from '../../components/navbar/Navbar'
import { motion } from 'framer-motion';

const HomePage = () => {
    return (
      <>
      <Navbar/>
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex flex-col items-center justify-center">
            <motion.div 
                className="text-center p-10 bg-white rounded-lg shadow-lg"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.h1 
                    className="text-4xl font-bold mb-4"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    Welcome to Lensify
                </motion.h1>
                <motion.p 
                    className="text-lg mb-6"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    Your one-stop shop for power glasses and sunglasses.
                </motion.p>
                <motion.button
                    className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    Shop Now
                </motion.button>
            </motion.div>

            <motion.div 
                className="mt-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <img src="https://via.placeholder.com/500" alt="Power Glasses" className="rounded-lg shadow-lg" />
            </motion.div>
        </div>
        </>
    );
};

export default HomePage;




import React from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../../assets/images/registerui2.jpg'; 
import logo from '../../assets/images/applogo.png'; 
import './Onboarding.css'; 


const Onboarding = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <>
      <div className="relative flex h-screen bg-gray-900 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed animate-bg-motion"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="relative flex-1 flex items-center justify-center bg-white bg-opacity-75 p-10">
        <div className="text-center text-black">
          <img src={logo} alt="Lensify Logo" className="w-24 mx-auto mb-4" />
          <h1 className="text-5xl font-bold mb-4">Welcome to Lensify</h1>
          <p className="text-lg mb-6">Your one-stop shop for power glasses and sunglasses.</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleLogin}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:scale-105 rounded-lg text-white font-semibold transition-transform duration-300"
            >
              Login
            </button>
            <button
              onClick={handleRegister}
              className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-700 hover:scale-105 rounded-lg text-white font-semibold transition-transform duration-300"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Onboarding;



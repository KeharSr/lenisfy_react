


import React, { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`h-screen bg-white shadow-md flex flex-col ${isOpen ? 'w-64' : 'w-20'} transition-width duration-300`}>
      <div className="p-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="material-icons text-green-500 text-3xl">remove_red_eye</span>
          {isOpen && <h1 className="text-2xl font-bold text-green-500 ml-2">Lensify</h1>}
        </div>
        <button onClick={toggleSidebar} className="focus:outline-none">
          <span className="material-icons">{isOpen ? 'chevron_left' : 'chevron_right'}</span>
        </button>
      </div>
      <ul className="flex-grow">
        <li className="p-4 hover:bg-gray-200 cursor-pointer flex items-center">
          <span className="material-icons text-red-500">home</span>
          {isOpen && <span className="ml-4">Home</span>}
        </li>
        <li className="p-4 hover:bg-gray-200 cursor-pointer flex items-center">
          <span className="material-icons text-red-500">explore</span>
          {isOpen && <span className="ml-4">Explore</span>}
        </li>
        <li className="p-4 hover:bg-gray-200 cursor-pointer flex items-center">
          <span className="material-icons text-red-500">favorite</span>
          {isOpen && <span className="ml-4">Saved</span>}
        </li>
        <li className="p-4 hover:bg-gray-200 cursor-pointer flex items-center">
          <span className="material-icons text-red-500">shopping_cart</span>
          {isOpen && <span className="ml-4">Cart</span>}
        </li>
        <li className="p-4 hover:bg-gray-200 cursor-pointer flex items-center">
          <span className="material-icons text-red-500">person</span>
          {isOpen && <span className="ml-4">Profile</span>}
        </li>
        <li className="p-4 hover:bg-gray-200 cursor-pointer flex items-center">
          <span className="material-icons text-red-500">contact_mail</span>
          {isOpen && <span className="ml-4">Contact Us</span>}
        </li>
        <li className="p-4 hover:bg-gray-200 cursor-pointer flex items-center">
          <span className="material-icons text-red-500">settings</span>
          {isOpen && <span className="ml-4">Settings</span>}
        </li>
      </ul>
      <div className="p-4 bg-blue-100 text-center cursor-pointer">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-full w-full flex items-center justify-center">
          <span className="material-icons">add_circle</span>
          {isOpen && <span className="ml-2">Add Precautions</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

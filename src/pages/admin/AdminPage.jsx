import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { FaPlus, FaList, FaShoppingCart } from 'react-icons/fa'; // Importing icons from react-icons
import logo from '../../assets/images/applogo.png';
import profilePic from '../../assets/images/profile.png';
import bannerImage from '../../assets/images/AdminImage.jpg';

const AdminPage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <header className="flex justify-between items-center p-4 bg-white shadow-md">
        <div className="flex items-center">
          <img src={logo} alt="Lensify Logo" className="w-12 h-12 mr-2" />
        </div>
        <div className="text-2xl font-bold text-red-600">
          Lensify Admin Panel
        </div>
        <div className="relative">
          <img
            src={profilePic}
            alt="Profile"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={toggleDropdown}
          />
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
              <a
                href="#updateProfile"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Update Profile
              </a>
              <a
                href="#logout"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </header>
      {/* Buttons between navbar and image */}
      <div className="flex justify-center gap-4 mt-8">
        <Link to="/add-product" className="bg-red-600 text-white py-2 px-4 rounded-full flex items-center">
          <FaPlus className="mr-2" /> Add Product
        </Link>
        <Link to="/list-product" className="bg-red-600 text-white py-2 px-4 rounded-full flex items-center">
          <FaList className="mr-2" /> List Product
        </Link>
        <Link to="/orders" className="bg-red-600 text-white py-2 px-4 rounded-full flex items-center">
          <FaShoppingCart className="mr-2" /> Orders
        </Link>
      </div>
      {/* Image below the buttons */}
      <div className="flex-grow flex items-center justify-center mt-8">
        <img src={bannerImage} alt="Banner" className="w-3/4 h-96 object-contain rounded-lg shadow-md" />
      </div>
      {/* Main content of the admin panel can go here */}
    </div>
  );
};

export default AdminPage;

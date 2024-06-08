import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FaShoppingCart } from 'react-icons/fa';
import logo from '../../assets/images/applogo.png';
import profilePic from '../../assets/images/profile.png';
import bannerImage from '../../assets/images/AdminImage.jpg';
import AddProduct from './AddProduct';

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
      <Tabs className="flex-grow">
        <TabList className="flex justify-around bg-gray-200 p-4 gap-4">
          <Tab className="bg-red-600 text-white py-2 px-4 rounded-full flex items-center" selectedClassName="bg-gray-600">
            <FaShoppingCart className="mr-2" /> Add-Product
          </Tab>
          <Tab className="bg-red-600 text-white py-2 px-4 rounded-full flex items-center" selectedClassName="bg-gray-600">
            View-Products
          </Tab>
          <Tab className="bg-red-600 text-white py-2 px-4 rounded-full flex items-center" selectedClassName="bg-gray-600">
            Order-Details
          </Tab>
        </TabList>
        <TabPanel>
          <AddProduct />
        </TabPanel>
        <TabPanel>
         
          <div className="text-center mt-8">
            <h1>View-Products Content</h1>
          </div>
        </TabPanel>
        <TabPanel>
          
          <div className="text-center mt-8">
            <h1>Order-Details Content</h1>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default AdminPage;

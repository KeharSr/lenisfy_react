
import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FaShoppingCart, FaList, FaClipboardList, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import AddProduct from './AddProduct';
import ViewProduct from './ViewProduct';
import ViewOrder from './ViewOrder';
import logo from '../../assets/images/applogo.png';

const AdminPage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen flex flex-col">
      <header className="flex justify-between items-center p-4 bg-white shadow-lg">
        <div className="flex items-center">
          <img src={logo} alt="Lensify Logo" className="w-12 h-12 mr-2 rounded-full" />
          <span className="text-2xl font-bold text-red-600">Lensify</span>
        </div>
        <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-purple-600">
          Admin Panel
        </div>
        <div className="relative">
          <motion.img
            src="/api/placeholder/40/40"
            alt="Profile"
            className="w-10 h-10 rounded-full cursor-pointer border-2 border-red-600"
            onClick={toggleDropdown}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          />
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-10"
              >
                <a
                  href="#updateProfile"
                  className="block px-4 py-2 text-gray-800 hover:bg-red-100 rounded-t-lg flex items-center"
                >
                  <FaUserCircle className="mr-2" /> Update Profile
                </a>
                <a
                  href="#logout"
                  className="block px-4 py-2 text-gray-800 hover:bg-red-100 rounded-b-lg flex items-center"
                >
                  <FaSignOutAlt className="mr-2" /> Logout
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
      <Tabs className="flex-grow p-6">
        <TabList className="flex justify-center bg-white rounded-full shadow-md p-1 mb-6">
          <Tab className="bg-red-600 text-white py-2 px-6 rounded-full flex items-center mx-2 transition-all duration-300 ease-in-out" selectedClassName="bg-purple-600 shadow-lg transform scale-105">
            <FaShoppingCart className="mr-2" /> Add Product
          </Tab>
          <Tab className="bg-red-600 text-white py-2 px-6 rounded-full flex items-center mx-2 transition-all duration-300 ease-in-out" selectedClassName="bg-purple-600 shadow-lg transform scale-105">
            <FaList className="mr-2" /> View Products
          </Tab>
          <Tab className="bg-red-600 text-white py-2 px-6 rounded-full flex items-center mx-2 transition-all duration-300 ease-in-out" selectedClassName="bg-purple-600 shadow-lg transform scale-105">
            <FaClipboardList className="mr-2" /> Order Details
          </Tab>
        </TabList>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <TabPanel>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <AddProduct />
            </motion.div>
          </TabPanel>
          <TabPanel>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ViewProduct />
            </motion.div>
          </TabPanel>
          <TabPanel>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ViewOrder />
            </motion.div>
          </TabPanel>
        </div>
      </Tabs>
    </div>
  );
};

export default AdminPage;
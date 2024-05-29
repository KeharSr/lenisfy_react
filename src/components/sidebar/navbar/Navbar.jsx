import React from 'react';

const Navbar = () => {
  return (
    <div className="flex items-center justify-between bg-gray-100 p-4 shadow-md">
      <h1 className="text-2xl font-bold">Power Glasses and Sun Glasses</h1>
      <div className="flex items-center bg-gray-200 rounded-full p-2">
        <span className="material-icons text-gray-600">search</span>
        <input type="text" placeholder="Search Product" className="bg-gray-200 outline-none ml-2 w-48" />
        <span className="material-icons text-gray-600">filter_list</span>
      </div>
      <div className="flex items-center space-x-4">
        <span className="material-icons text-blue-500">email</span>
        <span className="material-icons text-green-500">notifications</span>
        <span className="material-icons text-orange-500">person</span>
      </div>
    </div>
  );
};

export default Navbar;

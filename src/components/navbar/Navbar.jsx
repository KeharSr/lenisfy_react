import React, { useState } from 'react';
import './Navbar.css'; // Import the CSS file

function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="bg-green-800 p-2 md:p-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <a href="#" className="text-white font-bold text-lg md:text-xl">Logo</a>
                    </div>
                    <div className="flex items-center justify-center flex-1 md:flex">
                        <a href="#" className="nav-link">Home</a>
                        <a href="#" className="nav-link">About</a>
                        <a href="#" className="nav-link">Services</a>
                        <a href="#" className="nav-link">Contact</a>
                    </div>
                    <div className="flex items-center">
                        <button className="cart-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19c0 1.104.896 2 2 2s2-.896 2-2M9 19c0 1.104.896 2 2 2s2-.896 2-2M9 19c0 1.104.896 2 2 2s2-.896 2-2M9 19c0 1.104.896 2 2 2s2-.896 2-2M9 19c0 1.104.896 2 2 2s2-.896 2-2M9 19c0 1.104.896 2 2 2s2-.896 2-2M9 19c0 1.104.896 2 2 2s2-.896 2-2M9 19c0 1.104.896 2 2 2s2-.896 2-2M3 3h18v2a1 1 0 01-1 1H4a1 1 0 01-1-1V3zm1 7h13.714l1.526 9H4.474l1.526-9zM10 17a2 2 0 100-4 2 2 0 000 4z" />
                            </svg>
                        </button>
                        <div className="profile-dropdown ml-4 relative">
                            <button className="profile-avatar" onClick={toggleDropdown}>
                                <img src="https://via.placeholder.com/150" alt="Profile" className="h-8 w-8 rounded-full" />
                            </button>
                            <div className={`dropdown-content ${isDropdownOpen ? 'block' : 'hidden'} absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg`}>
                                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Upload Image</a>
                                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

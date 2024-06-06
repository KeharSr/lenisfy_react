import React from 'react';
import applogo from '../../assets/images/applogo.png';
import searchicon from '../../assets/images/search_icon.png';
import basketicon from '../../assets/images/basket_icon.png';

const Navbar = () => {
    return (
        <nav className="bg-transparent py-2">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <p className="text-red-500 font-bold text-2xl mr-4">Lensify</p>
                        <img className="h-8 w-8" src={applogo} alt="Logo" />
                    </div>
                    <div className="hidden md:block">
                        <div className="flex items-center justify-center space-x-4">
                            <a href="/" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
                            <a href="/" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</a>
                            <a href="/" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Services</a>
                            <a href="/" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</a>
                            <a href="/" className="ml-4"><img className="h-5 w-5" src={searchicon} alt="Search Icon" /></a>
                            <a href="/"><img className="h-5 w-5 ml-4" src={basketicon} alt="Basket Icon" /></a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

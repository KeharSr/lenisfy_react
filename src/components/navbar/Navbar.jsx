


import React, { useState, useEffect } from 'react';
import applogo from '../../assets/images/applogo.png';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [profilePicture, setProfilePicture] = useState('/api/placeholder/32/32');

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    const handleProfilePictureChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfilePicture(e.target.result);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    const handleLogout = () => {
        // Clear user data from storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        //toast
        toast.success('Logged out successfully');

        // Redirect user to the login page or home page
        window.location.href = '/login';
       

    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            className={`fixed w-full z-50 transition-all duration-300 ${
                scrolled ? 'bg-white shadow-md' : 'bg-transparent'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <img className="h-8 w-auto mr-2" src={applogo} alt="Lensify Logo" />
                            <span className="text-2xl font-bold text-gray-800">Lensify</span>
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        <NavLink to="/homepage">Home</NavLink>
                        <NavLink to="/sunglasses">Sun Glasses</NavLink>
                        <NavLink to="/powerglasses">Power Glasses</NavLink>
                        <NavLink to="/contact">Contact</NavLink>
                        <Link to="/addtocart" className="text-gray-600 hover:text-gray-800 transition-colors duration-200">
                            <ShoppingCart className="w-6 h-6" />
                        </Link>
                        <div className="relative">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="flex items-center focus:outline-none"
                            >
                                <img
                                    className="h-8 w-8 rounded-full object-cover border-2 border-gray-200"
                                    src={profilePicture}
                                    alt="Profile"
                                />
                            </button>
                            {isOpen && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.1 }}
                                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5"
                                >
                                    <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
                                    <Link to="/signout" onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</Link>
                                    <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                                        Change Picture
                                        <input type="file" className="hidden" onChange={handleProfilePictureChange} accept="image/*" />
                                    </label>
                                </motion.div>
                            )}
                        </div>
                    </div>
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="md:hidden"
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <NavLink to="/homepage" mobile>Home</NavLink>
                        <NavLink to="/sunglasses" mobile>Sun Glasses</NavLink>
                        <NavLink to="/powerglasses" mobile>Power Glasses</NavLink>
                        <NavLink to="/contact" mobile>Contact</NavLink>
                        <NavLink to="/addtocart" mobile>
                            <ShoppingCart className="w-5 h-5 mr-2" />
                            Cart
                        </NavLink>
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
};

const NavLink = ({ to, children, mobile }) => (
    <Link
        to={to}
        className={`${
            mobile
                ? 'block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                : 'text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 relative group'
        }`}
    >
        {children}
        {!mobile && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
        )}
    </Link>
);

export default Navbar;
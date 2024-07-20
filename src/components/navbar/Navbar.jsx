

// import React, { useState } from 'react';
// import applogo from '../../assets/images/applogo.png';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//     const [dropdownVisible, setDropdownVisible] = useState(false);
//     const [profilePicture, setProfilePicture] = useState();
//     const [menuVisible, setMenuVisible] = useState(false);

//     const toggleDropdown = () => {
//         setDropdownVisible(!dropdownVisible);
//     };

//     const toggleMenu = () => {
//         setMenuVisible(!menuVisible);
//     };

//     const handleProfilePictureChange = (event) => {
//         if (event.target.files && event.target.files[0]) {
//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 setProfilePicture(e.target.result);
//             };
//             reader.readAsDataURL(event.target.files[0]);
//         }
//     };

//     return (
//         <nav className="bg-white border-gray-200 dark:bg-gray-900 p-1">
//             <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
//                 <div className="flex items-center space-x-3 rtl:space-x-reverse">
//                     <img src={applogo} className="h-12" alt="Lensify Logo" />
//                     <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">Lensify</span>
//                 </div>
//                 <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
//                     <button
//                         type="button"
//                         className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
//                         id="user-menu-button"
//                         aria-expanded={dropdownVisible}
//                         onClick={toggleDropdown}
//                     >
//                         <span className="sr-only">Open user menu</span>
//                         <img className="w-8 h-8 rounded-full" src={profilePicture} alt="user photo" />
//                     </button>
//                     {/* Dropdown menu */}
//                     <div className={`absolute right-0 top-full mt-1 w-40 origin-top-right rounded-md shadow-lg z-50 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ${dropdownVisible ? 'block' : 'hidden'}`} id="user-dropdown">
//                         <div className="px-5 py-3">
//                             <span className="block text-sm text-gray-900 dark:text-white">Kehar Sr</span>
//                         </div>
//                         <ul className="py-2" aria-labelledby="user-menu-button">
//                             <li>
//                                 <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
//                             </li>
//                             <li>
//                                 <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
//                             </li>
//                             <li className="border-t border-gray-200 dark:border-gray-600 mt-2">
//                                 <input
//                                     type="file"
//                                     accept="image/*"
//                                     className="block w-full text-sm text-gray-900 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300"
//                                     onChange={handleProfilePictureChange}
//                                 />
//                             </li>
//                         </ul>
//                     </div>
//                     <button
//                         data-collapse-toggle="navbar-user"
//                         type="button"
//                         className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//                         aria-controls="navbar-user"
//                         aria-expanded={menuVisible}
//                         onClick={toggleMenu}
//                     >
//                         <span className="sr-only">Open main menu</span>
//                         <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
//                             <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
//                         </svg>
//                     </button>
//                 </div>
//                 <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${menuVisible ? 'block' : 'hidden'}`} id="navbar-user">
//                     <ul className="flex flex-col font-medium p-0 mt-2 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
//                         <li>
//                             <Link to="/homepage" className="block py-1 px-2 text-black md:text-black md:p-0 dark:text-white md:dark:text-white" aria-current="page">Home</Link>
//                         </li>
//                         <li>
//                             <Link to="/sunglasses" className="block py-1 px-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Sun Glasses</Link>
//                         </li>
//                         <li>
//                             <Link to="/powerglasses" className="block py-1 px-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Power Glasses</Link>
//                         </li>
//                         <li>
//                             <Link to ='/addtocart' className="block py-1 px-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Cart</Link>
//                         </li>
//                         <li>
//                             <a href="#" className="block py-1 px-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;


import React, { useState, useEffect } from 'react';
import applogo from '../../assets/images/applogo.png';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, User, Menu, X } from 'lucide-react';

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
                                    <Link to="/signout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</Link>
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
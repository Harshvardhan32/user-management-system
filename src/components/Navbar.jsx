import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { FiUsers, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { BsSun, BsMoon } from 'react-icons/bs';

/**
 * Navigation Bar Component
 * Displays a navigation bar with logo, theme toggle, and logout button
 */
const Navbar = () => {
    
    const navigate = useNavigate();
    const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    /**
     * Handles logout functionality
     * Removes token from local storage and navigates to login page
     */
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    /**
     * Renders the navigation bar component
     * Displays a navigation bar with logo, theme toggle, and logout button
     */
    return (
        <nav className="bg-white dark:bg-gray-800 shadow-md backdrop-blur-md bg-opacity-80 dark:bg-opacity-80 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo and Website Name */}
                    <div className="flex items-center">
                        <Link to="/users" className="flex-shrink-0 flex items-center">
                            <FiUsers className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                            <span className="ml-3 text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-transparent bg-clip-text">
                                User Management
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden sm:flex items-center space-x-4">
                        <button
                            onClick={toggleDarkMode}
                            className="cursor-pointer p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 transition-all duration-200 flex items-center space-x-2"
                            aria-label="Toggle Theme"
                        >
                            {isDarkMode ? (
                                <BsSun className="w-5 h-5 text-amber-500" />
                            ) : (
                                <BsMoon className="w-5 h-5 text-indigo-600" />
                            )}
                        </button>

                        <button
                            onClick={handleLogout}
                            className="cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                        >
                            <FiLogOut className="w-5 h-5" />
                            <span>Logout</span>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="sm:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="cursor-pointer p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 transition-all duration-200"
                        >
                            {isMenuOpen ? (
                                <FiX className="h-6 w-6" />
                            ) : (
                                <FiMenu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="sm:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <div className="flex flex-col space-y-2">
                                <button
                                    onClick={toggleDarkMode}
                                    className="cursor-pointer flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 transition-all duration-200"
                                >
                                    {isDarkMode ? (
                                        <>
                                            <BsSun className="w-5 h-5 text-amber-500" />
                                            <span>Light Mode</span>
                                        </>
                                    ) : (
                                        <>
                                            <BsMoon className="w-5 h-5 text-indigo-600" />
                                            <span>Dark Mode</span>
                                        </>
                                    )}
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className="cursor-pointer flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white transition-all duration-200 shadow-md hover:shadow-lg"
                                >
                                    <FiLogOut className="w-5 h-5" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Gradient Border Bottom */}
            <div className="h-[2px] bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400"></div>
        </nav>
    );
};

export default Navbar;
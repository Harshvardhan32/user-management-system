import { createContext, useState } from "react";

/**
 * Theme Context
 * Provides dark mode functionality
 */
export const ThemeContext = createContext({
    isDarkMode: false,
    toggleDarkMode: () => { }
});

/**
 * Theme Provider
 * Provides dark mode functionality to the application
 */
export const ThemeProvider = ({ children }) => {

    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') === 'dark' ? true : false);

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => !prev);
        localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

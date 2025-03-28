import { createContext, useState } from "react";

export const ThemeContext = createContext({
    isDarkMode: false,
    toggleDarkMode: () => { }
});

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

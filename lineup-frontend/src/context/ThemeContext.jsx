import React, { createContext, useContext, useState, useEffect } from "react";

// Create a Theme Context with default value 'light'
const ThemeContext = createContext({
    theme: "light", // Default theme is 'light'
    toggleTheme: () => {},
});

// Custom hook to use the Theme context
export const useTheme = () => {
    return useContext(ThemeContext);
};

// ThemeProvider component to provide theme state and toggle function
export const ThemeProvider = ({ children }) => {
    // Check localStorage for saved theme preference
    const storedTheme = localStorage.getItem("theme");
    const initialTheme = storedTheme || "light"; // Default to 'light' theme

    const [theme, setTheme] = useState(initialTheme);

    // Toggle between 'light' and 'dark' themes
    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    // Save the theme preference to localStorage whenever theme changes
    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

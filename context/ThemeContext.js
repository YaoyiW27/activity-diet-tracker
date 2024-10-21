import React, { createContext, useState } from 'react';
import { colors } from '../style/StyleHelper'; 

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const themeStyles = theme === 'light' 
    ? colors.lightTheme
    : colors.darkTheme; 

  return (
    <ThemeContext.Provider value={{ themeStyles, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
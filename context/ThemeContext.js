import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const themeStyles = theme === 'light' 
    ? { backgroundColor: '#a3b18a', textColor: '#fff' } 
    : { backgroundColor: '#84a98c', textColor: '#000' };

  return (
    <ThemeContext.Provider value={{ themeStyles, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
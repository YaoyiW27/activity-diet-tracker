import React, { createContext, useState } from 'react'

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [diet, setDiet] = useState([]);

  const addDiet = (dietEntry) => {
    setDiet((prevDiet) => [...prevDiet, dietEntry]);
  };

  return (
    <DataContext.Provider value={{ diet, addDiet }}>
      {children}
    </DataContext.Provider>
  )
}
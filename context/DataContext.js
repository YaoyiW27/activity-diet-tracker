import React, { createContext, useState } from 'react'

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  const [diet, setDiet] = useState([]);

  const addActivity = (activity) => {
    setActivities((prevActivities) => [...prevActivities, activity]);
  };

  const addDiet = (diet) => {
    setDiet((prevDiet) => [...prevDiet, diet]);
  };

  return (
    <DataContext.Provider value={{ activities, diet, addActivity, addDiet }}>
      {children}
    </DataContext.Provider>
  )
}
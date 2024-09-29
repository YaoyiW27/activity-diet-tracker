import React, { createContext, useState } from 'react'

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  const [diet, setDiet] = useState([]);

  const AddActivity = (activity) => {
    setActivities(prevActivities)([...prevActivities, activity]);
  };

  const AddDiet = (diet) => {
    setDiet(prevDiet)([...prevDiet, diet]);
  };

  return (
    <DataContext.Provider value={{ activities, diet, AddActivity, AddDiet }}>
      {children}
    </DataContext.Provider>
  )
}
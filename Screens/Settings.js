import React, { useContext } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

export default function Settings() {
  const { themeStyles, toggleTheme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: themeStyles.backgroundColor }]}>
      <View style={styles.card}>  
        <Button title="Toggle Theme" onPress={toggleTheme} color={themeStyles.textColor} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  card: {
    backgroundColor: '#3a5a40',  
    borderRadius: 10,            
    padding: 10,                 
    marginVertical: 8,          
    width: '50%',                
    shadowOpacity: 0.15,      
    shadowRadius: 5,           
    shadowColor: '#000',         
    shadowOffset: { height: 2, width: 0 }, 
    elevation: 4,               
  },
});
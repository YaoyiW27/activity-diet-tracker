import React, { useContext } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { styles } from '../style/StyleHelper';  

export default function Settings() {
  const { themeStyles, toggleTheme } = useContext(ThemeContext);

  return (
    <View style={[styles.toggleContainer, { backgroundColor: themeStyles.backgroundColor }]}>
      <View style={styles.toggleCard}>  
        <Button title="Toggle Theme" onPress={toggleTheme} color={themeStyles.textColor} />
      </View>
    </View>
  );
}
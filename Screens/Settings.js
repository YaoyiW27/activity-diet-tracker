import React, { useContext } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { ThemeContext } from '../context/ThemeContext'

export default function Settings() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center', 
    padding: 10, 
    backgroundColor: '#a3b18a'
  },
});
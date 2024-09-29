import React, { useContext } from 'react'
import { View, Text, Button } from 'react-native'
import { ThemeContext } from '../context/ThemeContext'

export default function Settings() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <View>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  )
}
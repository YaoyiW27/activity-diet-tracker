import React, { useContext } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

export default function Settings() {
  const { themeStyles, toggleTheme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: themeStyles.backgroundColor }]}>
      <Button title="Toggle Theme" onPress={toggleTheme} color={themeStyles.textColor} />
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
});
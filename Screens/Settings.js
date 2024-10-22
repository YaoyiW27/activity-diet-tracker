import React, { useContext } from 'react';
import { View } from 'react-native';
import PressableButton from '../components/PressableButton';
import { ThemeContext } from '../context/ThemeContext';
import { styles } from '../style/StyleHelper';

export default function Settings() {
  const { themeStyles, toggleTheme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: themeStyles.backgroundColor }]}>
      <PressableButton onPress={toggleTheme}>Toggle Theme</PressableButton>
    </View>
  );
}
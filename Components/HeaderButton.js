import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from '../style/StyleHelper';

export default function HeaderButton({ onPress, themeStyles, title }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.addButton, { backgroundColor: themeStyles.backgroundColor }]}
    >
      <Text style={{ color: themeStyles.textColor }}>{title}</Text>
    </TouchableOpacity>
  );
}
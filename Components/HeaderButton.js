import React from 'react';
import { Pressable } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function HeaderButton({ onPress, iconName, iconFamily, themeStyles }) {
  const IconComponent = 
    iconFamily === 'MaterialCommunityIcons' ? MaterialCommunityIcons : MaterialIcons;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          marginHorizontal: 4, 
          opacity: pressed ? 0.5 : 1, 
        },
      ]}
    >
      <IconComponent name={iconName} size={24} color={themeStyles.textColor} />
    </Pressable>
  );
}
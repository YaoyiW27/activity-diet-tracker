import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { styles } from '../style/StyleHelper';

export default function PressableListItem({ children, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.itemlistline,
        { backgroundColor: pressed ? 'lightgray' : styles.itemlistline.backgroundColor }, // iOS feedback
      ]}
      android_ripple={{ color: 'yellow' }} // Android ripple effect
    >
      <View>
        <Text>{children}</Text>
      </View>
    </Pressable>
  );
}
import React from 'react';
import { Pressable, View, Text } from 'react-native';
import { styles } from '../style/StyleHelper';

export default function PressableButton({ children, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: pressed ? 'lightgray' : styles.button.backgroundColor,
          alignSelf: 'center', // Ensure button is centered
          width: '60%', // Set a maximum width to prevent stretching
        },
      ]}
      android_ripple={{ color: 'yellow' }} // Ripple effect for Android
    >
      <View>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
}
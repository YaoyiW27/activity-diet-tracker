import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { styles } from '../style/StyleHelper';

export default function SaveCancelButtonGroup({ onSave, onCancel, themeStyles }) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          { opacity: pressed ? 0.8 : 1 }, // Opacity feedback
        ]}
        android_ripple={{ color: 'lightgray' }} // Ripple effect for Android
        onPress={onCancel}
      >
        <Text style={{ color: themeStyles.textColor, textAlign: 'center' }}>Cancel</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          { opacity: pressed ? 0.8 : 1 }, // Opacity feedback
        ]}
        android_ripple={{ color: 'lightgray' }} // Ripple effect for Android
        onPress={onSave}
      >
        <Text style={{ color: themeStyles.textColor, textAlign: 'center' }}>Save</Text>
      </Pressable>
    </View>
  );
}
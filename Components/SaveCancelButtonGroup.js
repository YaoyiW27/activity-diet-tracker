import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from '../style/StyleHelper';

export default function SaveCancelButtonGroup({ onSave, onCancel, themeStyles }) {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={onCancel}>
        <Text style={{ color: themeStyles.textColor, textAlign: 'center'}}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onSave}>
        <Text style={{ color: themeStyles.textColor, textAlign: 'center'}}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}
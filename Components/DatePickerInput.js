import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from '../style/StyleHelper';

export default function DatePickerInput({ label, date, onDateChange, themeStyles }) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    onDateChange(selectedDate);
  };

  const displayDate = date ? date.toDateString() : '';

  return (
    <View>
      <Text style={[styles.label, { color: themeStyles.textColor }]}>{label}</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
        <Text>{displayDate}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date || new Date()}
          mode='date'
          display='inline'
          onChange={handleDateChange}
        />
      )}
    </View>
  );
}
import React, { useState, useContext, useLayoutEffect } from 'react'
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { DataContext } from '../context/DataContext';

export default function AddDiet( { navigation } ) {
  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { addDiet } = useContext(DataContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Add A Diet Activity',
      headerBackTitleVisible: false,
      headerStyle: { backgroundColor: '#3a5a40' },
      headerTintColor: '#fff',
  });
}, [navigation]);
  
  const onDateChange = (event, selectedDate) => {
    if (event.type === 'dismissed') {
      setShowDatePicker(false);
      return;
    }
    setShowDatePicker(false);
    setDate(selectedDate);
  };

  const formattedDate = date.toLocaleDateString();

  const onSave = () => {
    if (!description || !date || !calories) {
      Alert.alert('Invalid input', 'Please fill all fields');
      return;
    }

    if (isNaN(calories) || calories <= 0) {
      Alert.alert('Invalid input', 'Please check your input values');
      return;
    }

    const isSpecial = calories > 800;

    const newDiet = {
      id: Date.now(),
      name: description,
      date: date.toDateString(),
      calories: calories,
      special: isSpecial,
    };

    addDiet(newDiet);
    
    navigation.goBack();    
  }

  return (
    <View>
      <Text style={styles.label}>Description *</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
      />
      <Text style={styles.label}>Calories *</Text>
      <TextInput
        keyboardType='numeric'
        value={calories}
        onChangeText={setCalories}
      />
      <Text style={styles.label}>Date *</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
      <TextInput  
        value={date.toDateString()}
        editable={false}
        pointerEvents='none'
      />
      </TouchableOpacity>
      <DateTimePicker
        value={date}
        mode='date'
        display='inline'
        onChange={(event, selectedDate) => {
          const currentDate = selectedDate || date;
          setDate(currentDate);
        }}
      />
        <Button title="Save" onPress={onSave} />
        <Button title="Cancel" onPress={() => navigation.goBack()} />
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 10,
    fontSize: 16,
    color: '#006400',
  },
});
import React, {useState } from 'react'
import { View, Text, TextInput, Button, Alert} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddDiet( { navigation } ) {
  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState('');
  const [date, setDate] = useState(new Date());

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

    // update context here 
    
    navigation.goBack();    
  }

  return (
    <View>
      <Text>Description *</Text>
      <TextInput
        value={description}
        onChangeText={setDuration}
      />
      <Text>Calories *</Text>
      <TextInput
        keyboardType='numeric'
        value={calories}
        onChangeText={setCalories}
      />
      <Text>Date *</Text>
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
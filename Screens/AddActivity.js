import React, {useState } from 'react'
import { View, Text, TextInput, Button, Alert} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddActivity( { navigation } ) {
  const [activity, setActivity] = useState('');
  const [date, setDate] = useState(new Date());
  const [duration, setDuration] = useState('');
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'Walking', value: 'Walking'},
    {label: 'Running', value: 'Running'},
    {label: 'Swimming', value: 'Swimming'},
    {label: 'Weights', value: 'Weights'},
    {label: 'Yoga', value: 'Yoga'},
  ]);

  const onSave = () => {
    if (!activity || !date || !duration) {
      Alert.alert('Invalid input', 'Please fill all fields');
      return;
    }

    if (isNaN(duration) || duration <= 0) {
      Alert.alert('Invalid input', 'Please check your input values');
      return;
    }
    // update context here 
    navigation.goBack();    
  }

  return (
    <View>
      <Text>Select An Activity</Text>
      <DropDownPicker
        open={open}
        value={activity}
        items={items}
        setOpen={setOpen}
        setValue={setActivity}
        setItems={setItems}
      />
      <TextInput
        keyboardType='numeric'
        value={duration}
        onChangeText={setDuration}
      />
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
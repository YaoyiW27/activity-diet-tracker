import React, { useState, useContext, useLayoutEffect } from 'react'
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DataContext } from '../context/DataContext';

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
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { addActivity } = useContext(DataContext);

  useLayoutEffect(() => {
    navigation.setOptions({
        headerTitle: 'Add An Activity',
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
    if (!activity || !date || !duration) {
      Alert.alert('Invalid input', 'Please fill all fields');
      return;
    }

    if (isNaN(duration) || duration <= 0) {
      Alert.alert('Invalid input', 'Please check your input values');
      return;
    }
    
    const newActivity = {
      id: Date.now(),
      name: activity,
      date: date.toDateString(),
      duration: `${duration} min`,
    };

    addActivity(newActivity);

    navigation.goBack();    
  }

  return (
    <View>
      <Text style={styles.label}>Activity *</Text>
      <DropDownPicker
        open={open}
        value={activity}
        items={items}
        setOpen={setOpen}
        setValue={setActivity}
        setItems={setItems}
        placeholder='Select An Activity'
      />
      <Text style={styles.label}>Duration (min) *</Text>
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        value={duration}
        onChangeText={setDuration}
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
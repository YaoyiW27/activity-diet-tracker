import React, { useState, useContext, useLayoutEffect } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DataContext } from '../context/DataContext';
import { ThemeContext } from '../context/ThemeContext';
import { styles } from '../style/StyleHelper';
import SaveCancelButtonGroup from '../components/SaveCancelButtonGroup'; 

export default function AddActivity({ navigation }) {
    const { themeStyles } = useContext(ThemeContext);
    const [activity, setActivity] = useState('');
    const [date, setDate] = useState(null);
    const [duration, setDuration] = useState('');
    const [open, setOpen] = useState(false);
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
        setShowDatePicker(false);
        setDate(selectedDate || date);
    };

    const displayDate = date ? date.toDateString() : '';

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
            special: duration > 60,
        };

        addActivity(newActivity);
        navigation.goBack();
    };

    return (
        <View style={[styles.addScreenContainer, { backgroundColor: themeStyles.backgroundColor } ]}>
            <Text style={[styles.label, { color: themeStyles.textColor }]}>Activity *</Text>
            <DropDownPicker
                open={open}
                value={activity}
                items={[
                    { label: 'Walking', value: 'Walking' },
                    { label: 'Running', value: 'Running' },
                    { label: 'Swimming', value: 'Swimming' },
                    { label: 'Weights', value: 'Weights' },
                    { label: 'Yoga', value: 'Yoga' },
                ]}
                setOpen={setOpen}
                setValue={setActivity}
                setItems={items => items}
                placeholder='Select An Activity' 
                style={styles.picker}
            />
            <Text style={[styles.label, { color: themeStyles.textColor }]}>Duration (min) *</Text>
            <TextInput
                style={styles.input}
                keyboardType='numeric'
                value={duration}
                onChangeText={setDuration}
            />
            <Text style={[styles.label, { color: themeStyles.textColor }]}>Date *</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
                <Text>{displayDate}</Text>
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePicker
                    value={date || new Date()}
                    mode='date'
                    display='inline'
                    onChange={onDateChange}
                />
            )}
            <SaveCancelButtonGroup
                onSave={onSave}
                onCancel={() => navigation.goBack()}
                themeStyles={themeStyles}
            />
        </View>
    );
}
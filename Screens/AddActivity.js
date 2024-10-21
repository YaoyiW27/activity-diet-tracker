import React, { useState, useContext, useLayoutEffect } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { DataContext } from '../context/DataContext';
import { ThemeContext } from '../context/ThemeContext';
import { styles } from '../style/StyleHelper';
import SaveCancelButtonGroup from '../components/SaveCancelButtonGroup';
import DatePickerInput from '../components/DatePickerInput';  

export default function AddActivity({ navigation }) {
    const { themeStyles } = useContext(ThemeContext);
    const [activity, setActivity] = useState('');
    const [date, setDate] = useState(null);
    const [duration, setDuration] = useState('');
    const [open, setOpen] = useState(false);
    const { addActivity } = useContext(DataContext);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Add An Activity',
            headerBackTitleVisible: false,
            headerStyle: { backgroundColor: '#3a5a40' },
            headerTintColor: '#fff',
        });
    }, [navigation]);

    const onSave = () => {
        if (!activity || !date || !duration) {
            Alert.alert('Invalid input', 'Please fill all fields');
            return;
        }

        if (isNaN(duration) || duration <= 0) {
            Alert.alert('Invalid input', 'Please check your input values');
            return;
        }

        const isSpecialActivity = (activity === 'Running' || activity === 'Weights') && duration > 60;  
         
        const newActivity = {
            id: Date.now(),
            name: activity,
            date: date.toDateString(),
            duration: `${duration} min`,
            special: isSpecialActivity,
        };

        addActivity(newActivity);
        navigation.goBack();
    };

    return (
        <View style={[styles.addScreenContainer, { backgroundColor: themeStyles.backgroundColor }]}>
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
                    { label: 'Cycling', value: 'Cycling' },
                    { label: 'Hiking', value: 'Hiking' },
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
            <DatePickerInput 
                label="Date *" 
                date={date} 
                onDateChange={setDate} 
                themeStyles={themeStyles} 
            />
            <SaveCancelButtonGroup
                onSave={onSave}
                onCancel={() => navigation.goBack()}
                themeStyles={themeStyles}
            />
        </View>
    );
}
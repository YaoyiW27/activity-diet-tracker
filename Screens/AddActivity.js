import React, { useState, useContext, useLayoutEffect } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DataContext } from '../context/DataContext';

export default function AddActivity({ navigation }) {
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
        };

        addActivity(newActivity);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Activity *</Text>
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
                setItems={() => {}}
                placeholder='Select An Activity' 
                style={styles.picker}
            />
            <Text style={styles.label}>Duration (min) *</Text>
            <TextInput
                style={styles.input}
                keyboardType='numeric'
                value={duration}
                onChangeText={setDuration}
            />
            <Text style={styles.label}>Date *</Text>
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
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={onSave}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    label: {
        marginBottom: 5,
        fontSize: 14,
        color: '#344e41',
    },
    input: {
        color: '#588157',
        borderWidth: 1,
        borderColor: '#3a5a40',
        padding: 8,
        marginBottom: 5,
        borderRadius: 5,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    picker: {
        backgroundColor: '#fff',
        marginBottom: 5,
        borderRadius: 5,
        borderColor: '#3a5a40',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#3a5a40',
        padding: 8,
        borderRadius: 5,
        flex: 0.48,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
});
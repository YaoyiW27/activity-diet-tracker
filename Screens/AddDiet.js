import React, { useState, useContext, useLayoutEffect } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DataContext } from '../context/DataContext';
import { ThemeContext } from '../context/ThemeContext';

export default function AddDiet({ navigation }) {
    const { themeStyles } = useContext(ThemeContext);
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
        setShowDatePicker(false);
        setDate(selectedDate || date);
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

        const newDiet = {
            id: Date.now(),
            name: description,
            date: date.toDateString(),
            calories: `${calories} `, 
            special: calories > 800, 
        };

        addDiet(newDiet);
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.label, { color: themeStyles.textColor }]}>Description *</Text>
            <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
            />
            <Text style={[styles.label, { color: themeStyles.textColor }]}>Calories *</Text>
            <TextInput
                style={styles.input}
                keyboardType='numeric'
                value={calories}
                onChangeText={setCalories}
            />
            <Text style={[styles.label, { color: themeStyles.textColor }]}>Date *</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
                <Text>{formattedDate}</Text>
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode='date'
                    display='inline'
                    onChange={onDateChange}
                />
            )}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>  
                    <Text style={{ color: themeStyles.textColor, textAlign: 'center'}}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={onSave}>  
                    <Text style={{ color: themeStyles.textColor, textAlign: 'center'}}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#a3b18a',
    },
    label: {
        marginBottom: 5,
        fontSize: 14,
        color: '#344e41',
    },
    input: {
        borderWidth: 1,
        borderColor: '#3a5a40',
        padding: 8,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        justifyContent: 'center',
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
      color: '#000',
      textAlign: 'center',
    },
});
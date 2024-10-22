import React, { useState, useContext, useLayoutEffect } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { styles } from '../style/StyleHelper';
import SaveCancelButtonGroup from '../components/SaveCancelButtonGroup'; 
import DatePickerInput from '../components/DatePickerInput';  
import { addDocument } from '../Firebase/firestoreHelper'; 

export default function AddDiet({ navigation }) {
    const { themeStyles } = useContext(ThemeContext);
    const [description, setDescription] = useState('');
    const [calories, setCalories] = useState('');
    const [date, setDate] = useState(new Date());

    // Set up the navigation header
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Add A Diet Entry',
            headerBackTitleVisible: false,
            headerStyle: { backgroundColor: '#3a5a40' },
            headerTintColor: '#fff',
        });
    }, [navigation]);

    // Function to handle saving the new diet entry
    const onSave = async () => {
        // Validate input fields
        if (!description || !date || !calories) {
            Alert.alert('Invalid input', 'Please fill all fields');
            return;
        }

        if (isNaN(calories) || calories <= 0) {
            Alert.alert('Invalid input', 'Please check your input values');
            return;
        }

        // Determine if the diet entry is special based on criteria
        const isSpecialDiet = calories > 800; 

        // Create a new diet entry object
        const newDiet = {
            name: description,
            date: date.toDateString(),
            calories: Number(calories), // Ensure calories is a number
            special: isSpecialDiet,
        };

        try {
            // Add the new diet entry to Firestore using the helper function
            const docId = await addDocument('diet', newDiet);
            console.log('Diet entry successfully added to Firestore with ID:', docId);
            navigation.goBack(); // Navigate back to the previous screen
        } catch (error) {
            console.error('Error adding diet entry to Firestore: ', error);
            Alert.alert('Error', 'Failed to add diet entry. Please try again.');
        }
    };

    return (
        <View style={[styles.addScreenContainer, { backgroundColor: themeStyles.backgroundColor }]}>
            {/* Description input */}
            <Text style={[styles.label, { color: themeStyles.textColor }]}>Description *</Text>
            <TextInput
                style={[styles.input, styles.tallInput]}
                value={description}
                onChangeText={setDescription}
                multiline={true}
            />
            {/* Calories input */}
            <Text style={[styles.label, { color: themeStyles.textColor }]}>Calories *</Text>
            <TextInput
                style={styles.input}
                keyboardType='numeric'
                value={calories}
                onChangeText={setCalories}
            />
            {/* Date picker input */}
            <DatePickerInput 
                label="Date *" 
                date={date} 
                onDateChange={setDate} 
                themeStyles={themeStyles} 
            />
            {/* Save and Cancel buttons */}
            <SaveCancelButtonGroup
                onSave={onSave}
                onCancel={() => navigation.goBack()}
                themeStyles={themeStyles}
            />
        </View>
    );
}
import React, { useState, useContext, useLayoutEffect } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { ThemeContext } from '../context/ThemeContext';
import { styles } from '../style/StyleHelper';
import SaveCancelButtonGroup from '../components/SaveCancelButtonGroup';
import DatePickerInput from '../components/DatePickerInput';  
import { addDocument } from '../Firebase/firestoreHelper'; 

export default function AddActivity({ navigation }) {
    const { themeStyles } = useContext(ThemeContext);
    const [activity, setActivity] = useState('');
    const [date, setDate] = useState(null);
    const [duration, setDuration] = useState('');
    const [open, setOpen] = useState(false);

    // Set up the navigation header
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Add An Activity',
            headerBackTitleVisible: false,
            headerStyle: { backgroundColor: '#3a5a40' },
            headerTintColor: '#fff',
        });
    }, [navigation]);

    // Function to handle saving the new activity
    const onSave = async () => {
        // Validate input fields
        if (!activity || !date || !duration) {
            Alert.alert('Invalid input', 'Please fill all fields');
            return;
        }

        if (isNaN(duration) || duration <= 0) {
            Alert.alert('Invalid input', 'Please check your input values');
            return;
        }

        // Determine if the activity is special based on criteria
        const isSpecialActivity = (activity === 'Running' || activity === 'Weights') && duration > 60;  

        // Create a new activity object
        const newActivity = {
            name: activity,
            date: date.toDateString(),
            duration: Number(duration), // Ensure duration is a number
            special: isSpecialActivity,
        };

        try {
            // Add the new activity to Firestore using the helper function
            const docId = await addDocument('activities', newActivity);
            console.log('Activity successfully added to Firestore with ID:', docId);
            navigation.goBack(); // Navigate back to the previous screen
        } catch (error) {
            console.error('Error adding activity to Firestore: ', error);
            Alert.alert('Error', 'Failed to add activity. Please try again.');
        }
    };

    return (
        <View style={[styles.addScreenContainer, { backgroundColor: themeStyles.backgroundColor }]}>
            {/* Activity dropdown picker */}
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
                placeholder='Select An Activity' 
                style={styles.picker}
                scrollViewProps={{nestedScrollEnabled: true}}
                listMode="SCROLLVIEW"
            />
            {/* Duration input */}
            <Text style={[styles.label, { color: themeStyles.textColor }]}>Duration (min) *</Text>
            <TextInput
                style={styles.input}
                keyboardType='numeric'
                value={duration}
                onChangeText={setDuration}
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
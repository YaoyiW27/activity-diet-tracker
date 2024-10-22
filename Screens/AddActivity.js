import React, { useState, useContext, useLayoutEffect } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import Checkbox from 'expo-checkbox'; 
import DropDownPicker from 'react-native-dropdown-picker';
import { ThemeContext } from '../context/ThemeContext';
import { styles } from '../style/StyleHelper';
import SaveCancelButtonGroup from '../components/SaveCancelButtonGroup';
import DatePickerInput from '../components/DatePickerInput';
import { addDocument, updateDocument } from '../Firebase/firestoreHelper';

export default function AddActivity({ navigation, route }) {
    const { themeStyles } = useContext(ThemeContext);

    // Initialize state with provided data if in edit mode, or default values for new entry
    const [activity, setActivity] = useState(route.params?.data?.name || '');
    const [date, setDate] = useState(route.params?.data ? new Date(route.params.data.date) : null);
    const [duration, setDuration] = useState(route.params?.data?.duration.toString() || '');
    const [removeSpecial, setRemoveSpecial] = useState(false); // New state to handle checkbox

    const [open, setOpen] = useState(false);

    // Set navigation title based on whether it's in edit mode
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: route.params?.data ? 'Edit Activity' : 'Add An Activity',
            headerBackTitleVisible: false,
            headerStyle: { backgroundColor: '#3a5a40' },
            headerTintColor: '#fff',
        });
    }, [navigation]);

    // Handle saving the activity
    const onSave = async () => {
        if (!activity || !date || !duration) {
            Alert.alert('Invalid input', 'Please fill all fields');
            return;
        }
        if (isNaN(duration) || duration <= 0) {
            Alert.alert('Invalid input', 'Please check your input values');
            return;
        }

        const newActivity = {
            name: activity,
            date: date.toDateString(),
            duration: Number(duration), // Ensure duration is a number
            special: route.params?.data ? !removeSpecial : (activity === 'Running' || activity === 'Weights') && duration > 60,
        };

        try {
            if (route.params?.data) {
                // Update existing activity if in edit mode
                await updateDocument('activities', route.params.data.id, newActivity);
            } else {
                // Add new activity if not in edit mode
                await addDocument('activities', newActivity);
            }
            navigation.goBack();
        } catch (error) {
            console.error('Error saving activity:', error);
            Alert.alert('Error', 'Failed to save the activity. Please try again.');
        }
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
                placeholder="Select An Activity"
                style={styles.picker}
                scrollViewProps={{ nestedScrollEnabled: true }}
                listMode="SCROLLVIEW"
            />
            <Text style={[styles.label, { color: themeStyles.textColor }]}>Duration (min) *</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={duration}
                onChangeText={setDuration}
            />
            <DatePickerInput
                label="Date *"
                date={date}
                onDateChange={setDate}
                themeStyles={themeStyles}
            />
            {route.params?.data?.special && (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                    <Text style={[styles.label, { color: themeStyles.textColor, flex: 1, marginRight: 10 }]}>
                        This item is marked as special. Select the checkbox if you would like to remove the special status.
                    </Text>
                    <Checkbox 
                        value={removeSpecial} 
                        onValueChange={setRemoveSpecial} 
                        style={{ marginLeft: 10 }}
                    />
                </View>
            )}
            <SaveCancelButtonGroup
                onSave={onSave}
                onCancel={() => navigation.goBack()}
                themeStyles={themeStyles}
            />
        </View>
    );
}
import React, { useState, useContext, useLayoutEffect, useEffect } from 'react';
import { View, Text, TextInput, Alert, Pressable } from 'react-native';
import Checkbox from 'expo-checkbox';
import DropDownPicker from 'react-native-dropdown-picker';
import { ThemeContext } from '../context/ThemeContext';
import { styles } from '../style/StyleHelper';
import SaveCancelButtonGroup from '../components/SaveCancelButtonGroup';
import DatePickerInput from '../components/DatePickerInput';
import { addDocument, updateDocument, deleteDocument } from '../Firebase/firestoreHelper';
import { Feather } from '@expo/vector-icons';

export default function AddActivity({ navigation, route }) {
    const { themeStyles } = useContext(ThemeContext);
    const isEditMode = !!route.params?.data; // Check if we're in edit mode

    // Initialize state based on the activity data or default values
    const [activity, setActivity] = useState(route.params?.data?.name || '');
    const [date, setDate] = useState(route.params?.data ? new Date(route.params.data.date) : null);
    const [duration, setDuration] = useState(route.params?.data?.duration?.toString() || '');
    const [removeSpecial, setRemoveSpecial] = useState(false); // Track checkbox state
    const [open, setOpen] = useState(false); // Dropdown open/close state

    // On initial load, set checkbox state based on the activity's 'special' status
    useEffect(() => {
        if (isEditMode && route.params?.data) {
            setRemoveSpecial(!route.params.data.special); // Checkbox reflects the 'special' field
        }
    }, [route.params?.data, isEditMode]);

    // Configure the navigation header with a delete button in edit mode
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: isEditMode ? 'Edit' : 'Add An Activity',
            headerRight: isEditMode ? () => (
                <Pressable onPress={handleDelete} style={{ paddingRight: 10 }}>
                    <Feather name="trash-2" size={24} color="#fff" />
                </Pressable>
            ) : undefined,
            headerStyle: { backgroundColor: '#3a5a40' },
            headerTintColor: '#fff',
        });
    }, [navigation, isEditMode]);

    // Handle the deletion of an activity
    const handleDelete = () => {
        Alert.alert(
            'Confirm Deletion',
            'Are you sure you want to delete this activity?',
            [
                { text: 'No', style: 'cancel' },
                {
                    text: 'Yes',
                    onPress: async () => {
                        await deleteDocument('activities', route.params.data.id);
                        Alert.alert('Deleted', 'Activity has been deleted.');
                        navigation.goBack();
                    },
                },
            ]
        );
    };

    // Handle saving the activity
    const onSave = async () => {
        if (!activity || !date || !duration) {
            Alert.alert('Invalid input', 'Please fill all fields');
            return;
        }

        if (isNaN(duration) || duration <= 0) {
            Alert.alert('Invalid input', 'Please enter a valid duration');
            return;
        }

        const shouldHaveWarning = (activity === 'Running' || activity === 'Weights') && Number(duration) > 60;

        // Prepare the new activity data with the correct 'special' field
        const newActivity = {
            name: activity,
            date: date.toDateString(),
            duration: Number(duration),
            special: !removeSpecial && shouldHaveWarning, // If checkbox is checked, 'special' becomes false
        };

        try {
            if (isEditMode) {
                await updateDocument('activities', route.params.data.id, newActivity);
                Alert.alert('Success', 'Activity updated successfully');
            } else {
                await addDocument('activities', newActivity);
                Alert.alert('Success', 'Activity added successfully');
            }
            navigation.goBack(); // Go back to the activities list
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

            {/* Show checkbox only in Edit mode */}
            {isEditMode && (
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
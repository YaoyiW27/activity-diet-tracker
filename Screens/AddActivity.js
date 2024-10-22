import React, { useState, useContext, useLayoutEffect, useEffect } from 'react';
import { View, Text, TextInput, Alert, Pressable } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { ThemeContext } from '../context/ThemeContext';
import { styles } from '../style/StyleHelper';
import SaveCancelButtonGroup from '../components/SaveCancelButtonGroup';
import DatePickerInput from '../components/DatePickerInput';  
import { addDocument, updateDocument } from '../Firebase/firestoreHelper'; 
import Checkbox from 'expo-checkbox'; 
import { Feather } from '@expo/vector-icons';

export default function AddActivity({ navigation, route, deleteHandler }) {
    const { themeStyles } = useContext(ThemeContext);

    const isEditMode = route.params?.type === 'edit';
    const existingData = route.params?.data || {};

    // State initialization
    const [activity, setActivity] = useState(existingData.name || '');
    const [date, setDate] = useState(existingData.date ? new Date(existingData.date) : null);
    const [duration, setDuration] = useState(existingData.duration?.toString() || '');
    const [open, setOpen] = useState(false);
    const [isChecked, setChecked] = useState(false); // Checkbox starts unchecked

    // Header setup
    useLayoutEffect(() => {
        const headerRight = isEditMode ? () => (
            <Pressable onPress={deleteHandler} style={{ paddingRight: 10 }}>
                <Feather name="trash-2" size={24} color="#fff" />
            </Pressable>
        ) : undefined;

        navigation.setOptions({
            headerTitle: isEditMode ? 'Edit' : 'Add An Activity',
            headerBackTitleVisible: false,
            headerStyle: { backgroundColor: '#3a5a40' },
            headerTintColor: '#fff',
            headerRight,
        });
    }, [navigation, isEditMode, deleteHandler]);

    // Save handler
    const onSave = async () => {
        if (!activity || !date || !duration) {
            Alert.alert('Invalid input', 'Please fill all fields');
            return;
        }

        if (isNaN(duration) || duration <= 0) {
            Alert.alert('Invalid input', 'Please check your input values');
            return;
        }

        // If checkbox is checked, the activity will no longer be special
        const updatedSpecial = isChecked ? false : existingData.special;

        const activityData = {
            name: activity,
            date: date.toDateString(),
            duration: Number(duration),
            special: updatedSpecial, // Update 'special' based on checkbox
        };

        try {
            if (isEditMode) {
                Alert.alert(
                    'Important',
                    'Are you sure you want to save these changes?',
                    [
                        { text: 'No', style: 'cancel' },
                        {
                            text: 'Yes',
                            onPress: async () => {
                                await updateDocument('activities', existingData.id, activityData);
                                Alert.alert('Success', 'Activity updated successfully');
                                navigation.goBack();
                            },
                        },
                    ]
                );
            } else {
                const docId = await addDocument('activities', activityData);
                console.log('Activity added with ID:', docId);
                Alert.alert('Success', 'Activity added successfully');
                navigation.goBack();
            }
        } catch (error) {
            console.error('Error saving activity:', error);
            Alert.alert('Error', 'Failed to save the activity. Please try again.');
        }
    };

    return (
        <View style={[styles.addScreenContainer, { backgroundColor: themeStyles.backgroundColor, flex: 1 }]}>
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
            {isEditMode && existingData.special && (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                    <Text style={[styles.label, { color: themeStyles.textColor, flex: 1 }]}>
                        This item is marked as special. Select the checkbox if you want to approve it.
                    </Text>
                    <Checkbox
                        value={isChecked}
                        onValueChange={setChecked}
                        style={styles.checkbox}
                        color={themeStyles.checkboxColor}
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
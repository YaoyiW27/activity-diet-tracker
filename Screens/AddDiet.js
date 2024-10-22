import React, { useState, useContext, useLayoutEffect, useEffect } from 'react';
import { View, Text, TextInput, Alert, Pressable } from 'react-native';
import Checkbox from 'expo-checkbox';
import { ThemeContext } from '../context/ThemeContext';
import { styles } from '../style/StyleHelper';
import SaveCancelButtonGroup from '../components/SaveCancelButtonGroup';
import DatePickerInput from '../components/DatePickerInput';
import { addDocument, updateDocument, deleteDocument } from '../Firebase/firestoreHelper';
import { Feather } from '@expo/vector-icons';

export default function AddDiet({ navigation, route }) {
    const { themeStyles } = useContext(ThemeContext);

    const isEditMode = !!route.params?.data; // Check if in edit mode
    const existingData = route.params?.data || {};

    // State initialization
    const [description, setDescription] = useState(existingData.name || '');
    const [calories, setCalories] = useState(existingData.calories?.toString() || '');
    const [date, setDate] = useState(existingData.date ? new Date(existingData.date) : null);
    const [isChecked, setChecked] = useState(false); // Checkbox state
    const [removeSpecial, setRemoveSpecial] = useState(false); // Track checkbox state

    // Set initial checkbox state on component mount
    useEffect(() => {
        if (isEditMode) {
            const special = existingData.special !== false; // Special is true unless explicitly false
            setChecked(!special); // Checked if not special
        }
    }, [isEditMode, existingData]);

    // Configure the navigation header with delete button in edit mode
    useLayoutEffect(() => {
        const headerRight = isEditMode ? () => (
            <Pressable onPress={handleDelete} style={{ paddingRight: 10 }}>
                <Feather name="trash-2" size={24} color="#fff" />
            </Pressable>
        ) : undefined;

        navigation.setOptions({
            headerTitle: isEditMode ? 'Edit' : 'Add A Diet Entry',
            headerBackTitleVisible: false,
            headerStyle: { backgroundColor: '#3a5a40' },
            headerTintColor: '#fff',
            headerRight,
        });
    }, [navigation, isEditMode]);

    // Handle the deletion of a diet entry
    const handleDelete = () => {
        Alert.alert(
            'Confirm Deletion',
            'Are you sure you want to delete this diet entry?',
            [
                { text: 'No', style: 'cancel' },
                {
                    text: 'Yes',
                    onPress: async () => {
                        await deleteDocument('diet', existingData.id);
                        Alert.alert('Deleted', 'Diet entry has been deleted.');
                        navigation.goBack();
                    },
                },
            ]
        );
    };

    // Save handler
    const onSave = async () => {
        if (!description || !date || !calories) {
            Alert.alert('Invalid input', 'Please fill all fields');
            return;
        }

        if (isNaN(calories) || calories <= 0) {
            Alert.alert('Invalid input', 'Please enter a valid calorie amount');
            return;
        }

        // Determine the special status based on checkbox and calories
        const specialCheck = !isChecked && Number(calories) > 800;

        const dietData = {
            name: description,
            date: date.toDateString(),
            calories: Number(calories),
            special: !removeSpecial && specialCheck,
        };

        try {
            if (isEditMode) {
                await updateDocument('diet', existingData.id, dietData);
                Alert.alert('Success', 'Diet entry updated successfully');
            } else {
                await addDocument('diet', dietData);
                Alert.alert('Success', 'Diet entry added successfully');
            }
            navigation.goBack();
        } catch (error) {
            console.error('Error saving diet entry:', error);
            Alert.alert('Error', 'Failed to save the diet entry. Please try again.');
        }
    };

    return (
        <View style={[styles.addScreenContainer, { backgroundColor: themeStyles.backgroundColor, flex: 1 }]}>
            <Text style={[styles.label, { color: themeStyles.textColor }]}>Description *</Text>
            <TextInput
                style={[styles.input, styles.tallInput]}
                value={description}
                onChangeText={setDescription}
                multiline
            />
            <Text style={[styles.label, { color: themeStyles.textColor }]}>Calories *</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={calories}
                onChangeText={setCalories}
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
                        This item is marked as special. Select the checkbox if you want to remove the warning.
                    </Text>
                    <Checkbox
                        value={isChecked}
                        onValueChange={setChecked}
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
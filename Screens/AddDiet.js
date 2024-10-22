import React, { useState, useContext, useLayoutEffect, useEffect } from 'react';
import { View, Text, TextInput, Alert, Pressable } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { styles } from '../style/StyleHelper';
import SaveCancelButtonGroup from '../components/SaveCancelButtonGroup'; 
import DatePickerInput from '../components/DatePickerInput';  
import { addDocument, updateDocument } from '../Firebase/firestoreHelper'; 
import Checkbox from 'expo-checkbox'; 
import { Feather } from '@expo/vector-icons';

export default function AddDiet({ navigation, route, deleteHandler }) {
    const { themeStyles } = useContext(ThemeContext);

    const isEditMode = route.params?.type === 'edit';
    const existingData = route.params?.data || {};

    // State initialization
    const [description, setDescription] = useState(existingData.name || '');
    const [calories, setCalories] = useState(existingData.calories?.toString() || '');
    const [date, setDate] = useState(existingData.date ? new Date(existingData.date) : null);
    const [isChecked, setChecked] = useState(false); 

    // Header setup
    useLayoutEffect(() => {
        const headerRight = isEditMode ? () => (
            <Pressable onPress={deleteHandler} style={{ paddingRight: 10 }}>
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
    }, [navigation, isEditMode, deleteHandler]);

    // Save handler
    const onSave = async () => {
        if (!description || !date || !calories) {
            Alert.alert('Invalid input', 'Please fill all fields');
            return;
        }
    
        if (isNaN(calories) || calories <= 0) {
            Alert.alert('Invalid input', 'Please check your input values');
            return;
        }
    
        // Use null if 'special' is not defined to avoid Firebase errors
        const updatedSpecial = typeof existingData.special === 'boolean' ? (isChecked ? false : existingData.special) : null;
    
        const dietData = {
            name: description,
            date: date.toDateString(),
            calories: Number(calories),
            special: updatedSpecial,
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
                                await updateDocument('diet', existingData.id, dietData);
                                Alert.alert('Success', 'Diet entry updated successfully');
                                navigation.goBack();
                            },
                        },
                    ]
                );
            } else {
                const docId = await addDocument('diet', dietData);
                console.log('Diet entry added with ID:', docId);
                Alert.alert('Success', 'Diet entry added successfully');
                navigation.goBack();
            }
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
                multiline={true}
            />
            <Text style={[styles.label, { color: themeStyles.textColor }]}>Calories *</Text>
            <TextInput
                style={styles.input}
                keyboardType='numeric'
                value={calories}
                onChangeText={setCalories}
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
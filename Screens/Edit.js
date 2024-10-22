import React from 'react';
import { Alert } from 'react-native';
import AddActivity from './AddActivity';
import { deleteFromDB } from '../Firebase/firestoreHelper';

export default function Edit({ navigation, route }) {
  const { type, data } = route.params;

  const deleteHandler = () => {
    Alert.alert(
      'Important',
      'Are you sure you want to delete this entry?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: handleDelete },
      ]
    );
  };

  const handleDelete = () => {
    deleteFromDB(data.id, type === 'activities' ? 'activities' : 'diets');
    navigation.goBack();
  };

  return (
    <AddActivity
      navigation={navigation}
      route={{ params: { type: 'edit', data } }}
      deleteHandler={deleteHandler} // Ensure deleteHandler is passed correctly
    />
  );
}
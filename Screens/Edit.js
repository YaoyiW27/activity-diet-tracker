import React from 'react';
import { Alert } from 'react-native';
import AddActivity from './AddActivity';
import { deleteDocument } from '../Firebase/firestoreHelper';

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

  const handleDelete = async () => {
    try {
      await deleteDocument(type === 'activities' ? 'activities' : 'diets', data.id);
      console.log(`Deleted ${data.id} from ${type}`);
      navigation.goBack();
    } catch (error) {
      console.error('Error deleting document:', error);
      Alert.alert('Error', 'Failed to delete the activity. Please try again.');
    }
  };

  return (
    <AddActivity
      navigation={navigation}
      route={route}
      deleteHandler={deleteHandler}
    />
  );
}
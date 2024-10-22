import React, { useEffect } from 'react';
import { Alert, Pressable } from 'react-native';
import AddActivity from './AddActivity';
import { deleteFromDB } from '../Firebase/firestoreHelper';
import { Feather } from '@expo/vector-icons';

export default function Edit({ navigation, route }) {
  const { type, data } = route.params;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={deleteHandler}>
          <Feather name="trash-2" size={24} color="white" />
        </Pressable>
      ),
    });
  }, [navigation]);

  const deleteHandler = () => {
    Alert.alert(
      'Important',
      'Are you sure you want to delete this entry?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: () => handleDelete() },
      ]
    );
  };

  const handleDelete = () => {
    deleteFromDB(data.id, type === 'activities' ? 'activities' : 'diets');
    navigation.goBack();
  };

  return <AddActivity navigation={navigation} route={route} />;
}
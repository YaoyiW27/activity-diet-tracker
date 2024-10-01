import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ItemsList from '../components/ItemsList';

export default function Diet({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('AddDiet')}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ItemsList type="diet" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center', 
    padding: 10, 
    backgroundColor: '#a3b18a'
  },
  addButton: {
    backgroundColor: '#d4a373', 
    padding: 10,
    borderRadius: 5, 
  },
  addButtonText: {
    color: '#fff', 
    fontSize: 16, 
  }
});
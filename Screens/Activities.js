import React from 'react';
import { View, Text, Button } from 'react-native';
import ItemsList from '../components/ItemsList';

export default function Activities({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate('AddActivity')}
          title="Add"
          color='#d4a373'
        />
      ),
    });
  }, [navigation]);

  return (
    <View>
      <ItemsList type="activities" />
    </View>
  );
}
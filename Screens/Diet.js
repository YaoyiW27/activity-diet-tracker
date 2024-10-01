import React from 'react'
import { View, Text, Button } from 'react-native'
import ItemsList from '../components/ItemsList';

export default function Diet( { navigation } ) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate('AddDiet')}  
          title="Add"
          color='black'
        />
      ),
    });
  }, [navigation]);

  return (
    <View>
      <ItemsList type="diet" />
    </View>
  );
}
import React from 'react'
import { View, Text, Button } from 'react-native'
import ItemsList from '../components/ItemsList';

export default function Activities( { navigation } ) {
  return (
    <View>
      <Button title="Add" onPress={() => navigation.navigate('AddActivity')} />
      <ItemsList type="activities" />
    </View>
  )
}
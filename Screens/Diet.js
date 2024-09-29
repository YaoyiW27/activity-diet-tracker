import React from 'react'
import { View, Text, Button } from 'react-native'
import ItemsList from '../components/ItemsList';

export default function Diet() {
  return (
    <View>
      <Button title="Add" onPress={() => navigation.navigate('AddDiet')} />
      <ItemList type="diet" />
    </View>
  )
}
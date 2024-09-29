import React from 'react'
import { View, Text, Button } from 'react-native'
import ItemList from '../components/ItemList';

export default function Activities( { navigation } ) {
  return (
    <View>
      <Button title="Add" onPress={() => navigation.navigate('AddActivity')} />
      <ItemList type="activity" />
    </View>
  )
}
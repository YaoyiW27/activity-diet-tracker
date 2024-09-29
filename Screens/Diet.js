import React from 'react'
import { View, Text } from 'react-native'
import ItemList from '../components/ItemList';

export default function Diet() {
  return (
    <View>
      <ItemList type="diet" />
    </View>
  )
}
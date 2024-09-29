import React, { useContext } from 'react'
import { View, Text, FlatList } from 'react-native'
import { DataContext } from '../context/DataContext';

export default function ItemsList({ type }) {
  const { activities, diet } = useContext(DataContext);
  const entries = type === 'activities' ? activities : diet;

  return (
    <FlatList
      data={entries}
      keyExtractor={item => item.id.toString()} 
      renderItem={({ item }) => (
        <View>
          <Text>{item.name}</Text>
          <Text>{item.date}</Text>
          <Text>{type === 'activities' ? `${item.duration}` : `${item.calories}`}</Text>
          {item.special && <Text>⚠️</Text>}
        </View>
      )}
    />
  )
}
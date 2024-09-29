import React from 'react'
import { View, Text, FlatList } from 'react-native'

const data = {
    activities: [],
    diet: [],
}

export default function ItemsList({ type }) {
  const entries = data[type];

  return (
    <FlatList
      data={entries}
      keyExtractor={item => item.id}
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
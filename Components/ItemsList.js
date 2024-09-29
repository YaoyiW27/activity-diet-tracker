import React from 'react'
import { View, Text, FlatList } from 'react-native'

const data = {
    activities: [
        { id: 1, name: 'Yoga', date: 'Mon Sep 16 2024', duration: '60 min'},
        { id: 2, name: 'Weights', date: 'Mon Jul 15 2024', duration: '120 min' },
    ],
    diet: [
        { id: 1, name: 'Breakfast', date: 'Tue Sep 17 2024', calories: '500' },
        { id: 2, name: 'Luch', date: 'Wed Sep 25 2024', calories: '900' },
    ]
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
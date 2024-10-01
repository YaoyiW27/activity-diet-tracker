import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { DataContext } from '../context/DataContext';
import { styles } from '../style/StyleHelper';  

export default function ItemsList({ type }) {
  const { activities, diet } = useContext(DataContext);
  const entries = type === 'activities' ? activities : diet;

  return (
    <FlatList
      data={entries}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.itemsCard}>
          <View style={styles.rowContainer}>
            <Text style={styles.activityName}>{item.name}</Text>
            {item.special && <Text style={styles.warning}>⚠️</Text>}
            <View style={styles.detailsContainer}>
              <View style={styles.detailBox}>
                <Text style={styles.activityDetail}>{item.date}</Text>
              </View>
              <View style={{ width: 6 }} />
              <View style={styles.detailBox}>
                <Text style={styles.activityDetail}>{type === 'activities' ? `${item.duration}` : `${item.calories}`}</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    />
  )
}
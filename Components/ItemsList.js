import React from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { styles } from '../style/StyleHelper';

export default function ItemsList({ type, data, onItemPress }) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        // Ensure all fields are valid strings
        const name = item.name || 'Unnamed Activity';
        const date = item.date || 'No Date';
        const duration = item.duration ? `${item.duration} min` : 'N/A';
        const calories = item.calories ? `${item.calories} kcal` : 'N/A';

        const showWarning =
          type === 'diet'
            ? item.calories > 800 // Warning for diet entries
            : item.special; // Warning for activities based on 'special' field

        return (
          <Pressable
            onPress={() => onItemPress(item)}
            style={styles.itemsCard}
          >
            <View style={styles.rowContainer}>
              <Text style={styles.activityName}>{name}</Text>
              {showWarning && <Text style={styles.warning}>⚠️</Text>}
              <View style={styles.detailsContainer}>
                <View style={styles.detailBox}>
                  <Text style={styles.activityDetail}>{date}</Text>
                </View>
                <View style={{ width: 6 }} />
                <View style={styles.detailBox}>
                  <Text style={styles.activityDetail}>
                    {type === 'activities' ? duration : calories}
                  </Text>
                </View>
              </View>
            </View>
          </Pressable>
        );
      }}
    />
  );
}
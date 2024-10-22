import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { styles } from '../style/StyleHelper';

export default function ItemsList({ type, data, onItemPress }) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        // Safely handle item properties
        const name = item.name || 'Unnamed Activity';
        const date = item.date || 'No Date';
        const duration = item.duration ? `${item.duration} min` : 'N/A';
        const calories = item.calories ? `${item.calories} kcal` : 'N/A';

        // Determine when to show the warning icon
        const showWarning = 
          type === 'diet'
            ? item.calories > 800 // For diet entries: Calories > 800 shows a warning
            : item.special; // For activities: Use 'special' field for warning

        return (
          <Pressable
            onPress={() => onItemPress(item)}
            style={({ pressed }) => [
              styles.itemsCard,
              { backgroundColor: pressed ? '#8CA596' : '#3a5a40' }, // Visual feedback on press
            ]}
            android_ripple={{ color: 'gray' }} // Ripple effect for Android
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
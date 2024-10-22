// ItemsList.js
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { styles } from '../style/StyleHelper';  

export default function ItemsList({ type, data }) {
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={styles.itemsCard}>
          <View style={styles.rowContainer}>
            {/* Display the activity name */}
            <Text style={styles.activityName}>{item.name}</Text>
            {/* Display a warning icon if the activity is special */}
            {item.special && <Text style={styles.warning}>⚠️</Text>}
            <View style={styles.detailsContainer}>
              <View style={styles.detailBox}>
                {/* Display the date */}
                <Text style={styles.activityDetail}>{item.date}</Text>
              </View>
              <View style={{ width: 6 }} />
              <View style={styles.detailBox}>
                {/* Display the duration or calories based on the type */}
                <Text style={styles.activityDetail}>
                  {type === 'activities' ? `${item.duration} min` : `${item.calories}`}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    />
  );
}
import React from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { styles } from '../style/StyleHelper';  

export default function ItemsList({ type, data, navigation }) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        if (!item || !item.name || !item.date) return null; // Skip invalid items

        return (
          <Pressable
            onPress={() => 
              navigation.navigate('Edit', { type, data: item }) // Navigate to Edit screen
            }
            style={styles.itemsCard}
          >
            <View style={styles.rowContainer}>
              <Text style={styles.activityName}>{item.name}</Text>
              {item.special && <Text style={styles.warning}>⚠️</Text>}
              <View style={styles.detailsContainer}>
                <View style={styles.detailBox}>
                  <Text style={styles.activityDetail}>{item.date}</Text>
                </View>
                <View style={{ width: 6 }} />
                <View style={styles.detailBox}>
                  <Text style={styles.activityDetail}>
                    {type === 'activities' ? `${item.duration} min` : `${item.calories} kcal`}
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
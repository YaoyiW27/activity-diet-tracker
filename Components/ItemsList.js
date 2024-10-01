import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { DataContext } from '../context/DataContext';

export default function ItemsList({ type }) {
  const { activities, diet } = useContext(DataContext);
  const entries = type === 'activities' ? activities : diet;

  return (
    <FlatList
      data={entries}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
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

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#3a5a40',  
    borderRadius: 10,            
    padding: 10,                
    marginVertical: 8,           
    marginHorizontal: 16,       
    shadowOpacity: 0.15,        
    shadowRadius: 5,            
    shadowColor: '#000',      
    shadowOffset: { height: 2, width: 0 }, 
    elevation: 4,             
  },
  rowContainer: {
    flexDirection: 'row',        
    justifyContent: 'space-between', 
    alignItems: 'center',       
  },
  activityName: {
    fontSize: 15,                
    fontWeight: 'bold',         
    color: '#FFFFFF',           
    flex: 1,                   
  },
  detailsContainer: {
    flexDirection: 'row',        
    alignItems: 'center',        
  },
  detailBox: {
    backgroundColor: '#FFFFFF',  
    padding: 8,                  
    borderRadius: 5,          
  },
  activityDetail: {
    fontSize: 13,              
    color: '#000',             
  },
  warning: {                        
    marginRight: 10,
  },
});
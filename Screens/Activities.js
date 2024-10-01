import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ItemsList from '../components/ItemsList';
import { ThemeContext } from '../context/ThemeContext'; 

export default function Activities({ navigation }) {
  const { themeStyles } = useContext(ThemeContext);  

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('AddActivity')}
          style={[styles.addButton, { backgroundColor: themeStyles.backgroundColor }]}  
        >
          <Text style={{ color: themeStyles.textColor }}>Add</Text>  
        </TouchableOpacity>
      ),
    });
  }, [navigation, themeStyles]); 

  return (
    <View style={[styles.container, { backgroundColor: themeStyles.backgroundColor }]}>
      <ItemsList type="activities" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'stretch', 
    padding: 10, 
  },
  addButton: {
    padding: 10,
    borderRadius: 5, 
  },
});
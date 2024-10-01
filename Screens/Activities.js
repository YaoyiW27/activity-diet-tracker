import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ItemsList from '../components/ItemsList';
import { ThemeContext } from '../context/ThemeContext';
import { styles } from '../style/StyleHelper';  

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
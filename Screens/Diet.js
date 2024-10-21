// Diet.js
import React, { useContext } from 'react';
import { View } from 'react-native';
import ItemsList from '../components/ItemsList';
import { ThemeContext } from '../context/ThemeContext';
import { styles } from '../style/StyleHelper';
import HeaderButton from '../components/HeaderButton'; 

export default function Diet({ navigation }) {
  const { themeStyles } = useContext(ThemeContext);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButton 
          onPress={() => navigation.navigate('AddDiet')}
          themeStyles={themeStyles}
          title="Add"
        />
      ),
    });
  }, [navigation, themeStyles]);

  return (
    <View style={[styles.container, { backgroundColor: themeStyles.backgroundColor }]}>
      <ItemsList type="diet" />
    </View>
  );
}
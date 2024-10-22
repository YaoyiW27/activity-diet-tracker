import React, { useContext } from 'react';
import { View } from 'react-native';
import ItemsList from '../components/ItemsList';
import { ThemeContext } from '../context/ThemeContext';
import { styles } from '../style/StyleHelper';
import HeaderButton from '../components/HeaderButton';

export default function Activities({ navigation }) {
  const { themeStyles } = useContext(ThemeContext);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
          <HeaderButton 
            onPress={() => navigation.navigate('AddActivity')}
            iconName="add"
            iconFamily="MaterialIcons"
            themeStyles={themeStyles}
          />
          <HeaderButton 
            onPress={() => navigation.navigate('AddActivity')}
            iconName="run"
            iconFamily="MaterialCommunityIcons"
            themeStyles={themeStyles}
          />
        </View>
      ),
    });
  }, [navigation, themeStyles]);

  return (
    <View style={[styles.container, { backgroundColor: themeStyles.backgroundColor }]}>
      <ItemsList type="activities" />
    </View>
  );
}
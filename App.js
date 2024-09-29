import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Activities from './screens/Activities';
import Diet from './screens/Diet';
import AddActivity from './screens/AddActivity';
import AddDiet from './screens/AddDiet';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Activities" component={Activities} />
      <Tab.Screen name="Diet" component={Diet} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={BottomTabNavigator} />
        <Stack.Screen name="AddActivity" component={AddActivity} />
        <Stack.Screen name="AddDiet" component={AddDiet} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

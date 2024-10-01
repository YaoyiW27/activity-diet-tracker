import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Activities from './screens/Activities';
import Diet from './screens/Diet';
import Settings from './screens/Settings';  
import AddActivity from './screens/AddActivity';
import AddDiet from './screens/AddDiet';
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider } from './context/DataContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Activities') {
            iconName = 'directions-run';
            return <MaterialIcons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Diet') {
            iconName = 'food';
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Settings') {
            iconName = 'settings';
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: '#d4a373', // Color of the icon when tab is active
        inactiveTintColor: 'black', // Color of the icon when tab is inactive
      }}
    >
      <Tab.Screen name="Activities" component={Activities} />
      <Tab.Screen name="Diet" component={Diet} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={BottomTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="AddActivity" component={AddActivity} />
            <Stack.Screen name="AddDiet" component={AddDiet} />
          </Stack.Navigator>
        </NavigationContainer>
      </DataProvider>
    </ThemeProvider>
  );
}
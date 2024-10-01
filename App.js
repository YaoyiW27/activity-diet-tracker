import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
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
    <Tab.Navigator>
      <Tab.Screen name="Activities" component={Activities} options={{ tabBarIcon: ({ color, size }) => (<MaterialIcons name="directions-run" size={24} color="black" />) }}/>
      <Tab.Screen name="Diet" component={Diet} options={{ tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="food" size={24} color="black" />) }}/>
      <Tab.Screen name="Settings" component={Settings} options={{ tabBarIcon: ({ color, size }) => (<Ionicons name="settings" size={24} color="black" />) }}/>
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
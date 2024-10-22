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
import Edit from './screens/Edit';
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider } from './context/DataContext';
import { colors } from './style/StyleHelper';  

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
        tabBarActiveTintColor: colors.activeTintColor,
        tabBarInactiveTintColor: colors.inactiveTintColor, 
        tabBarStyle: { backgroundColor: colors.tabBarBackgroundColor }, 
      })}
    >
      <Tab.Screen name="Activities" component={Activities} options={{
        headerStyle: {
          backgroundColor: colors.headerBackgroundColor  
        },
        headerTintColor: colors.headerTextColor
      }} />
      <Tab.Screen name="Diet" component={Diet} options={{
        headerStyle: {
          backgroundColor: colors.headerBackgroundColor  
        },
        headerTintColor: colors.headerTextColor  
      }} />
      <Tab.Screen name="Settings" component={Settings} options={{
        headerStyle: {
          backgroundColor: colors.headerBackgroundColor  
        },
        headerTintColor: colors.headerTextColor  
      }} />
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
            <Stack.Screen name="Edit" component={Edit} />
          </Stack.Navigator>
        </NavigationContainer>
      </DataProvider>
    </ThemeProvider>
  );
}
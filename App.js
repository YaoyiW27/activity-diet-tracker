import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
      <Tab.Screen name="Activities" component={Activities} />
      <Tab.Screen name="Diet" component={Diet} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={BottomTabNavigator} options={{headerShown: false}} />
            <Stack.Screen name="AddActivity" component={AddActivity} options={{headerTitle: 'Add An Activity', headerBackTitleVisible: false}} />
            <Stack.Screen name="AddDiet" component={AddDiet} />
          </Stack.Navigator>
        </NavigationContainer>
      </DataProvider>
    </ThemeProvider>
  );
}

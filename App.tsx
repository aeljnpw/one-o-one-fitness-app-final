import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StatusBar, StyleSheet} from 'react-native';
import { Home, Dumbbell, User, TrendingUp } from 'lucide-react-native';

import ActivityScreen from './app/(tabs)/index';
import WorkoutsScreen from './app/(tabs)/workouts';
import TrendsScreen from './app/(tabs)/trends';
import ProfileScreen from './app/(tabs)/profile';

const Tab = createBottomTabNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#1C1C1E" />
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: '#FF6B6B',
          tabBarInactiveTintColor: '#8E8E93',
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIcon: ({focused, color, size}) => {
            if (route.name === 'Activity') {
              return <Home size={size} color={color} />;
            } else if (route.name === 'Workouts') {
              return <Dumbbell size={size} color={color} />;
            } else if (route.name === 'Trends') {
              return <TrendingUp size={size} color={color} />;
            } else if (route.name === 'Profile') {
              return <User size={size} color={color} />;
            }
            return null;
          },
        })}>
        <Tab.Screen name="Activity" component={ActivityScreen} />
        <Tab.Screen name="Workouts" component={WorkoutsScreen} />
        <Tab.Screen name="Trends" component={TrendsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#1C1C1E',
    borderTopWidth: 0,
    elevation: 0,
    height: 60,
    paddingBottom: 8,
  },
  tabBarLabel: {
    fontSize: 12,
  },
});

export default App;
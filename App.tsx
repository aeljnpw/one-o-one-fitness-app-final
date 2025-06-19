import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StatusBar, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ActivityScreen from './src/screens/ActivityScreen';
import WorkoutsScreen from './src/screens/WorkoutsScreen';
import SharingScreen from './src/screens/SharingScreen';
import TrendsScreen from './src/screens/TrendsScreen';
import ProfileScreen from './src/screens/ProfileScreen';

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
            let iconName;

            if (route.name === 'Activity') {
              iconName = 'timeline';
            } else if (route.name === 'Workouts') {
              iconName = 'fitness-center';
            } else if (route.name === 'Sharing') {
              iconName = 'people';
            } else if (route.name === 'Trends') {
              iconName = 'trending-up';
            } else if (route.name === 'Profile') {
              iconName = 'person';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
        })}>
        <Tab.Screen name="Activity" component={ActivityScreen} />
        <Tab.Screen name="Workouts" component={WorkoutsScreen} />
        <Tab.Screen name="Sharing" component={SharingScreen} />
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
    paddingTop: 8,
    paddingBottom: 20,
    height: 80,
  },
  tabBarLabel: {
    fontWeight: '500',
    fontSize: 10,
    marginTop: 4,
  },
});

export default App;
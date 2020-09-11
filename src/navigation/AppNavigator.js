import React from 'react';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import DashboardScreen from '../containers/DashboardScreen';
import LandingScreen from '../containers/LandingScreen';
import LoginScreen from '../containers/LoginScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="LoginScreen"
      component={LoginScreen}
      options={{
        headerTitle: 'Login Screen',
      }}
    />
    <Stack.Screen
      name="DashboardScreen"
      component={DashboardScreen}
      options={{
        headerTitle: 'Dashboard Screen',
      }}
    />
    <Stack.Screen
      name="LandingScreen"
      component={LandingScreen}
      options={{
        headerTitle: 'Employee Details',
      }}
    />
  </Stack.Navigator>
);

export default AppNavigator;

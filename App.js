/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AppNavigator from './src/navigation/AppNavigator';
import {GlobalProvider} from './src/containers/GlobalContext';
import {enableScreens} from 'react-native-screens';

const App = () => {
  enableScreens();
  return (
    <GlobalProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </GlobalProvider>
  );
};

export default App;

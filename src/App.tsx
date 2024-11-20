import React from 'react';
import {AppNavigation} from './Routes';
import {StatusBar} from 'react-native';
import {Colors, CommonStyles} from './Common';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => (
  <GestureHandlerRootView style={CommonStyles.flex}>
    <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
    <AppNavigation />
  </GestureHandlerRootView>
);

export default App;

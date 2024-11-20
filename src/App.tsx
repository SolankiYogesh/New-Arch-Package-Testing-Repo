import React from 'react';
import {AppNavigation} from './Routes';
import {StatusBar} from 'react-native';
import {Colors} from './Common';

const App = () => (
  <>
    <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
    <AppNavigation />
  </>
);

export default App;

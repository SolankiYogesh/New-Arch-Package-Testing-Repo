import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainScreen, SoundPluginScreen} from '@/Screens';
import {Colors, Screens} from '@/Common';
import React from 'react';
import SplashScreen from 'react-native-splash-screen';

const Stack = createNativeStackNavigator();
export default () => {
  return (
    <NavigationContainer onReady={() => SplashScreen.hide()}>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {
            backgroundColor: Colors.white,
          },
        }}>
        <Stack.Screen
          component={MainScreen}
          name={Screens.Main}
          options={{headerShown: false}}
        />
        <Stack.Screen component={SoundPluginScreen} name={Screens.Sound} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

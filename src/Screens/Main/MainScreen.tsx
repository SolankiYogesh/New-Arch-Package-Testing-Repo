import {FlatList, StyleSheet, View} from 'react-native';
import {CommonStyles, Images, Screens} from '@/Common';
import React from 'react';
import PluginItem from './Components/PluginItem';

const DATA = [
  {
    name: '',
    title: 'SplashScreen Plugin',
    package: 'react-native-splash-screen',
    image: Images.splash,
  },
  {
    name: Screens.Sound,
    title: 'Sound Plugin',
    package: 'react-native-sound',
    image: Images.sound,
  },
];

export default () => {
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={item => item.name}
        data={DATA}
        style={CommonStyles.flex}
        renderItem={({item}) => <PluginItem item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

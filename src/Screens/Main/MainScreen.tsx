import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
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
    <SafeAreaView style={CommonStyles.flex}>
      <FlatList
        keyExtractor={item => item.name}
        data={DATA}
        style={styles.container}
        renderItem={({item}) => <PluginItem item={item} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

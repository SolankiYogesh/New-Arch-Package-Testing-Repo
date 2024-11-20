import React, {useCallback} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IPluginItem} from '../types';

import {Colors, Screens} from '@/Common';
import {useNavigation} from '@/Hooks';

interface PluginItemProps {
  item: IPluginItem;
}

export default ({item}: PluginItemProps) => {
  const navigation = useNavigation();

  const onPressItem = useCallback(() => {
    navigation.navigate(Screens.Sound);
  }, [navigation]);

  return (
    <TouchableOpacity
      disabled={!item.name}
      style={styles.itemContainer}
      onPress={onPressItem}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.iconStyle}
          source={item.image}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.textStyle}>{item.title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  itemContainer: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: Colors.white,
    padding: 10,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    borderRadius: 300,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    width: '80%',
    height: '80%',
  },
  textStyle: {
    fontSize: 17,
    color: Colors.black,
    fontWeight: '500',
  },
});

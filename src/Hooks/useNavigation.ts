import {useNavigation as useNative} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

export default () => useNative<NativeStackNavigationProp<RootStackParamList>>();

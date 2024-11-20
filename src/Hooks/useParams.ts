import {type RouteProp, useRoute} from '@react-navigation/native';

export default <T extends keyof RootStackParamList>() =>
  useRoute<RouteProp<RootStackParamList, T>>()?.params ??
  ({} as unknown as RootStackParamList[T]);

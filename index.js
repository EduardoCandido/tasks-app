import 'expo/build/Expo.fx';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { activateKeepAwake } from 'expo-keep-awake';

import App from './src/screens/TaskList';

if (__DEV__) {
  activateKeepAwake();
}

registerRootComponent(App);

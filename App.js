
// Keep this here!
// https://github.com/software-mansion/react-native-reanimated/issues/2301#issuecomment-1147238372
import 'react-native-gesture-handler';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text, View } from 'react-native';

const ChatDrawer = createDrawerNavigator();

export default function App() {
  return <View>
      <Text style={{paddingTop: 200}}>Hello World!</Text>
    </View>
}

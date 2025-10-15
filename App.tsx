
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
enableScreens();
import { NavigationContainer } from '@react-navigation/native';

import MainScreen from './src/screens/mainScreen';

const Stack = createStackNavigator();

export enum ScreenName {
  mainScreen = 'MainScreen',
}

function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={ScreenName.mainScreen}
          screenOptions={{headerShown: false}}
        >
          <Stack.Screen name={ScreenName.mainScreen} component={MainScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
}

export default App;

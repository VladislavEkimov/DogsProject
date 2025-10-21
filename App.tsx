
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import MainScreen from './src/screens/mainScreen';

const Stack = createStackNavigator();

export enum ScreensName {
  mainScreen = 'MainScreen',
}

function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={ScreensName.mainScreen}
          screenOptions={{headerShown: false}}
        >
          <Stack.Screen name={ScreensName.mainScreen} component={MainScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
}

export default App;

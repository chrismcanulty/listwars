import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ColorSchemeName} from 'react-native';

import CreateScreen from '../screen/CreateScreen/CreateScreen';
import HomeScreen from '../screen/HomeScreen/HomeScreen';
import LaunchScreen from '../screen/Onboarding/LaunchScreen';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      theme={colorScheme === 'light' ? DefaultTheme : DarkTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

export type RootStackParamList = {
  Onboarding: undefined;
  Home: undefined;
  Create: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Create"
        component={CreateScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Onboarding"
        component={LaunchScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

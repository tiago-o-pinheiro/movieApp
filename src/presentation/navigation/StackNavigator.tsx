import {createStackNavigator} from '@react-navigation/stack';
import {DetailsScreen, HomeScreen} from '@screens/index';

export type StackParamList = {
  Home: undefined;
  Details: {movieId: number};
};

const Stack = createStackNavigator<StackParamList>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
};

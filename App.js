import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from './Screens/AuthScreen';
import SignUpScreen from './Screens/SignUpScreen';
import StepCounterScreen from './Screens/StepCounterScreen';
import StepHistoryScreen from './Screens/StepHistoryScreen';
import LeaderboardScreen from './Screens/LeaderboardScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ title: 'Authentication' }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ title: 'Sign Up' }}
        />
        <Stack.Screen
        name="StepCount"
        component={StepCounterScreen}
        options={{title: 'Step Count'}}
        />
        <Stack.Screen
        name="StepHistory"
        component={StepHistoryScreen}
        options={{title: 'Step History'}}
        />
        <Stack.Screen
        name="Leaderboard"
        component={LeaderboardScreen}
        options={{title: 'Leaderboard'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

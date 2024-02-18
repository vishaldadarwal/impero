// In App.js in a new project

import * as React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import { Color } from './src/Home/color';
import { List } from './src/Home/list';
import { Home } from './src/Home/home';

// axios.defaults.baseURL = "http://esptiles.imperoserver.in/api/API/"
// axios.defaults.baseURL = "https://api-shield.rukkor.dev/api/"


const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaView style={{flex:1}} >
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown:false
      }} >
        <Stack.Screen  name="Home" component={Home} />
        <Stack.Screen  name="List" component={List} />
        <Stack.Screen  name="Color" component={Color} />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
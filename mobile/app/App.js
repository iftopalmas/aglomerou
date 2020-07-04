
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import IdDispositivo from './componentes/IdDispositivo'
import Mapa from './componentes/Mapa'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="RegistrarDispositivo" component={IdDispositivo}
        options={{
          title: "Aglomerou"
        }}/>
        <Stack.Screen name="Mapa" component={Mapa} 
        options={{
          title: "Mapa de aglomeração"
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});

import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import IdDispositivo from './componentes/IdDispositivo';
import Mapa from './componentes/Mapa';
import TelaInicial from './componentes/TelaInicial';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="TelaInicial"
          component={TelaInicial}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="RegistrarDispositivo"
          component={IdDispositivo}
          options={{
            title: 'Aglomerou',
            headerStyle: {
              backgroundColor: '#E0FFFF',
            },
          }}
        />

        <Stack.Screen
          name="Mapa"
          component={Mapa}
          options={{
            title: 'Mapa de aglomeração',
            headerStyle: {
              backgroundColor: '#E0FFFF',
            },
          }}
        />
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
  },
});

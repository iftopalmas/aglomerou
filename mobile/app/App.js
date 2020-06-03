import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import IdDispositivo from './componentes/IdDispositivo';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <IdDispositivo/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import IdDispositivo from './componentes/IdDispositivo'
import LocalizacaoDispositivo from './componentes/LocalizacaoDispositivo'
export default function App() {
  return (
    <View style={styles.container}>
      <IdDispositivo />
      <LocalizacaoDispositivo/>
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

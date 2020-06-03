import React from 'react';
import { Text, View } from 'react-native';
import styles from './Estilos/EstiloApp';
import IdDispositivo from './componentes/IdDispositivo';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.textoTitulo}>Aglomerou Mobile</Text>
      <IdDispositivo />
    </View>
  );
}


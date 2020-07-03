
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import LocalizacaoDispositivo from './componentes/LocalizacaoDispositivo'
import MapView from 'react-native-maps';

export default function App() {
  return (
    <View style={styles.container}>
      <MapView 
        style={styles.mapStyle} 
        initialRegion={{
          latitude: -10.184510,
          longitude: -48.334660,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05
        }}>
        <MapView.Marker
          coordinate={{
            latitude: -10.184510,
            longitude: -48.334660,
          }}
        />
      </MapView>
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
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});

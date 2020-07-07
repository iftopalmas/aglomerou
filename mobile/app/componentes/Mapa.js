
import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { FontAwesome5 as Fa } from '@expo/vector-icons';

import LocalizacaoDispositivo from './LocalizacaoDispositivo'
import CarregandoLocalizacao from './CarregandoLocalizacao'
import {getLocalizacaoDispositivo} from '../utils/LocalizacaoDispositivo'

export default function App() {
  const [latitudeInicial, setLatitudeInicial] = useState(0)
  const [longitudeInicial, setLongitudeInicial] = useState(0)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const getLocalizaoInicial = async () => {          
      try {
          const {latitude, longitude} = await getLocalizacaoDispositivo()
          setLatitudeInicial(latitude);
          setLongitudeInicial(longitude);
          setLoading(false);
      } catch (error) {
          console.log(`Erro ao obter localização inicial: ${error}`)
          // Define a localização inicial como Praça dos Girassóis.
          setLatitudeInicial(-10.184510);
          setLongitudeInicial(-48.334660);
          setLoading(false)
      }        
    }

    getLocalizaoInicial()    
  }, [])

  return (
    <View style={styles.container}>
      {loading ? <CarregandoLocalizacao/> : (
        <MapView 
        style={styles.mapStyle} 
        initialRegion={{
          latitude: latitudeInicial,
          longitude: longitudeInicial,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05
        }}>
          
        <MapView.Marker
          coordinate={{
            latitude: latitudeInicial,
            longitude: longitudeInicial,
          }}
        >
          <Fa name="map-marker-alt" size={32} color="#e02041" />         
        </MapView.Marker>
      </MapView>
      )}
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
  },  
});

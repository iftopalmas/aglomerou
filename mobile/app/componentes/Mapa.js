import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import {
  FontAwesome5 as Fa,
  MaterialCommunityIcons as Mc,
} from '@expo/vector-icons';
import { Marker } from 'react-native-maps';
import MapView from 'react-native-map-clustering';

import {
  startLocationBackgroundUpdate,
  getLocalizacaoDispositivo,
  getLocalizacoesRecentes,
  getGeocodingLocalizacao,
  enviarLocalizacaoBackground
} from '../utils/LocalizacaoDispositivo';

import BarraPesquisa from './BarraPesquisaLocal';
import ModalMensagemMapa from './ModalMensagemMapa';

export default function App() {
  const [localizacoes, setLocalizacoes] = useState([]);
  const [localInicial, setLocalInicial] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [localizacaoBackground, setLocalizacaoBackground] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [localBuscado, setLocalBuscado] = useState({});
  const [loading, setLoading] = useState(true);
  const [longName, setLongName] = useState('Você está aqui');

  const mapRef = useRef();

  const moverMapa = async (novoLocal) => {
    console.log('movendo para o endereco recebido ->', novoLocal);

    const region = {
      latitude: novoLocal.lat,
      longitude: novoLocal.lng,
      latitudeDelta: 0.009,
      longitudeDelta: 0.009,
    };
    console.log('Atualiando markers. Novo local ->', novoLocal);

    mapRef.current.animateToRegion(region, 1200);

    const atualizaMarkers = await getMarkersRecentes();

    setLocalizacoes(atualizaMarkers);
  };

  const getMarkersRecentes = async () => {
    try {
      const locaisMarkers = await getLocalizacoesRecentes();
      return locaisMarkers;
    } catch (error) {
      console.log(
        'Não foi possível buscar as localizações para os markers: ',
        error
      );
      return error;
    }
  };

  // carrega localização e markers iniciais;
  useEffect(() => {
    let mounted = true;
    const moverMarkerBackground = async () => {
      try {
        const { latitude, longitude } = await enviarLocalizacaoBackground();
        setLocalizacaoBackground({
          latitude,
          longitude
        })
      } catch (error) {
        console.log(`Erro ao enviar ao atualizar marker ${error}`)
      }
    }
    const getLocalizaoInicial = async () => {
      try {
        const { latitude, longitude } = await getLocalizacaoDispositivo();

        if (mounted) {
          setLocalInicial({
            latitude,
            longitude,
          });
          setLoading(false);
        }
      } catch (error) {
        console.error(`Erro ao obter localização inicial: ${error}`);

        // Define a localização inicial como Praça dos Girassóis.
        if (mounted) {
          setLocalInicial({
            latitude: -10.18451,
            longitude: -48.33466,
          });

          setLoading(false);
        }
      }
    };

    const getMarkersIniciais = async () => {
      const markers = await getMarkersRecentes();

      if (mounted) {
        setLocalizacoes(markers);
      }
    };

    getLocalizaoInicial();
    getMarkersIniciais();
    moverMarkerBackground();

    return () => {
      mounted = false;
    };
  }, []);

  // Carrega markers
  useEffect(() => {
    let mounted = true;

    return () => {
      mounted = false;
    };
  }, []);

  // Inicia serviço de localização em background
  useEffect(() => {
    const start = async () => startLocationBackgroundUpdate();
    start();
  }, []);

  useEffect(() => {
    async function getLongNameNaLocalizacaoAtual() {
      try {
        setLongName(await getGeocodingLocalizacao());
      } catch (error) {
        console.log(error);
      }
    }

    getLongNameNaLocalizacaoAtual();
  }, []);
  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Carregando Mapa...</Text>
      ) : (
          <>
            <MapView
              ref={mapRef}
              style={styles.mapStyle}
              initialRegion={{
                latitude: localInicial.latitude,
                longitude: localInicial.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}
            >
              <Marker
                key="minha_localizacao"
                title={longName}
                coordinate={{
                  latitude: localizacaoBackground.latitude,
                  longitude: localizacaoBackground.longitude,
                }}
              >
                <Mc name="circle-slice-8" size={24} color="#0000FF" />
              </Marker>
              {localizacoes.length > 0 ? (
                localizacoes.map((local) => (
                  <Marker
                    key={local + Math.random()}
                    coordinate={{
                      latitude: parseFloat(local.latitude),
                      longitude: parseFloat(local.longitude),
                    }}
                  >
                    <Fa name="map-marker-alt" size={32} color="#e02041" />
                  </Marker>
                ))
              ) : (
                  <View />
                )}
            </MapView>
            <BarraPesquisa
              moverMapa={moverMapa}
              localizacaoInicial={localInicial}
            />
            <ModalMensagemMapa />
          </>
        )}
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

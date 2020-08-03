import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import {
  FontAwesome5 as Fa,
  MaterialCommunityIcons as Mc,
} from '@expo/vector-icons';
import { Marker } from 'react-native-maps';
import MapView from 'react-native-map-clustering';

import AsyncStorage from '@react-native-community/async-storage';

import { MODAL_MAP_MESSAGE_ITEM } from '../Constants';

import {
  startLocationBackgroundUpdate,
  getLocalizacaoDispositivo,
  getLocalizacoesRecentes,
  getGeocodingLocalizacao,
} from '../utils/LocalizacaoDispositivo';

import BarraPesquisa from './BarraPesquisaLocal';
import ModalMensagemMapa from './ModalMensagemMapa';
import BotaoNotificar from './BotaoNotificar';

export default function App() {
  const [localizacoes, setLocalizacoes] = useState([]);
  const [localInicial, setLocalInicial] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [loading, setLoading] = useState(true);
  const [longName, setLongName] = useState('Você está aqui');

  const [modalMensagem, setModalMensagem] = useState(false);

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

  useEffect(() => {
    let mounted = true;

    const checkModalVisto = async () => {
      const modalVisto = await AsyncStorage.getItem(MODAL_MAP_MESSAGE_ITEM);
      if (!modalVisto) {
        setModalMensagem(true);
      }
    };

    if (mounted) {
      checkModalVisto();
    }

    return () => {
      mounted = false;
    };
  }, []);

  const defineModalVisto = async () => {
    await AsyncStorage.setItem(MODAL_MAP_MESSAGE_ITEM, 'true');
    setModalMensagem(false);
  };

  return (
    <>
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
                latitude: localInicial.latitude,
                longitude: localInicial.longitude,
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
          <ModalMensagemMapa
            modalVisible={modalMensagem}
            fecharModal={defineModalVisto}
          />
          <BotaoNotificar/>
        </>
      )}
    </View>
    </>
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

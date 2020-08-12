import * as Location from 'expo-location';
import Constants from 'expo-constants';
import * as TaskManager from 'expo-task-manager';
import axios from 'axios';
import { REACT_NATIVE_GOOGLE_MAPS_API_KEY } from 'react-native-dotenv';
import { LOCATION_TASK_NAME } from '../Constants';
import api from '../service/api';

const uid = Constants.installationId;

const locationPermissionGranted = async () => {
  const { status } = await Location.requestPermissionsAsync();
  return status === 'granted';
};

const startLocationBackgroundUpdate = async () => {
  if (!(await locationPermissionGranted())) {
    console.error(
      'Não foi dada permissão para obter localização em background.'
    );
    return;
  }

  /*
  Deixa uma notificação ativa o tempo todo, mas consome mais recursos.
  A notificação deve ser deixada apenas no ambiente de desenvolvimento.
  O showsBackgroundLocationIndicator já deixa uma notificação menos
  personalizada que a localização está sendo obtida pelo app.
  */
  const foregroundService = {
    notificationTitle: 'Aglomerou?',
    notificationBody: 'Obtém localização anonimamente pra combate à COVID19.',
  };

  Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
    accuracy: Location.Accuracy.BestForNavigation, // Balanced
    timeInterval: 30000,
    showsBackgroundLocationIndicator: true,
    foregroundService,
  });
  console.log('Iniciando atualização de localização em background');
};

const getLocalizacaoDispositivo = async () => {
  if (!(await locationPermissionGranted())) {
    throw new Error(
      'A permissão para acessar a localização do dispositivo foi negada!'
    );
  }

  const location = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = location.coords;
  return { latitude, longitude };
};

const enviarLocalizacaoParaServidor = async (latitude, longitude) => {
  try {
    const url = `/localizacao/${uid}/${latitude}/${longitude}`;
    console.log(api.defaults.baseURL + url);
    const response = await api.post(url);
  } catch (error) {
    console.log(`Erro ao enviar localização: ${error}`);
  }
};

const enviarLocalizacaoBackground = async ({ data: { locations }, error }) => {
  if (error) {
    console.error(`Erro ao obter localização em background: ${error}`);
    return;
  }

  if (locations.length > 0) {
    const { latitude, longitude } = locations[0].coords;
    console.log('Enviando localização em background para o servidor');
    enviarLocalizacaoParaServidor(latitude, longitude);
  }
};

const getLocalizacoesRecentes = async () => {
  try {
    const { data } = await api.get('/localizacao/');
    console.log(
      `Obtido última localização de ${data.length} dispositivos ativos atualmente.`
    );

    return data;
  } catch (error) {
    console.error(
      `Erro ao obter última localização dos dispositivos ativos: ${error}`
    );
  }
};

const getGeocodingLocalizacao = async () => {
  const { latitude, longitude } = await getLocalizacaoDispositivo();
  const { data } = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${REACT_NATIVE_GOOGLE_MAPS_API_KEY}`
  );
  return data.results[1].address_components[1].long_name;
};

const enviarNotificacaoAglomeracao = async (estimativa, observacao) => {
  try {
    const { latitude, longitude } = await getLocalizacaoDispositivo();
    const body = {
      uid,
      latitude,
      longitude,
      estimativa_total_pessoas: estimativa,
      observacoes: observacao,
    };
    const url = `/notificacao`;
    console.log(api.defaults.baseURL + url);
    const response = await api.post(url, body);
  } catch (error) {
    console.log(error);
    console.log('Erro ao enviar notificação de aglomeração');
  }
};

TaskManager.defineTask(LOCATION_TASK_NAME, enviarLocalizacaoBackground);

export {
  getLocalizacaoDispositivo,
  enviarLocalizacaoParaServidor,
  enviarLocalizacaoBackground,
  locationPermissionGranted,
  startLocationBackgroundUpdate,
  getLocalizacoesRecentes,
  getGeocodingLocalizacao,
  enviarNotificacaoAglomeracao,
};

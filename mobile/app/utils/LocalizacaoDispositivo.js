import * as Location from 'expo-location';
import Constants from 'expo-constants';
import * as TaskManager from 'expo-task-manager';

const LOCATION_TASK_NAME = 'background-location-task';
const uid = Constants.installationId;
import api from '../service/api';

const getLocalizacaoDispositivo = async () => {
  try {
    const { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('A permissão para acessar a localização do dispositivo foi negada!');
      return;
    }

    const location = await Location.getCurrentPositionAsync();
    const { latitude, longitude } = location.coords
    return { latitude, longitude }
  } catch (error) {
    console.log(`Erro ao obter localização: ${error}`);
  }
};

const enviarLocalizacaoParaServidor = async (latitude, longitude) => {
  try {
    const url = `/localizacao/${uid}/${latitude}/${longitude}`;
    console.log(api.defaults.baseURL + url);
    const response = await api.post(url);
  } catch (error) {
    console.log(`Erro ao enviar localização: ${error}`);
  }
}

const enviarLocalizacaoBackground = async () => {
  const { status } = await Location.requestPermissionsAsync();
  if (status === 'granted') {
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.Balanced,
    });
  }
}

TaskManager.defineTask(LOCATION_TASK_NAME, enviarLocalizacaoBackground());

export { getLocalizacaoDispositivo, enviarLocalizacaoParaServidor, enviarLocalizacaoBackground };

import * as Location from 'expo-location';
import Constants from 'expo-constants';

const uid = Constants.installationId;
import api from '../service/api';


const latitude, longitude = 0

// retorna a posição atual do dispositivo
async function GetUserPosition(){      
  try {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
          setErrorMsg('A permissão para acessar a localização do dispositivo foi negada!');
          return;
      }

      const location = await Location.getCurrentPositionAsync();
      
      latitude = location.coords.latitude
      longitude = location.coords.latitude

      return {latitude, longitude}

  } catch (error) {
      console.log(`Erro ao obter localização: ${error}`);
      return;            
  }
};

async function sendUserPositionToServer(latitude, longitude){      
  try {
    const url = `/localizacao/${uid}/${latitude}/${longitude}`;
    console.log(api.defaults.baseURL+url);
    const response = await api.post(url);
  } catch (error) {
    console.log(`Erro ao enviar localização: ${error}`);
    return;    
  }
}

export {GetUserPosition, sendUserPositionToServer};
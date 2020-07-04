import * as Location from 'expo-location';
import Constants from 'expo-constants';

const uid = Constants.installationId;
import api from '../service/api';

// retorna a posição atual do dispositivo
async function CarregarLocalDoDispositivo(){      
  try {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
          setErrorMsg('A permissão para acessar a localização do dispositivo foi negada!');
          return;
      }

      const location = await Location.getCurrentPositionAsync();
      const {latitude, longitude} = location.coords
      return {latitude, longitude}
  } catch (error) {
      console.log(`Erro ao obter localização: ${error}`);
      return;            
  }
};

// enviar uma posição para o servidor
async function enviarLocalizacaoParaServidor(latitude, longitude){      
  try {
    const url = `/localizacao/${uid}/${latitude}/${longitude}`;
    console.log(api.defaults.baseURL+url);
    const response = await api.post(url);

  } catch (error) {
    console.log(`Erro ao enviar localização: ${error}`);
    return;    
  }
}

export {CarregarLocalDoDispositivo, enviarLocalizacaoParaServidor};
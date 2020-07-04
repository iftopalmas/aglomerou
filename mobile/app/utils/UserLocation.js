import * as Location from 'expo-location';

// retorna a posição atual do dispositivo
async function GetUserPosition(){      
 
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


export default GetUserPosition;
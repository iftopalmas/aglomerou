import AsyncStorage from '@react-native-community/async-storage';
import { CAPTCHA_STORAGE_ITEM } from '../Constants';

export const verificaRegistrado = async () => {
  console.log('Verificando registro do dispositivo!');
  try {
    const captcha = await AsyncStorage.getItem(CAPTCHA_STORAGE_ITEM);
    if (captcha) {
      return true;
    }
    console.log('Registro não encontrado. Redirecionando para registro.');
    return false;
  } catch (error) {
    console.error(`Erro ao buscar código captcha: ${error}`);
    return error.message;
  }
};

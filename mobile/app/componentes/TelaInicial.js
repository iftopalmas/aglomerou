/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { FontAwesome5 as Fa } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { CAPTCHA_STORAGE_ITEM } from '../Constants';

import ModalRegistroPermissoes from './ModalRegistroPermissoes';

import logo from '../mobileAssets/logo.png';
import inicialSplash from '../mobileAssets/inicialSplash.png';

const TelaInicial = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [registrado, setRegistrado] = useState(false);

  const fecharModal = () => {
    setModalVisible(!modalVisible);
    navegarPaginas('Mapa');
  };

  const navegarPaginas = (destino) => {
    console.log(destino);
    navigation.navigate(destino);
  };

  const verificaRegistrado = async () => {
    try {
      const captcha = await AsyncStorage.getItem(CAPTCHA_STORAGE_ITEM);
      if (captcha && captcha.length > 0) {
        setRegistrado(true);
      }
    } catch (error) {
      console.error(`Erro ao buscar código captcha: ${error}`);
    }
  };

  // verifica se o dispositivo já está registrado
  useEffect(() => {
    verificaRegistrado();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Image style={styles.logo} source={logo} />
        <Text style={styles.welcomeText}>Seja bem vindo(a)!</Text>
        <View style={styles.infoBoxContainer}>
          <Text style={styles.infoBoxText}>
            O <Text style={styles.boldText}>Aglomerou?</Text> coleta dados de
            localização dos dispositivos de forma{' '}
            <Text style={styles.boldText}>completamente anônima</Text> e exibe
            pra você em tempo real pontos de aglomeração espalhados pela cidade.
          </Text>
        </View>
        <Image
          style={styles.splash}
          source={inicialSplash}
          resizeMethod="resize"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            registrado
              ? navigation.navigate('Mapa')
              : setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.buttonContainer}>
            <View style={styles.buttonIconContainer}>
              <Fa name="sign-in-alt" size={22} color="#fff" />
            </View>
            <View style={styles.buttonTextContainer}>
              <Text style={styles.buttonText}>entrar</Text>
            </View>
          </View>
        </TouchableOpacity>
        <Text style={styles.infoText}>
          O "Aglomerou?" se preocupa com a sua privacidade. Nenhum dado pessoal
          será coletado durante o uso do app!
        </Text>
      </View>
      <ModalRegistroPermissoes
        modalVisible={modalVisible}
        fecharModal={fecharModal}
        navegarPaginas={navegarPaginas}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: hp('4%'),
    paddingHorizontal: wp('2%'),
  },

  logo: {
    width: 305,
    height: 74,
    marginTop: hp('2%'),
  },

  welcomeText: {
    fontSize: hp('3%'),
    fontWeight: '500',
    color: '#41414D',
    marginTop: 16,
    marginBottom: 16,
  },

  infoBoxContainer: {
    width: 301,
    height: hp('24%'),
    backgroundColor: '#94D451',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    marginTop: hp('3%'),
    marginBottom: hp('4%'),
    overflow: 'hidden',
  },

  infoBoxText: {
    fontSize: 22,
    lineHeight: 24,
    textAlign: 'center',
    color: '#FEFDFD',
  },

  boldText: {
    fontWeight: 'bold',
  },

  splash: {
    height: hp('24%'),
  },

  buttonContainer: {
    width: 160,
    height: 40,

    marginTop: hp('4%'),
    marginBottom: hp('3%'),

    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  buttonIconContainer: {
    backgroundColor: '#47820A',
    height: '100%',
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',

    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },

  buttonTextContainer: {
    backgroundColor: '#94D451',
    height: '100%',
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',

    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },

  buttonText: {
    fontSize: 22,
    fontWeight: '500',
    color: '#FFF',
  },

  infoText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#41414d',
    textAlign: 'center',
    opacity: 0.6,
  },
});

export default TelaInicial;

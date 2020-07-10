import React, { useState } from 'react';

import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';

import { FontAwesome5 as Fa } from '@expo/vector-icons';

import { locationPermissionGranted } from '../utils/LocalizacaoDispositivo';

import registroSplash from '../mobileAssets/registroSplash.png';
import pronto from '../mobileAssets/pronto.png';

import IdDispositivo from './IdDispositivo';

const ModalRegistroPermissoes = ({ modalVisible, fecharModal }) => {
  const [verCaptcha, setVerCaptcha] = useState(false);
  const [permissoes, setPermissoes] = useState(false);

  const definirPermissoes = () => {
    locationPermissionGranted();
    setPermissoes(true);
  };

  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => {
        fecharModal();
      }}
    >
      <View style={styles.container}>
        <Text style={styles.title}> Permissões Necessárias!</Text>
        <View style={styles.infoBoxContainer}>
          <Text style={styles.infoBoxText}>
            Para ajudar no combate à COVID19, é preciso conceder ao Alogmerou? o
            acesso a sua localização. Nenhuma informação pessoal como nome ou
            número de telefone será coletada, apenas sua localização. Os dados
            não são identificados e serão utilizados única e exclusivamente para
            fornecer um serviço de utilidade pública.
          </Text>
        </View>
        {permissoes && <Text style={styles.title}>Tudo pronto!</Text>}
        <View style={styles.imageContainer}>
          {permissoes ? (
            <Image style={styles.prontoSplash} source={pronto} />
          ) : (
            <Image style={styles.registroSplash} source={registroSplash} />
          )}
        </View>

        {permissoes ? (
          <TouchableOpacity
            onPress={() => {
              fecharModal();
            }}
          >
            <View style={btnProxStyles.container}>
              <View style={btnProxStyles.iconContainer}>
                <Fa name="check-square" size={22} color="#fff" />
              </View>
              <View style={btnProxStyles.textContainer}>
                <Text style={btnProxStyles.text}>prosseguir</Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setVerCaptcha(true);
            }}
          >
            <View style={btnConcStyles.container}>
              <View style={btnConcStyles.textContainer}>
                <Text style={btnConcStyles.text}>eu concordo</Text>
              </View>
              <View style={btnConcStyles.iconContainer}>
                <Fa name="thumbs-up" size={22} color="#fff" />
              </View>
            </View>
          </TouchableOpacity>
        )}

        <Text style={styles.MinfoText}>
          Não se preocupe, seus dados pessoais não serão coletados. Nos
          preocupamos com a sua privacidade!
        </Text>
      </View>
      {verCaptcha && <IdDispositivo definirPermissoes={definirPermissoes} />}
    </Modal>
  );
};
const btnProxStyles = StyleSheet.create({
  container: {
    width: 190,
    height: 40,
    marginTop: 26,
    marginBottom: 26,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: '#47820A',
    height: '100%',
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  textContainer: {
    backgroundColor: '#94D451',
    height: '100%',
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  text: {
    fontSize: 22,
    fontWeight: '600',
    color: '#FFF',
  },
});

const btnConcStyles = StyleSheet.create({
  container: {
    width: 190,
    height: 40,
    marginTop: 36,
    marginBottom: 26,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: '#47820A',
    height: '100%',
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  textContainer: {
    backgroundColor: '#94D451',
    height: '100%',
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',

    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  text: {
    fontSize: 22,
    fontWeight: '500',
    color: '#FFF',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },

  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#41414d',
    textAlign: 'center',
    opacity: 0.7,
  },
  infoBoxContainer: {
    padding: 5,
    marginTop: 26,
    marginBottom: 26,
  },

  infoBoxText: {
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
    color: '#41414D',
  },

  imageContainer: {
    height: 220,
    justifyContent: 'center',
    marginTop: 10,
  },
  registroSplash: {},
  prontoSplash: {
    width: 160,
    height: 160,
  },
  infoText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#41414d',
    textAlign: 'center',
    opacity: 0.6,
  },

  MinfoBoxContainer: {
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    marginTop: 40,
    marginBottom: 40,
  },

  MinfoBoxText: {
    fontSize: 20,
    lineHeight: 26,
    textAlign: 'center',
    color: '#41414D',
  },

  MboldText: {
    fontWeight: 'bold',
  },

  Msplash: {},

  MinfoText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#41414d',
    textAlign: 'center',
    opacity: 0.6,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'red',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ModalRegistroPermissoes;

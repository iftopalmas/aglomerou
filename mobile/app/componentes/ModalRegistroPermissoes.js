import React, { useState } from 'react';

import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { FontAwesome5 as Fa } from '@expo/vector-icons';

import { locationPermissionGranted } from '../utils/LocalizacaoDispositivo';

import registroSplash from '../mobileAssets/registroSplash.png';
import prontoSplash from '../mobileAssets/prontoSplash.png';

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
            Para ajudar no combate à COVID19, é preciso conceder ao "Aglomerou?"
            o acesso a sua localização. Nenhuma informação pessoal como nome ou
            número de telefone será coletada, apenas sua localização. Os dados
            não são identificados e serão utilizados única e exclusivamente para
            fornecer um serviço de utilidade pública.
          </Text>
        </View>
        {permissoes && <Text style={styles.title}>Tudo pronto!</Text>}
        <View style={styles.imageContainer}>
          {permissoes ? (
            <Image
              style={styles.prontoSplash}
              source={prontoSplash}
              resizeMode="contain"
            />
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

        <Text style={styles.infoText}>
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
    paddingHorizontal: wp('3%'),
  },

  title: {
    fontSize: hp('3.4%'),
    fontWeight: '600',
    color: '#41414d',
    textAlign: 'center',
    opacity: 0.7,
  },
  infoBoxContainer: {
    padding: wp('2%'),
    marginTop: hp('1.5%'),
    marginBottom: 26,
  },

  infoBoxText: {
    fontSize: hp('2.4%'),
    lineHeight: 24,
    textAlign: 'center',
    color: '#41414D',
  },

  imageContainer: {
    height: hp('25%'),
    justifyContent: 'center',
    marginTop: hp('1.1%'),
    marginBottom: hp('2.1%'),
  },
  registroSplash: {},
  prontoSplash: {
    height: hp('22%'),
    width: wp('48%'),
  },
  infoText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#41414d',
    textAlign: 'center',
    opacity: 0.6,
    marginTop: hp('1%'),
  },
});

export default ModalRegistroPermissoes;

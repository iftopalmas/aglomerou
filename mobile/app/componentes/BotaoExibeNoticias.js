import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import ModalLinksNoticias from './ModalLinksNoticias';

export default function BotaoExibeNoticias() {
  const [modalLinksNoticias, setModalLinksNoticias] = useState(false);
  const notificar = () => {
    setModalLinksNoticias(true);
  };

  const closeModal = () => {
    setModalLinksNoticias(false);
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={notificar} style={styles.button}>
          <View>
            <Text style={styles.texth}>Mantenha-se informado!</Text>
            <Text style={styles.textd}>
              Acesse as notícias sobre a COVID-19.
            </Text>
          </View>
          <View style={styles.rightIcon}>
            <AntDesign name="right" size={30} color="#326002" />
          </View>
        </TouchableOpacity>
      </View>
      <ModalLinksNoticias
        modalVisible={modalLinksNoticias}
        closeModal={closeModal}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: '15%',
    left: '2%',
    right: '2%',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
    width: '100%',
  },
  textd: {
    color: '#326002',
  },
  texth: {
    fontWeight: 'bold',
    color: '#326002',
  },
  rightIcon: {
    position: 'absolute',
    right: '2%',
    alignItems: 'flex-end',
    alignSelf: 'center',
  },
});

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import ModalFormNotificao from './ModalFormNotificacao';

export default function BotaoNotificar() {
  const [modalFromModificao, setModalFromNotificacao] = useState(false);
  const notificar = () => {
    setModalFromNotificacao(true);
  };

  const closeModal = () => {
    setModalFromNotificacao(false);
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={notificar} style={styles.button}>
          <View>
            <Text style={styles.texth}>Ajude no combate ao Coronavírus.</Text>
            <Text style={styles.textd}>Notifique aglomeração!</Text>
          </View>
          <View style={styles.rightIcon}>
            <AntDesign name="right" size={30} color="#326002" />
          </View>
        </TouchableOpacity>
      </View>
      <ModalFormNotificao
        modalVisible={modalFromModificao}
        closeModal={closeModal}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute', // use absolute position to show button on top of the map
    bottom: '4%',
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

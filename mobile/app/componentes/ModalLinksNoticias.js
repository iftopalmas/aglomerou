import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';

export default function ModalLinksNoticias({ modalVisible, closeModal }) {
  const handlePainelCoronavirus = () => {
    WebBrowser.openBrowserAsync('https://covid.saude.gov.br/');
  };
  const handlePalmasCoronavirus = () => {
    WebBrowser.openBrowserAsync('https://coronavirus.palmas.to.gov.br/');
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          closeModal();
        }}
      >
        <TouchableOpacity
          style={styles.container}
          activeOpacity={1}
          onPressOut={() => {
            closeModal();
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text>Painel Coronavírus</Text>
              <Button
                title="Painel Coronavírus"
                id="1"
                onPress={handlePainelCoronavirus}
                style={styles.button}
              />
              <Text>Coronavírus Palmas</Text>
              <Button
                title="Painel Coronavírus"
                id="2"
                onPress={handlePalmasCoronavirus}
                style={styles.button}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    alignSelf: 'flex-start',
    color: '#326002',
    fontWeight: 'bold',
    marginTop: 5,
  },
  input: {
    backgroundColor: '#eee',
    alignSelf: 'stretch',
    textAlign: 'left',
    margin: 10,
    padding: 10,
    borderRadius: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  openButton: {
    backgroundColor: '#94D451',
    borderRadius: 20,
    padding: 15,
    elevation: 5,
    margin: 10,
    width: 250,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
  },
  modalText: {
    marginBottom: 5,
    textAlign: 'center',
    color: '#41414d',
  },
});

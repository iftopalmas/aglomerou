import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';

const newsLinks = [
  {
    id: 1,
    name: 'Ministério da Saúde',
    url: 'https://covid.saude.gov.br/',
  },
  {
    id: 2,
    name: 'Secretaria de Saúde - Palmas',
    url: 'https://coronavirus.palmas.to.gov.br/',
  },
  {
    id: 3,
    name: 'BBC News Brasil - Saúde',
    url: 'https://www.bbc.com/portuguese/topics/c340q430z4vt',
  },
  {
    id: 4,
    name: 'Exame - Notícias sobre Coronavírus',
    url: 'https://exame.com/noticias-sobre/coronavirus/',
  },
  {
    id: 5,
    name: 'G1 - Bem Estar',
    url: 'https://g1.globo.com/bemestar/coronavirus/',
  },
  {
    id: 6,
    name: 'Saúde Brasil - Dicas práticas',
    url: 'https://saudebrasil.saude.gov.br/',
  },
];
export default function ModalLinksNoticias({ modalVisible, closeModal }) {
  const handlePressButtonAsync = (site) => {
    WebBrowser.openBrowserAsync(site);
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
              <Text style={styles.titulo}>Veja as últimas notícias</Text>
              <FlatList
                data={newsLinks}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.card}
                    onPress={() => {
                      handlePressButtonAsync(item.url);
                    }}
                  >
                    <Text style={styles.text}>{item.name}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => String(item.id)}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16,
  },
  card: {
    margin: 20,
    backgroundColor: '#94D451',
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
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 16,
    color: '#fff',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

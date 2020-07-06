import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from "lottie-react-native";

import * as locationAnimation from "../animations/load-location.json";

const CarregandoLocalizacao = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.loadingText}>Carregando sua Localização...</Text>
      <LottieView
              style={{
                width: 520,
                height: 230,
              }}
              source={locationAnimation}
              autoPlay={true}
              speed={1}
            />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingText: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#41414d',
    opacity: 0.8,
  }
});

export default CarregandoLocalizacao;

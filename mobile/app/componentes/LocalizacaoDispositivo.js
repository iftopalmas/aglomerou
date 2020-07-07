import React, {Component} from "react";
import {View, StyleSheet, Text} from "react-native";

import {startLocationBackgroundUpdate} from "../utils/LocalizacaoDispositivo";

export default class LocalizacaoDispositivo extends Component {
  componentDidMount() {
    startLocationBackgroundUpdate();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Carregando localização do dispositivo.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});

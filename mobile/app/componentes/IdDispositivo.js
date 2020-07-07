import React, {Component} from "react";
import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import Constants from "expo-constants";
import ConfirmGoogleCaptcha from "react-native-google-recaptcha-v2";
import AsyncStorage from "@react-native-community/async-storage";
import api from "../service/api";
import {CAPTCHA_STORAGE_ITEM} from "../Constants";

const siteKey = "6LfKeq0ZAAAAAN7kg0S29sdPSnM-ZCJcFr7h8E2G";
const baseUrl = "http://aglomerou.ifto.edu.br";

console.log(
  "addressApiAglomerou: ",
  Constants.manifest.extra.addressApiAglomerou
);

export default class IdDispositivo extends Component {
  constructor(props) {
    super(props);
    this.navegaPage = this.navegaPage.bind(this);
    this.state = {
      captcha: null,
    };
  }

  componentDidMount() {
    this.verificarExisteCodigoCaptcha();
  }

  verificarExisteCodigoCaptcha = async () => {
    try {
      const captcha = await AsyncStorage.getItem(CAPTCHA_STORAGE_ITEM);
      if (captcha && captcha.length > 0) {
        this.navegaPage();
      } else {
        this.mostrarCaptcha();
      }
    } catch (error) {
      console.error(`Erro ao buscar código captcha: ${error}`);
    }
  };

  salvarCodigoCaptchaLocalmente = async (captcha) => {
    try {
      await AsyncStorage.setItem(CAPTCHA_STORAGE_ITEM, captcha);
    } catch (e) {
      console.error(`Erro ao salvar código captcha: ${error}`);
    }
  };

  navegaPage() {
    this.props.navigation.navigate("Mapa");
  }

  mostrarCaptcha = async () => {
    this.captchaForm.show();
  };

  onMessage = async (event) => {
    const captcha = event?.nativeEvent?.data;
    if (!captcha) {
      return;
    }

    if (["cancel", "error", "expired"].includes(captcha)) {
      setTimeout(() => this.captchaForm.hide(), 5000);
      return;
    }

    this.setState({captcha});
    setTimeout(() => this.captchaForm.hide(), 1500);
    const uid = Constants.installationId;
    const tipo = Constants.deviceName;

    try {
      const url = `/dispositivo/${uid}/${tipo}`;
      console.log(`\n${api.defaults.baseURL}${url}\n`);
      const response = await api.post(url, {captcha});
    } catch (error) {
      console.error(`Erro ao registrar dispositivo: ${error}`);
    }

    this.salvarCodigoCaptchaLocalmente(captcha);
    this.navegaPage();
  };

  render() {
    return (
      <View style={styles.container}>
        <ConfirmGoogleCaptcha
          ref={(_ref) => (this.captchaForm = _ref)}
          siteKey={siteKey}
          baseUrl={baseUrl}
          languageCode="pt-BR"
          onMessage={this.onMessage}
        />
        <Text style={styles.text}>Projeto Aglomerou</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={this.verificarExisteCodigoCaptcha}>
          <Text>Ir para o mapa</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B0E0E6",
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontSize: 20,
    color: "#524123",
  },

  button: {
    alignItems: "center",
    backgroundColor: "#800000",
    padding: 10,
    fontSize: 20,
    borderRadius: 10,
  },
});

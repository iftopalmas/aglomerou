import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import ConfirmGoogleCaptcha from 'react-native-google-recaptcha-v2';

const siteKey = '6Lf41K0UAAAAAHd3FeZbJsMbL00-Beqyk33NHqtp';
const baseUrl = 'https://google.com';

export default class App extends React.Component {
  state = {
    codigoVerificacao: null,
  };

  onMessage = event => {
    if (event && event.nativeEvent.data) {
      if (['Cancelar', 'error', 'expired'].includes(event.nativeEvent.data)) {
        this.captchaForm.hide();
        return;
      } 
      
      console.log('Código de verificação do Google', event.nativeEvent.data);
      this.setState({ codigoVerificacao: event.nativeEvent.data });
      setTimeout(() => this.captchaForm.hide(), 1500);      
    }
  };

  render() {
    const { codigoVerificacao } = this.state;
    return (
      <View style={styles.container}>
        <ConfirmGoogleCaptcha
          ref={_ref => (this.captchaForm = _ref)}
          siteKey={siteKey}
          baseUrl={baseUrl}
          languageCode="pt-BR"
          onMessage={this.onMessage}
        />

        <TouchableOpacity
          onPress={() => this.captchaForm.show()}>
          <Text style={styles.paragraph}>Clicar</Text>
        </TouchableOpacity>

        <Text style={styles.texto}>
          Seu código de verificação: 
          {codigoVerificacao}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
    alignItems: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#ecf0f1'
  },
  texto:{
    color: 'darkviolet', 
    fontWeight: 'bold',
    alignItems: 'center',
  }
});

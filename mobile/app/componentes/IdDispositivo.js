import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import ConfirmGoogleCaptcha from 'react-native-google-recaptcha-v2';

const siteKey = '6Lf41K0UAAAAAHd3FeZbJsMbL00-Beqyk33NHqtp';
const baseUrl = 'https://google.com';
import api from '../service/api';

console.log("addressApiAglomerou: ", Constants.manifest.extra.addressApiAglomerou)

export default class IdDispositivo extends Component {
    constructor(props){
        super(props);
        this.navegaPage = this.navegaPage.bind(this);
        this.state = { captchaCodigo: null };
    }

    componentDidMount() {
        this.dispositivos();
    }

    navegaPage(){
        this.props.navigation.navigate('Mapa');
    }
    onMessage = event => {
        if (event && event.nativeEvent.data) {
            if (['cancel', 'error', 'expired'].includes(event.nativeEvent.data)) {
                this.captchaForm.hide();
                return;
            } 
            
            console.log('Código de verificação', event.nativeEvent.data);
            this.setState({ captchaCodigo: event.nativeEvent.data });
            const uid = Constants.installationId;
            const tipo = Constants.deviceName;
            const codigoVerificacao = captchaCodigo;
            try {
                const url = `/dispositivo/${uid}/${tipo}/${codigoVerificacao}`;
                console.log(api.defaults.baseURL+url);
                const response = await api.post(url);
            } catch (error) {
                console.log(`Erro ao registrar dispositivo: ${error}`);
            }
            this.navegaPage();
            setTimeout(() => {this.captchaForm.hide()}, 500);
        }
    };       

    render() {
        return (
            <View style={styles.container}>
                <ConfirmGoogleCaptcha
                    ref={_ref => (this.captchaForm = _ref)}
                    siteKey={siteKey}
                    baseUrl={baseUrl}
                    languageCode="pt-BR"
                    onMessage={this.onMessage}
                />
                <Text>Projeto Aglomerou</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

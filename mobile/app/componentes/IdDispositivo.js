import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import ConfirmGoogleCaptcha from 'react-native-google-recaptcha-v2';

const siteKey = '6Lf41K0UAAAAAHd3FeZbJsMbL00-Beqyk33NHqtp';
const baseUrl = 'https://google.com';
import api from '../service/api';

console.log("addressApiAglomerou: ", Constants.manifest.extra.addressApiAglomerou)

export default class IdDispositivo extends Component {
    constructor(props) {
        super(props);
        this.navegaPage = this.navegaPage.bind(this);
        this.state = { 
            captcha: null 
        };
    }

    componentDidMount() {
        this.mostrarCaptcha()
    }

    navegaPage() {
        this.props.navigation.navigate('Mapa');
    }

    onMessage = async event => {
        const captcha = event?.nativeEvent?.data;
        if (!captcha) {
            return;
        }

        if (['cancel', 'error', 'expired'].includes(captcha)) {
            this.captchaForm.hide();
            return;
        } 
        
        this.setState({ captcha });
        setTimeout(() => this.captchaForm.hide(), 1500);
        const uid = Constants.installationId;
        const tipo = Constants.deviceName;
        
        try {
            const url = `/dispositivo/${uid}/${tipo}`;
            console.log(`\n${api.defaults.baseURL}${url}\n`);
            const response = await api.post(url, { captcha });
        } catch (error) {
            console.log(`Erro ao registrar dispositivo: ${error}`);
        }

        this.navegaPage();             
    };

    
    mostrarCaptcha = async () => {
        this.captchaForm.show();
    }

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

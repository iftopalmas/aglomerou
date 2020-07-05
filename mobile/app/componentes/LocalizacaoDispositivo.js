import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import {getLocalizacaoDispositivo, enviarLocalizacaoParaServidor, enviarLocalizacaoBackground} from '../utils/LocalizacaoDispositivo'

export default class LocalizacaoDispositivo extends Component {
    
    componentDidMount() {
        setInterval(this.enviarLocalizacaoParaServidor, 30000);
    }

    enviarLocalizacaoParaServidor = async () => {
        const {latitude, longitude} = await getLocalizacaoDispositivo();
        enviarLocalizacaoParaServidor(latitude, longitude);
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Text>Obtendo a localização do dispositivo</Text>
            </View>
        );
    }
};
    
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

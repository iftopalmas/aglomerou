import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import {carregarLocalDispositivo, enviarLocalizacaoParaServidor} from '../utils/LocalizacaoUsuario'

export default class LocalizacaoDispositivo extends Component {
    
    componentDidMount() {
        setInterval(async () => {
            const {latitude, longitude} = await carregarLocalDispositivo()
            enviarLocalizacaoParaServidor(latitude, longitude)
        }, 30000);
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

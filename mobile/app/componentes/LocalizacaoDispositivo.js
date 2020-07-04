import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import {CarregarLocalDoDispositivo, enviarLocalizacaoParaServidor} from '../utils/UserLocation'

export default class LocalizacaoDispositivo extends Component {
    
    componentDidMount() {
        setInterval(async () => {
            const {latitude, longitude} = await CarregarLocalDoDispositivo()
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

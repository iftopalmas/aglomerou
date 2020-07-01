import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';

import api from '../service/api';

export default class LocalizacaoDispositivo extends Component {
    
    componentDidMount() {
        this.localizacao();
        setInterval(() => this.localizacao(), 30000);
    }
    
    localizacao = async () => {        
        try {
            const { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('A permissão para acessar a localização do dispositivo foi negada!');
                return;
            }
            const uid = Constants.installationId;
            const location = await Location.getCurrentPositionAsync();
            const {latitude, longitude} = location.coords;
            const url = `/localizacao/${uid}/${latitude}/${longitude}`;
            console.log(api.defaults.baseURL+url);
            const response = await api.post(url);
        } catch (error) {
            console.log(`Erro ao obter localização: ${error}`);
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Obtendo a localização do dispositivo</Text>
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

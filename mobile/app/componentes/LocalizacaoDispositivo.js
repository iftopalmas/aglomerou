import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';

import api from '../service/api';

export default class LocalizacaoDispositivo extends Component {

    componentDidMount() {
        setInterval(() => this.localizacao(), 30000);
    }
    
    localizacao = async () => {
        const { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('A permissão para acessar a localização do dispositivo foi negada!');
            return;
        }

        const uid = Constants.installationId;
        const location = await Location.getLastKnownPositionAsync();
        try {
            const {latitude, longitude} = location.coords;
            const response = await api.post(`/localizacao/${uid}/${latitude}/${longitude}`);
            if (__DEV__) {
                console.log(`Enviando localização: UID ${uid} Lat/Long: ${latitude}/${longitude}`);
            }
        } catch (error) {
            alert(error);
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

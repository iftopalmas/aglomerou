import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import api from '../service/api';

console.log("addressApiAglomerou: ", Constants.manifest.extra.addressApiAglomerou)

export default class IdDispositivo extends Component {

    componentDidMount() {
        this.dispositivos();
    }

    dispositivos = async () => {
        const uid = Constants.installationId;
        const tipo = Constants.deviceName;
        try {
            const url = `/dispositivo/${uid}/${tipo}`;
            console.log(api.defaults.baseURL+url);
            const response = await api.post(url);
        } catch (error) {
            console.log(`Erro ao registrar dispositivo: ${error}`);
        }
    };

    render() {
        return (
            <View style={styles.container}>
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

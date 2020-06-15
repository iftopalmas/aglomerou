import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import api from '../service/api';


export default class IdDispositivo extends Component {

    componentDidMount() {
        this.dispositivos();
    }

    dispositivos = async () => {
        const idDispositivo = Constants.installationId;
        const tipoDispositivo = Constants.deviceName;
        console.log(`Registrando dispositivo: UID ${idDispositivo} Tipo: ${tipoDispositivo}`);
        try {
            const response = await api.post('/dispositivo/' + idDispositivo + '/' + tipoDispositivo + '');
        } catch (error) {
            alert('Erro ' + error);
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

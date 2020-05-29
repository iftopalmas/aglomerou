import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';

export default function idDispositivo() {
    let idDispositivo = Constants.installationId;
    return (
        <View>
            <Text style={estilo.texto}>Id: {idDispositivo}</Text>
        </View>
    );
}
const estilo = StyleSheet.create({
    texto: {
        color: '#e234ae',
        fontSize: 20,
        justifyContent: 'center'
    }
});
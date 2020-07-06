import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { startLocationBackgroundUpdate } from '../utils/LocalizacaoDispositivo'

export default class LocalizacaoDispositivo extends Component {
    
    componentDidMount() {
        startLocationBackgroundUpdate();
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

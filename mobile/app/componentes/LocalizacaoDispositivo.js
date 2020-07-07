import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from "lottie-react-native";

import * as locationAnimation from "../animations/send-location.json";

import { startLocationBackgroundUpdate } from '../utils/LocalizacaoDispositivo'

export default class LocalizacaoDispositivo extends Component {
    
    componentDidMount() {
        startLocationBackgroundUpdate();
    }
    
    render() {
        return (
            <View style={styles.container}>
                <LottieView
                    style={{
                        width: 48,
                        height: 48,
                    }}
                    source={locationAnimation}
                    autoPlay={true}
                    speed={.3}
                />
            </View>
        );
    }
};    

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5,
        position: "absolute",
        bottom: 20,
        right: 20,
    },
});

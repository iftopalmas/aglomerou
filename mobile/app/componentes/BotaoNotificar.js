import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity } from 'react-native';
import {
  AntDesign
} from '@expo/vector-icons';

export default function BotaoNotificar(){
  const notificar = () => {
    console·log("!!!notificando aglomeração!!!")
  }
  
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={notificar}
        style={styles.button}
      >

        <View>
          <Text style={styles.texth}>Ajude no combate ao Corona Vírus.</Text>
          <Text style={styles.textd}>Notifique aglomeração!</Text>
        </View>
        <View style={styles.rightIcon}>
          <AntDesign name="right" size={30} color="#326002"/>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',//use absolute position to show button on top of the map
    bottom: '2%',
    left: '2%',
    right: '2%',
    alignSelf: 'center' 
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
    width: '100%'
  },
  textd: {
    color: '#326002'
  },
  texth: {
    fontWeight: 'bold',
    color: '#326002'
  },
  rightIcon: {
    position: 'absolute',
    right: '2%',
    alignItems: 'flex-end',
  },
})

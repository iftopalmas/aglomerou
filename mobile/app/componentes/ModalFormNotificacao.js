import React, { useState } from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    View,
} from 'react-native';
import { enviarNotificacaoAglomeracao } from '../utils/LocalizacaoDispositivo';

export default function ModalFormNotificacao({ modalVisible, closeModal}){
    const [observacao, setObservacao] = useState('')
    const [estimativa, setEstimativa] = useState('')

    return (
        <View style={styles.centeredView}>
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            }}
            >
                <TouchableOpacity
                    style={styles.container}
                    activeOpacity={1}
                    onPressOut={() => {
                        closeModal()
                    }}
                >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.label}>Estimativa de pessoas</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Número de pessoas no local"
                            numeric
                            keyboardType={'numeric'}
                            onChangeText={number => setEstimativa(number)}
                        />
                        <Text style={styles.label}>Observação</Text>
                        <TextInput 
                            style={styles.input}
                            placeholder="(Opicional)"
                            multiline={true}
                            value={observacao} 
                            onChangeText={text => setObservacao(text)}/>

                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: '#94D451' }}
                            onPress={() => {
                                if(estimativa != ''){
                                    const enviarNotificacao = async () => {
                                        try {
                                                await enviarNotificacaoAglomeracao(estimativa, observacao);
                                        } catch (error) {
                                            console.log(`Error ao enviar notificação: ${error}`);
                                        }
                                    }
                                    enviarNotificacao();
                                }
                                setObservacao('')
                                setEstimativa('')
                                closeModal()
                            }}
                        >
                            <Text style={styles.textStyle}>Enviar notificação</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        alignSelf: 'flex-start',
        color: '#326002',
        fontWeight: 'bold',
        marginTop: 5, 
    },
    input: {
        backgroundColor: '#eee',
        alignSelf: 'stretch',
        textAlign: 'left',
        margin: 10,
        padding: 10,
        borderRadius: 20,
    },
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
    },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
    },
    openButton: {
        backgroundColor: '#94D451',
        borderRadius: 20,
        padding: 15,
        elevation: 5,
        margin: 10,
        width: 250,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 15,
    },
    modalText: {
        marginBottom: 5,
        textAlign: 'center',
        color: '#41414d',
    },
});
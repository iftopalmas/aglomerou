import React, { useState } from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Picker,
} from 'react-native';
import { enviarNotificacaoAglomeracao } from '../utils/LocalizacaoDispositivo';

export default function ModalFormNotificacao({ modalVisible, closeModal }) {
    const [observacao, setObservacao] = useState('')
    const [estimativa, setEstimativa] = useState('')
    const [estimativaPicker, setEstimativaPicker] = useState('');
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
                    style={styles.containerTouchable}
                    activeOpacity={1}
                    onPressOut={() => {
                        closeModal()
                        setEstimativaPicker('');
                        setObservacao('');
                    }}
                >
                    <TouchableWithoutFeedback onPress={() => { }}>
                        <View style={styles.modalView}>
                        <Text style={styles.label}>Estimativa de pessoas</Text>
                            <View style={styles.inputPicker}>
                                <Picker
                                    selectedValue={estimativaPicker}
                                    onValueChange={value => setEstimativaPicker(value)}>
                                    <Picker.Item label="0 a 9" value="0" />
                                    <Picker.Item label="10 a 19" value="10" />
                                    <Picker.Item label="20 a 39" value="20" />
                                    <Picker.Item label="40 a 79" value="40" />
                                    <Picker.Item label="80 a 99" value="80" />
                                    <Picker.Item label="100 a 999" value="100" />
                                    <Picker.Item label="1000 ou mais" value="1000" />
                                </Picker>
                            </View>
                            <Text style={styles.label}>Observação</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="(Opicional)"
                                multiline={true}
                                value={observacao}
                                onChangeText={text => setObservacao(text)} />

                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: '#94D451' }}
                                onPress={() => {
                                    if (estimativa != '') {
                                        const enviarNotificacao = async () => {
                                            try {
                                                await enviarNotificacaoAglomeracao(estimativaPicker, observacao);
                                            } catch (error) {
                                                console.log(`Error ao enviar notificação: ${error}`);
                                            }
                                        }
                                        enviarNotificacao();
                                    }
                                    setObservacao('')
                                    setEstimativaPicker('')
                                    closeModal()
                                }}
                            >
                                <Text style={styles.textStyle}>Enviar notificação</Text>
                            </TouchableHighlight>
                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    containerTouchable: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
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
    inputPicker:{
        backgroundColor: '#eee',
        alignSelf: 'stretch',
        textAlign: 'left',
        margin: 10,
        borderRadius: 20,
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

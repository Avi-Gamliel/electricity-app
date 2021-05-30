import React, { useState, useEffect } from 'react'
import { Button, Modal, TextInput, Platform, StyleSheet, TouchableOpacity, Text, TouchableWithoutFeedback, View, KeyboardAvoidingView } from 'react-native'
import { auth, db } from '../firebase';


const PromtDynamic = props => {

    const PromtModal = (props) => {
        const [inputMailResetComp, setEmailRestComp] = useState('')
        const [errorMsg, setErrorMsg] = useState()
        const [successMsg, setSuccsess] = useState()
        const [emailToRest, setEmailToRest] = useState('')
        const [restfEffect, setRestEffect] = useState(true)

        useEffect(() => {

            if (!restfEffect) {
                auth.sendPasswordResetEmail(emailToRest).then(function (data) {
                    setSuccsess('המייל נשלח בהצלחה')
                }).catch(function (error) {
                    setErrorMsg('יש בעיה עם כתובת המייל')
                });
            }

            return () => {
                setRestEffect(true);

            };
        }, [restfEffect])

        useEffect(() => {

            const time = setTimeout(() => {
                setErrorMsg()
            }, 3500);

            return () => {
                clearTimeout(time)
            }
        }, [errorMsg])
        useEffect(() => {

            let time;
            if (successMsg) {
                time = setTimeout(() => {
                    props.onPress(false)
                }, 3500);
            }

            return () => {
                clearTimeout(time)
            }

        }, [successMsg])

        const checkButton = (email) => {
            setEmailToRest(email)
            setRestEffect(false);

        }
        const crossButton = () => {
            props.onPress(false)
        }

        return (
            <View style={styles.container}>
                <>
                    <View style={styles.bgPromt}>
                        {successMsg
                            ?
                            <Text>{successMsg}</Text>
                            :
                            <>
                                <Text style={{ marginBottom: 10 }}>{props.text}</Text>
                                {errorMsg &&
                                    <Text style={{ marginBottom: 10, marginTop: -5, color: 'red', fontWeight: 'bold', borderRadius: 25 }}> {errorMsg}</Text>
                                }
                                {props.placeHolder &&
                                    <KeyboardAvoidingView style={styles.viewInput}>
                                        {Platform.OS !== 'web'
                                            ?
                                            <TextInput
                                                style={styles.input}
                                                placeholder={props.placeHolder}
                                                value={inputMailResetComp}
                                                onChangeText={(value) => setEmailRestComp(value)}
                                            /> :
                                            <input
                                                style={{
                                                    borderColor: 'black',
                                                    width: '80%',
                                                    borderRadius: 25,
                                                    textAlign: 'right',
                                                    justifyContent: 'flex-start',
                                                    maxWidth: 300,
                                                    outline: 'none',
                                                    border: 'none'
                                                }}
                                                placeholder={props.placeHolder}
                                                value={inputMailResetComp}
                                                onChange={e => setEmailRestComp(e.target.value)}
                                            />


                                        }
                                    </KeyboardAvoidingView>
                                }
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: 240 }}>

                                    <TouchableOpacity pressDuration={0.5} onPress={() => checkButton(inputMailResetComp)}>
                                        <View style={[styles.btn, { backgroundColor: 'green' }]}>
                                            <Text style={{ color: 'white' }}>{props.textCheck}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity pressDuration={0.5} onPress={() => crossButton()}>
                                        <View style={[styles.btn, { backgroundColor: 'red' }]}>
                                            <Text style={{ color: 'white' }}>{props.crossCheck}</Text>
                                        </View>
                                    </TouchableOpacity>

                                </View>
                            </>
                        }
                    </View>
                    <TouchableWithoutFeedback onPress={() => props.onPress(false)}>
                        <View style={styles.backgroundBlackPicker}></View>
                    </TouchableWithoutFeedback>
                </>


            </View>
        )

    }
    return (
        <>
            {  Platform.OS === 'web' ?
                <PromtModal placeHolder={props.placeHolder} onPress={props.onPress} text={props.text} textCheck={props.textCheck} crossCheck={props.crossCheck} /> :
                <Modal animationType='fade' transparent={true} visible={true} >
                    <PromtModal placeHolder={props.placeHolder} onPress={props.onPress} text={props.text} textCheck={props.textCheck} crossCheck={props.crossCheck} />
                </Modal>
            }
        </>
    )

}

export default PromtDynamic

const styles = StyleSheet.create({

    btn: {
        borderRadius: 25,
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    container: {
        position: 'absolute',
        flex: 1,
        height: '100%',
        width: '100%',
        zIndex: 1500,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backgroundBlackPicker: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        position: 'absolute',
        height: '100%',
        width: '100%'
    },
    input: {
        borderColor: 'black',
        width: '80%',
        borderRadius: 25,
        textAlign: 'right',
        justifyContent: 'flex-start',
        maxWidth: 300,
    },
    viewInput: {
        borderColor: 'black',
        width: '80%',
        borderRadius: 25,
        borderWidth: 1,
        maxWidth: 300,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    bgPromt: {
        flexDirection: "column",
        backgroundColor: 'white',
        zIndex: 1200,
        width: 300,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20
    }
})



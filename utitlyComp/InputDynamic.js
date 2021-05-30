import React, { useState } from 'react'
import { StyleSheet, TextInput, Platform, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';


const InputDynamic = (props) => {
    const [showPassword, setShowPassword] = useState(true)

    const ShowPassComp = (props) => {
        return (

            <TouchableOpacity pressDuration={0.5} style={{ zIndex: 1000 }} onPress={() => props.setShowPassword(prev => !prev)}>

                {props.showPassword ?
                    <Ionicons name="eye-off" size={20} color="black" style={{ paddingHorizontal: 10 }} />
                    :
                    <Ionicons name="eye" size={20} color="black" style={{ paddingHorizontal: 10 }} />
                }
            </TouchableOpacity>
        )
    }

    return (
        <>
            {Platform.OS === 'web'
                ?
                <View style={styles.viewInputWeb}>
                    {props.typeInput === 'password'
                        ?
                        <>
                            <ShowPassComp showPassword={showPassword} setShowPassword={setShowPassword} />
                            <TextInput
                                style={styleWeb}
                                secureTextEntry={showPassword}
                                value={props.value}
                                onChangeText={value => props.onChangeText(value)}
                                placeholder={props.placeHolder}
                            />
                        </>
                        :
                        <TextInput
                            style={styleWeb}
                            value={props.value}
                            onChangeText={value => props.onChangeText(value)}
                            placeholder={props.placeHolder}
                        />}
                </View>
                :
                <>
                    {
                        props.typeInput === 'password' ?

                            <View style={styles.viewInput}>

                                <ShowPassComp showPassword={showPassword} setShowPassword={setShowPassword} />
                                <TextInput
                                    style={styles.inputPass}
                                    value={props.value}
                                    onChangeText={value => props.onChangeText(value)}
                                    placeholder={props.placeHolder}
                                    secureTextEntry={showPassword}
                                />
                            </View>


                            :
                            <TextInput
                                style={styles.input}
                                value={props.value}
                                onChangeText={value => props.onChangeText(value)}
                                placeholder={props.placeHolder}
                            />
                    }
                </>
            }
        </>
    )
}

export default InputDynamic

const styleWeb = {
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: '100%',
    maxWidth: 300,
    textAlign: 'right',
    justifyContent: 'flex-start',
    outline: 'none'
}
const styles = StyleSheet.create({

    viewInput: {
        borderColor: 'black',
        width: '70%',
        borderRadius: 25,
        borderWidth: 1,
        maxWidth: 300,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    inputPass: {
        borderColor: 'black',
        width: '85%',
        textAlign: 'right',
        justifyContent: 'center',
        maxWidth: 300,
    },

    input: {
        borderColor: 'black',
        width: '70%',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 25,
        textAlign: 'right',
        justifyContent: 'flex-start',
        borderWidth: 1,
        maxWidth: 300,
        marginBottom: 10
    },
    viewInputWeb: {
        borderColor: 'black',
        width: '70%',
        borderRadius: 25,
        borderWidth: 1,
        marginBottom: 10,
        maxWidth: 300,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    }

})

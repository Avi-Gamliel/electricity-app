import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

const InputWeb = (props) => {
    return (
        <View style={{
            borderColor: 'black',
            width: '70%',
            borderRadius: 25,
            borderWidth: 1,
            marginBottom: 10,
            maxWidth: 300,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row'
        }}>
            {props.children}

            <TextInput
                style={{
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    width: '100%',
                    maxWidth: 300,
                    textAlign: 'right',
                    justifyContent: 'flex-start',
                    outline: 'none'
                }}

                secureTextEntry={props.placeholder === 'סיסמא' && props.showPassword}
                value={props.value}
                onChangeText={value => props.onChangeText(value)}
                placeholder={props.placeholder}
            />
        </View>
    )
}

export default InputWeb

const styles = StyleSheet.create({})

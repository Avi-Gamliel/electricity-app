import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const ButtonDynamic = (props) => {
    return (
        <TouchableOpacity pressDuration={0.5} style={[styles.saveBtn, { backgroundColor: props.buttonColor ? props.buttonColor : 'grey' }]} onPress={props.onPress}>
            <View style={styles.view}>
                <Text style={{ color: props.textColor ? props.textColor : 'black' }}>{props.text}</Text>
                {props.children}
            </View>
        </TouchableOpacity>
    )
}

export default ButtonDynamic

const styles = StyleSheet.create({

    view: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    saveBtn: {
        width: '70%',
        borderRadius: 25,
        height: 40,

        maxWidth: 300,
        shadowColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
})

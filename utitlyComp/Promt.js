import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Platform } from 'react-native'
import { Entypo } from '@expo/vector-icons';


const Promt = (props) => {

    return (
        <View style={styles.container}>
            <View style={styles.bgPromt}>
                <Text>אתה בטוח שאתה רוצה למחוק?</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: 240 }}>
                    <TouchableOpacity pressDuration={0.5} onPress={() => {
                        props.clearRow(props.row.index, props.row.month)
                        props.setPrompt(false)
                    }}>
                        <Entypo name="check" size={34} color="green" />
                    </TouchableOpacity>
                    <TouchableOpacity pressDuration={0.5} onPress={() => {
                        props.setPrompt(false)
                    }}>
                        <Entypo name="cross" size={34} color="red" />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableWithoutFeedback onPress={() => props.setPrompt(false)}>
                <View style={styles.backgroundBlackPicker}></View>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default Promt

const styles = StyleSheet.create({

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

    bgPromt: {
        backgroundColor: 'white',
        zIndex: 1200,
        width: 240,
        height: 100,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10
    }
})

import React from 'react'
import { StyleSheet, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Text, View } from 'react-native'

const PickerMonth = (props) => {
    return (
        <View style={styles.bgPop}>
            <ScrollView style={styles.scrollProps}>
                {props.MONTHS.map((v, i) => {
                    return <TouchableOpacity
                        key={i}
                        pressDuration={0.5}
                        style={{ width: '100%', height: 40, justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => {
                            // props.setChoose(false)
                            props.chooseDatePrev(i, props.modalType)
                        }}>
                        <Text> {v} </Text>
                    </TouchableOpacity>
                })}
            </ScrollView>
            <TouchableWithoutFeedback onPress={() => props.setModalVisible(false)}>
                <View style={styles.backgroundBlackPicker}></View>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default PickerMonth

const styles = StyleSheet.create({
    bgPop: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        flex: 1,
        // backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000

    },
    scrollProps: {
        width: '80%',
        maxHeight: '50%',
        maxWidth: 400,
        zIndex: 1600,
        backgroundColor: 'white',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    backgroundBlackPicker: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        position: 'absolute',
        height: '100%',
        width: '100%'
    },

})

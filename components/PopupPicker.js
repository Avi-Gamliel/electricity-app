import React, { useState, useRef } from 'react';
import { Text, View, StyleSheet, Animated, ScrollView, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function PopupPicker(props) {

    const dammy = props.data;
    const [modalVisible, setModalVisible] = useState(false)
    const [InputChoose, setInputChoose] = useState(props.defaultValue)
    const scrollRef = useRef()
    const chooseDate = (index) => {
        setInputChoose(dammy[index])
        setModalVisible(false)
    }

    return (
        <>
            <TouchableOpacity pressDuration={0.5} style={styles.btnInput} onPress={() => setModalVisible(true)} >
                <AntDesign name="caretdown" size={15} color="grey" style={{ marginEnd: 10 }} />
                <Text>{InputChoose ? InputChoose : 'choose'}</Text>
            </TouchableOpacity>

            <TouchableOpacity pressDuration={0.5}>
            </TouchableOpacity>
            {modalVisible ?
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.bgPop}>
                        <ScrollView
                            ref={ref => scrollRef.current = ref}
                            style={styles.scrollProps}>

                            {dammy.map((v, i) => {
                                return <TouchableOpacity
                                    pressDuration={0.5}
                                    style={{ width: '100%', height: 40, justifyContent: 'center', alignItems: 'center' }}
                                    onPress={() => chooseDate(i)} >
                                    <Text> {v} </Text>
                                </TouchableOpacity>
                            })}

                        </ScrollView>
                    </View>
                </TouchableWithoutFeedback>
                : null}
        </>
    );
}

const styles = StyleSheet.create({

    btnInput: {
        position: 'absolute',
        height: 40,
        backgroundColor: 'rgba(0,0,0,0.02)',
        color: 'white',
        minWidth: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        textAlign: 'center'
    },

    bgPop: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    }
    ,
    scrollProps: {
        width: '80%',
        maxHeight: '50%',
        backgroundColor: 'white',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    }
});
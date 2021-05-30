import React from 'react'
import { StyleSheet, TextInput, Text, View, Platform, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

const CardInputs = (props) => {
    return (
        <>
            <Text h4 style={styles.h4style}>{props.title}</Text>
            <View style={styles.containerTitle}>
                {Platform.OS === 'web' ?
                    <input
                        placeholder="הכנס מונה אחרון..."
                        value={Number(props.prevMonth) > 0 ? props.prevMonth : ''}
                        onChange={e => props.setPrevMonth(e.target.value)}
                        style={{
                            borderColor: 'black',
                            width: '50%',
                            paddingLeft: 10,
                            paddingRight: 10,
                            paddingTop: 5,
                            paddingBottom: 5,
                            borderRadius: 25,
                            textAlign: 'right',
                            justifyContent: 'flex-start',
                            borderWidth: 1,
                            outline: 'none'
                        }}
                    /> :
                    <TextInput
                        value={props.prevMonth > 0 ? props.prevMonth : ''}
                        onChangeText={(value) => props.setPrevMonth(value)}
                        onFocus={props.infoucs}
                        onBlur={props.outfoucs}
                        style={props.inFoucs ? styles.inputInFocus : styles.input}
                        placeholder='הכנס מונה אחרון...'
                    />
                }

                <TouchableOpacity pressDuration={0.5} style={styles.btnInput} onPress={() => {
                    props.setModalType(props.typeModal)
                    props.setModalVisible(true)
                }}>
                    <Text>{props.selectedValue ? props.selectedValue : 'choose'}</Text>
                    <AntDesign name="caretdown" size={15} color="grey" style={{ marginStart: 10 }} />
                </TouchableOpacity>
            </View>

        </>
    )
}

export default CardInputs

const styles = StyleSheet.create({

    h4style: {
        justifyContent: 'flex-start',
        width: '100%',
        marginBottom: 5
    },

    containerTitle: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center",
        // alignItems: "flex-end",

        marginBottom: 10
    },

    divider: {
        width: '100%',
        borderBottomColor: 'rgba(0,0,0,0.1)',
        borderBottomWidth: 1,
        margin: 5
    },

    containerCal: {
        paddingVertical: 5,
        width: '100%'
    },
    buttonCal: {
        shadowOffset: { width: 1, height: 2 },
        width: '100%',
        borderRadius: 25,
        height: 40,
        backgroundColor: "#007bff",
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 4.65,
        justifyContent: 'center',
        alignItems: 'center'
    },

    inputInFocus: {
        borderColor: '#007bff',
        width: '50%',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 25,
        textAlign: 'right',
        borderWidth: 1,
    },

    input: {
        borderColor: 'black',
        width: '50%',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 25,
        textAlign: 'right',
        justifyContent: 'flex-start',
        borderWidth: 1,
    },
    btnInput: {
        width: '50%',
        height: 40,
        color: 'white',
        minWidth: 100,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        textAlign: 'center'
    },
})

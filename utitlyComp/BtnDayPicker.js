import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const BtnDayPicker = (props) => {
    return (
        <TouchableOpacity pressDuration={0.5} onPress={() => props.showDateTimePicker()} style={{ width: '40%' }} >
            <View style={styles.btnChooseDay}>
                <AntDesign name="caretdown" size={15} color="grey" style={{ marginStart: 10 }} />
                <Text style={{ color: 'black' }}>{props.downloadDay ? 'עדכן תאריך' : 'בחר תאריך'}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default BtnDayPicker

const styles = StyleSheet.create({
    btnChooseDay: {
        borderRadius: 25,
        backgroundColor: 'white',
        paddingHorizontal: 5,
        paddingVertical: 5,
        minWidth: 40,
        maxWidth: 160,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row'
    }

})

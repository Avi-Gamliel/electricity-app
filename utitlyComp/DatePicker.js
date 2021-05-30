import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';

const DatePicker = (props) => {
    return (
        <View style={styles.containerModalPicker}>
            <View style={styles.bgDatePicker}>
                <View style={styles.titleDatePicker}>
                    <TouchableOpacity pressDuration={0.5} onPress={() => props.chooseDay()}>
                        <FontAwesome name="check" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={{ color: 'white' }}>בחר תאריך הורדת תשלום</Text>
                </View>
                {props.days.map((d, i) => {
                    return <View style={styles.bgDayPicker} key={i}>
                        <TouchableOpacity pressDuration={0.5} onPress={() => props.activeDay(i)}
                            style={styles.tuchableDayPicker}>
                            <Text style={{
                                color: d.active ? 'white' : 'black',
                                backgroundColor: d.active ? '#007bff' : 'white',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                                borderTopLeftRadius: 250,
                                borderTopRightRadius: 250,
                                borderBottomLeftRadius: 250,
                                borderBottomRightRadius: 250,
                                paddingHorizontal: 5,
                                paddingVertical: 5
                            }}>
                                {d.day}
                            </Text>
                        </TouchableOpacity>
                    </View>
                })}
            </View>
            <TouchableWithoutFeedback onPress={() => props.hideDateTimePicker()}>
                <View style={styles.backgroundBlackPicker}></View>
            </TouchableWithoutFeedback>
        </View>
    )

}

export default DatePicker

const styles = StyleSheet.create({
    containerModalPicker: {
        position: 'absolute',
        flex: 1,
        height: '100%',
        width: '100%',
        zIndex: 1500,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bgDatePicker: {
        backgroundColor: 'white',
        zIndex: 2500,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        width: 350,
        height: 300,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    titleDatePicker: {
        flexDirection: 'row',
        height: 50,
        width: 350,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    bgDayPicker: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tuchableDayPicker: {
        height: 30,
        width: 30,
    },
    dayPicker: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderTopLeftRadius: 250,
        borderTopRightRadius: 250,
        borderBottomLeftRadius: 250,
        borderBottomRightRadius: 250,

        paddingHorizontal: 5,
        paddingVertical: 5
    },
    containerModalPickerWeb: {
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
    }


})

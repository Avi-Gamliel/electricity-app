import React, { useState, useLayoutEffect, useEffect } from 'react';
import { Text, View, StyleSheet, Platform, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar'
import { auth, db } from '../firebase';
import { MaterialIcons } from '@expo/vector-icons';
import Promt from '../utitlyComp/Promt';
import { Dimensions } from 'react-native';

let [currentMonth, currentDate, currentYear] = new Date().toLocaleDateString("he-IL").split("/")

if (Platform.OS === 'web' || Platform.OS === 'ios') {
    const split = currentMonth.split('.');
    currentMonth = split[1];
    currentYear = split[2][2] + split[2][3];
}
const window = Dimensions.get("window");
const screen = Dimensions.get("screen");
export default function Calendar(props) {
    const [dimensions, setDimensions] = useState({ window, screen });

    const onChange = ({ window, screen }) => {
        setDimensions({ window, screen });
    };

    useEffect(() => {
        Dimensions.addEventListener("change", onChange);
        return () => {
            Dimensions.removeEventListener("change", onChange);
        };
    });

    useEffect(() => {
        const unsubscribe = db.collection("users").doc(props.route.params.uid).collection('months').onSnapshot((data) => {
            const newarray = [...months];
            data.docs.map(doc => {
                const exist = newarray.findIndex(x => x.month === doc.id);
                if (exist !== -1) {
                    newarray[exist].meter = doc.data().meter;
                    newarray[exist].topay = doc.data().topay;
                }
            })
            setMonth(newarray);
        });

        return unsubscribe;
    }, [])

    const [months, setMonth] = useState([
        { month: `20${currentYear} ינאור`, meter: 0, topay: 0, },
        { month: `20${currentYear} פברואר`, meter: 0, topay: 0, },
        { month: `20${currentYear} מרץ`, meter: 0, topay: 0 },
        { month: `20${currentYear} אפריל`, meter: 0, topay: 0 },
        { month: `20${currentYear} מאי`, meter: 0, topay: 0 },
        { month: `20${currentYear} יוני`, meter: 0, topay: 0 },
        { month: `20${currentYear} יולי`, meter: 0, topay: 0 },
        { month: `20${currentYear} אוגוסט`, meter: 0, topay: 0 },
        { month: `20${currentYear} ספטמבר`, meter: 0, topay: 0 },
        { month: `20${currentYear} אוקטובר`, meter: 0, topay: 0 },
        { month: `20${currentYear} נובמבר`, meter: 0, topay: 0 },
        { month: `20${currentYear} דצמבר`, meter: 0, topay: 0 },
    ])
    const [rowToclear, setRowClear] = useState()
    const [Prompt, setPrompt] = useState(false);

    useLayoutEffect(() => {
        props.navigation.setOptions({
            title: 'היסטוריה',
            headerStyle: { backgroundColor: '#fd7e14', borderBottomLeftRadius: 15, borderBottomRightRadius: 15, height: 80 },
            headerTitleStyle: { color: 'white' },
            headerTintColor: 'white',
            headerRight: () => (
                <View style={{ marginRight: 20, flexDirection: 'row' }}>
                    <TouchableOpacity pressDuration={0.5} onPress={() => props.navigation.navigate('Login')}>
                        <Fontisto name="calculator" size={24} color="white" />
                    </TouchableOpacity>
                </View>

            ),
        })
    }, [])

    const clearRow = (index, month) => {
        db.collection("users").doc(props.route.params.uid).collection('months').doc(month).delete().then(() => {
            const newArray = [...months];
            newArray[index].meter = 0;
            newArray[index].topay = 0;
            setMonth(newArray);
        }).catch((err) => {

        })
    }

    const readyToClear = (i, m) => {
        setRowClear({ index: i, month: m })
    }
    return (
        <>
            {Prompt ?
                Platform.OS === 'web' ?
                    <Promt row={rowToclear} clearRow={clearRow} setPrompt={setPrompt} /> :
                    <Modal animationType='fade' transparent={true} visible={true} >
                        <Promt row={rowToclear} clearRow={clearRow} setPrompt={setPrompt} />
                    </Modal>
                : null
            }
            <View style={styles.container}>
                <StatusBar style="light" />
                <View style={newStyle(dimensions.screen.width).containerTable}>
                    <View style={styles.rowTitle}>
                        <Text></Text>
                        <Text style={styles.paymentTitle}>לתשלום</Text>
                        <Text style={styles.electricityTitle}>מונה</Text>
                        <Text style={styles.dateTitle}>חודש</Text>
                    </View>
                    <ScrollView style={styles.scroll}>

                        {months.map((month, i) => {
                            return <View style={Number(month.topay) > 0 || Number(month.meter) > 0 ? newStyle(dimensions.screen.width).row : newStyle(dimensions.screen.width).offRow} key={i}>
                                <Text style={Number(month.topay) > 0 || Number(month.meter) > 0 ? styles.payment : styles.offPayment}>{Number(month.topay).toFixed(2)} ₪</Text>
                                <Text style={Number(month.topay) > 0 || Number(month.meter) > 0 ? styles.electricity : styles.offElectricity}>{Number(month.meter).toFixed(1)}</Text>
                                <Text style={Number(month.topay) > 0 || Number(month.meter) > 0 ? styles.date : styles.offDate}>{month.month}</Text>

                                <MaterialIcons name="delete" size={24} color={Number(month.topay) > 0 || Number(month.meter) > 0 ? "black" : "rgba(0,0,0,0.06)"} onPress={() => {
                                    if (Number(month.topay) > 0 || Number(month.meter) > 0) {
                                        setPrompt(true)
                                        readyToClear(i, month.month)
                                    }

                                }} />
                            </View>
                        })}
                    </ScrollView>

                </View>
            </View>
        </>
    )
}

const newStyle = (width) => {
    return StyleSheet.create({

        containerTable: {
            width: Platform.OS === 'web' ? width < 750 ? '100%' : 600 : '100%',
        },
        row: {
            flexDirection: 'row',
            width: Platform.OS === 'web' ? width < 750 ? '100%' : 600 : '100%',
            shadowOffset: { width: 1, height: 2 },
            shadowColor: 'black',
            shadowOpacity: 0.2,
            elevation: 3,
            shadowRadius: 4.65,
            paddingHorizontal: 15,
            paddingVertical: 14,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 5,
            marginTop: 10
        },

        offRow: {
            flexDirection: 'row',
            width: Platform.OS === 'web' ? width < 750 ? '100%' : 600 : '100%',
            shadowOffset: { width: 1, height: 2 },
            shadowColor: 'rgba(0,0,0,0.2)',
            shadowOpacity: 0.2,
            shadowRadius: 2.65,
            paddingHorizontal: 15,
            paddingVertical: 14,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.7)',
            marginTop: 10
        },
    })

}


const styles = StyleSheet.create({

    container: {
        paddingHorizontal: 15,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    scroll: {
        height: '90%',

    },

    rowTitle: {
        flexDirection: 'row',
        width: '100%',
        shadowOffset: { width: 1, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 4.65,
        paddingHorizontal: 15,
        paddingVertical: 14,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fd7e14',
        marginTop: 10
    },

    paymentTitle: {
        width: '33%',
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white'
    },

    electricityTitle: {
        width: '33%',
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white'

    },

    dateTitle: {
        width: '33%',
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },

    payment: {
        width: '33%',
        textAlign: 'center',
        fontWeight: 'bold',
        color: "rgba(0,0,0,1)"

    },
    offPayment: {
        width: '33%',
        textAlign: 'center',
        color: "rgba(0,0,0,0.3)"
    },
    electricity: {
        width: '33%',
        textAlign: 'center',
        color: "rgba(0,0,0,1)"

    },
    offElectricity: {
        width: '33%',
        textAlign: 'center',
        color: "rgba(0,0,0,0.3)"
    },
    date: {
        width: '33%',
        textAlign: 'center',
        color: "rgba(0,0,0,1)"

    },
    offDate: {
        width: '33%',
        textAlign: 'center',
        color: "rgba(0,0,0,0.3)"
    }
});

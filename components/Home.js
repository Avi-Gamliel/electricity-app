import React, { useState, useLayoutEffect, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, LogBox, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar'
import { auth, db } from '../firebase';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DatePicker from '../utitlyComp/DatePicker'
import BtnDayPicker from '../utitlyComp/BtnDayPicker'
import CardInputs from '../utitlyComp/CardInputs';
import PickerMonth from '../utitlyComp/PickerMonth'
import { Dimensions } from 'react-native';
import RadioButton from '../utitlyComp/RadioButton'
import { useIsFocused } from '@react-navigation/native';

let [currentMonth, currentDate, currentYear] = new Date().toLocaleDateString("he-IL").split("/")


if (Platform.OS === 'web' || Platform.OS === 'ios') {
    const split = currentMonth.split('.');
    currentMonth = split[1];
    currentYear = split[2][2] + split[2][3];
}
const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

// console.log(auth);

export default function Home(props) {


    const [dimensions, setDimensions] = useState({ window, screen });
    const [lastPay, setLastPay] = useState(0);
    const [months, setMonth] = useState([
        { month: `20${currentYear - 1} נובמבר`, meter: 0, topay: 0 },
        { month: `20${currentYear - 1} דצמבר`, meter: 0, topay: 0 },
        { month: `20${currentYear} ינאור`, meter: 0, topay: 0 },
        { month: `20${currentYear} פברואר`, meter: 0, topay: 0 },
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
        { month: `20${Number(currentYear) + 1} ינאור`, meter: 0, topay: 0 },
        { month: `20${Number(currentYear) + 1} פברואר`, meter: 0, topay: 0 },
    ])
    const [itemsChooseButton, setItemsChoosrButton] = useState({
        data: ['חודשי', 'דו חודשי'],
        checked: 1,
    })
    const [inFoucs, setFocus] = useState(false)
    const [datePicker, setDatePicker] = useState(false)
    const [downloadDay, setDownloadDay] = useState()
    const [inFoucsInput2, setFocus2] = useState(false)
    const [prevMonth, setPrevMonth] = useState(itemsChooseButton.checked === 1 ? months[Number(currentMonth) - 1].meter : months[Number(currentMonth)].meter)
    const [thisMonth, setThisMonth] = useState(months[Number(currentMonth) + 1].meter)
    const [payment, setPayment] = useState();
    const [currentThisMonth, setCurrentThisMonth] = useState(MONTHS[Number(currentMonth) + 1])
    const [currentPrevMonth, setCurrentPrevMonth] = useState(itemsChooseButton.checked === 1 ? MONTHS[Number(currentMonth) - 1] : MONTHS[Number(currentMonth)])
    const [selectedValue, setSelectedValue] = useState(currentPrevMonth);
    const [selectedThisValue, setSelectedValueThis] = useState(currentThisMonth);
    const [modalVisible, setModalVisible] = useState(false)
    const [modalType, setModalType] = useState()
    const [days, setDays] = useState([
        { day: 1, active: false },
        { day: 2, active: false },
        { day: 3, active: false },
        { day: 4, active: false },
        { day: 5, active: false },
        { day: 6, active: false },
        { day: 7, active: false },
        { day: 8, active: false },
        { day: 9, active: false },
        { day: 10, active: false },
        { day: 11, active: false },
        { day: 12, active: false },
        { day: 13, active: false },
        { day: 14, active: false },
        { day: 15, active: false },
        { day: 16, active: false },
        { day: 17, active: false },
        { day: 18, active: false },
        { day: 19, active: false },
        { day: 20, active: false },
        { day: 20, active: false },
        { day: 21, active: false },
        { day: 22, active: false },
        { day: 23, active: false },
        { day: 24, active: false },
        { day: 25, active: false },
        { day: 26, active: false },
        { day: 27, active: false },
        { day: 28, active: false },
        { day: 29, active: false },
        { day: 30, active: false },
        { day: 31, active: false },
    ])
    const [clearChoose, setChoose] = useState(true)
    useEffect(() => {

        const index = MONTHS.findIndex(x => x === selectedThisValue)

        if (!clearChoose) {
            if (itemsChooseButton.checked === 0) {
                setPrevMonth(months[Number(index) - 1].meter.toString())
                setSelectedValue(MONTHS[Number(index) - 1])

            } else {
                setPrevMonth(months[Number(index) - 2].meter.toString())
                setSelectedValue(MONTHS[Number(index) - 2])

            }
        }
        return setChoose(true)
    }, [clearChoose])

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
        if (Platform.OS !== 'web') {
            LogBox.ignoreLogs(['Setting a timer']);
        }
    }, [])

    useEffect(() => {

        const unsubscribe = db.collection("users").doc(props.uid)
            .onSnapshot((data) => {
                if (data.data()) {

                    if (data.data().downloadDate) {
                        setDownloadDay(data.data().downloadDate)
                        const tempDay = [...days];
                        const find = tempDay.findIndex(x => x.day === data.data().downloadDate);
                        tempDay.forEach(day => {
                            day.active = false;
                        })
                        tempDay[find].active = true;
                        setDays(tempDay);
                    }

                    if (data.data().type >= 0) {
                        setItemsChoosrButton({
                            data: ['חודשי', 'דו חודשי'],
                            checked: data.data().type
                        })
                        setChoose(false)
                    }
                }
            });
        return unsubscribe;
    }, [])

    useEffect(() => {

        const unsubscribe = db.collection("users").doc(props.uid).collection('months').onSnapshot((data) => {
            const newarray = [...months];

            data.docs.map(doc => {
                const exist = newarray.findIndex(x => x.month === doc.id);
                if (exist !== -1) {
                    newarray[exist].meter = Number(doc.data().meter).toFixed(1).toString();
                    newarray[exist].topay = Number(doc.data().topay).toFixed(2).toString();
                }
            })

            setMonth(newarray);

            const findThisMonth = months.findIndex(x => x.month === currentThisMonth);
            const findPrevMonth = months.findIndex(x => x.month === currentPrevMonth);


            if (findThisMonth !== -1) {
                setThisMonth(months[findThisMonth].meter)
            }
            if (findPrevMonth !== -1) {
                setPrevMonth(months[findPrevMonth].meter)
            }
            for (let i = Number(currentMonth) + 1; i > 0; i--) {
                if (months[i].topay > 0) {
                    return setLastPay(months[i].topay);
                }
            }
        });


        return unsubscribe;
    }, [])

    useLayoutEffect(() => {

        props.navigation.setOptions({

            title: `מעקב חשמל`,
            headerTitleStyle: { color: 'white', marginLeft: 20, textAlign: 'left' },
            headerTintColor: 'white',
            headerRight: () => (
                <View style={{ marginRight: 20, flexDirection: 'row' }}>
                    <TouchableOpacity pressDuration={0.5} onPress={() => props.navigation.navigate('Calendar', { uid: props.uid })}>
                        <FontAwesome name="calendar" size={24} color="white" style={{ paddingHorizontal: 5 }} />
                    </TouchableOpacity>
                    <TouchableOpacity pressDuration={0.5} onPress={() => auth.signOut().then(() => {
                        // props.logout('not')
                        props.logout({ status: 'not', user: '' })

                    }).catch((err) => {

                    })}>
                        <MaterialCommunityIcons name="logout" size={24} color="white" style={{ paddingHorizontal: 5 }} />
                    </TouchableOpacity>
                </View>
            ),
        })

    }, [props.navigation])


    const saveToDataBase = async (meter, topay, date, prevMeter, datePrev) => {

        await db.collection('users').doc(props.uid).get().then(snapshot => {
            if (snapshot) {
                db.collection('users').doc(props.uid).collection('months').doc(date).set({
                    meter: meter,
                    topay: topay
                });
                db.collection('users').doc(props.uid).collection('months').doc(datePrev).get().then(doc => {
                    if (!doc.data()) {
                        return db.collection('users').doc(props.uid).collection('months').doc(datePrev).set({
                            meter: prevMeter,
                            topay: 0,
                        })
                    } else {
                        return db.collection('users').doc(props.uid).collection('months').doc(datePrev).update({
                            meter: prevMeter
                        })
                    }
                })

            }

        }).catch(err => alert(err))

    }

    const infoucs = () => {
        setFocus(true)
    }

    const outfoucs = () => {
        setFocus(false)
    }

    const infoucs2 = () => {
        setFocus2(true)
    }

    const outfoucs2 = () => {
        setFocus2(false)
    }

    const hideDateTimePicker = () => {
        setDatePicker(false)
    }

    const saveTypeChoose = async (typePay) => {

        await db.collection('users').doc(props.uid).get().then(snapshot => {
            if (snapshot.data().type) {

                if (snapshot.data().type !== typePay) {
                    db.collection('users').doc(props.uid).update({
                        type: typePay
                    })
                }
            } else {
                db.collection('users').doc(props.uid).update({
                    type: typePay
                })

            }
        })

    }

    const chooseDay = async () => {

        const Day = days.filter(x => x.active === true);
        await db.collection('users').doc(props.uid).get().then(snapshot => {
            if (snapshot) {
                db.collection('users').doc(props.uid).update({
                    downloadDate: Day[0].day
                })
            }
        }).then(() => {

        }).catch(err => alert(err))
        hideDateTimePicker();
    }

    const showDateTimePicker = () => {
        setDatePicker(true)
    };

    const calculate = () => {
        const sum = Number(thisMonth) - Number(prevMonth);
        const toPay = sum * 0.5066;
        setPayment(toPay.toFixed(2))
    }

    const resetForm = () => {

        if (itemsChooseButton.checked === 0) {
            setPrevMonth(months[Number(currentMonth)].meter.toString())
            setSelectedValue(MONTHS[Number(currentMonth)])

        } else {
            setPrevMonth(months[Number(currentMonth) - 1].meter.toString())
            setSelectedValue(MONTHS[Number(currentMonth) - 1])

        }
        setThisMonth(months[Number(currentMonth) + 1].meter.toString())
        setSelectedValueThis(MONTHS[Number(currentMonth) + 1])
        setPayment()
    }

    const activeDay = (index) => {

        const temp = [...days];
        temp.forEach(day => {
            day.active = false
        })
        temp[index].active = true;
        setDays(temp)
    }

    const chooseDatePrev = (itemIndex, type) => {
        if (type === 'prev') {
            if (itemIndex > 13) {
                alert('התאריך אינו מתאים')
            } else {
                setPrevMonth(months[itemIndex].meter.toString())
                setSelectedValue(MONTHS[itemIndex])


                if (itemsChooseButton.checked === 0) {
                    setThisMonth(months[itemIndex + 1].meter.toString())
                    setSelectedValueThis(MONTHS[itemIndex + 1])
                } else {
                    setThisMonth(months[itemIndex + 2].meter.toString())
                    setSelectedValueThis(MONTHS[itemIndex + 2])
                }
                setModalVisible(false)


            }
        } else if (type === 'this') {
            if (itemIndex <= 1) {
                alert('התאריך אינו מתאים')
            } else {
                setThisMonth(months[itemIndex].meter.toString())

                setSelectedValueThis(MONTHS[itemIndex])

                setModalVisible(false)
                if (itemsChooseButton.checked === 0) {
                    setPrevMonth(months[itemIndex - 1].meter.toString())
                    setSelectedValue(MONTHS[itemIndex - 1])
                } else {
                    setPrevMonth(months[itemIndex - 2].meter.toString())
                    setSelectedValue(MONTHS[itemIndex - 2])
                }

            }
        }
    }

    const onPressChooseButton = (key) => {
        setChoose(false)
        setItemsChoosrButton({
            data: ['חודשי', 'דו חודשי'],
            checked: key
        })
        saveTypeChoose(key)
    }

    return (
        <>



            {
                datePicker ?
                    Platform.OS !== 'web'
                        ?
                        <Modal animationType='fade' transparent={true} visible={true}>

                            <DatePicker days={days} chooseDay={chooseDay} activeDay={activeDay} hideDateTimePicker={hideDateTimePicker} downloadDay={downloadDay} />
                        </Modal>
                        :
                        <DatePicker days={days} chooseDay={chooseDay} activeDay={activeDay} hideDateTimePicker={hideDateTimePicker} downloadDay={downloadDay} />
                    : null
            }

            {modalVisible ?
                Platform.OS !== 'web'
                    ?
                    <Modal animationType='fade' transparent={true} visible={true}>
                        <PickerMonth MONTHS={MONTHS} setChoose={setChoose} chooseDatePrev={chooseDatePrev} modalType={modalType} setModalVisible={setModalVisible} />
                    </Modal>
                    :
                    <PickerMonth MONTHS={MONTHS} setChoose={setChoose} chooseDatePrev={chooseDatePrev} modalType={modalType} setModalVisible={setModalVisible} />
                : null
            }


            <View style={styles.container}>
                <StatusBar style="light" />

                <ScrollView style={{ display: "flex", flex: 1, height: '100%', flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                        <BtnDayPicker showDateTimePicker={showDateTimePicker} downloadDay={downloadDay} />

                        <Text style={styles.titleDownloadDate}>
                            {downloadDay ? `תאריך הורדה ב - ${downloadDay} לחודש` : 'בשביל מעקב יותר נוח הזן תאריך תשלום'}
                        </Text>
                    </View>

                    <View style={newStyle(dimensions.screen.width).cardContainer}>
                        <Text h1 style={styles.h1Style}>תשלום אחרון</Text>
                        <View style={styles.containerTitle}>
                            <Text h2 style={styles.h2Style}>₪ {Number(lastPay).toFixed(2)}</Text>
                        </View>
                    </View>
                    <RadioButton onPress={onPressChooseButton} items={itemsChooseButton} setItems={setItemsChoosrButton} setChoose={setChoose} />
                    {payment ?
                        <View style={newStyle(dimensions.screen.width).cardContainerCalculate}>
                            <Text h4 style={styles.h4style}>לתשלום:</Text>
                            <Text style={styles.sum}>₪ {payment}</Text>
                            <View style={styles.containerBtn}>
                                <TouchableOpacity
                                    pressDuration={0.5}
                                    onPress={() => saveToDataBase(thisMonth, payment, selectedThisValue, prevMonth, selectedValue)}
                                >
                                    <View style={styles.buttonSave}>
                                        <Text style={{ color: 'white' }}>שמור</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity pressDuration={0.5} onPress={resetForm} >
                                    <View style={styles.buttonReset}>
                                        <Text style={{ color: 'white' }}>חשב מחדש</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        :
                        <KeyboardAvoidingView
                            behavior={Platform.OS === "ios" ? "padding:5" : "height:5"} >

                            <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{}}>
                                <View style={newStyle(dimensions.screen.width).cardContainer}>

                                    <CardInputs
                                        prevMonth={prevMonth}
                                        setPrevMonth={setPrevMonth}
                                        infoucs={infoucs}
                                        outfoucs={outfoucs}
                                        inFoucs={inFoucs}
                                        setModalType={setModalType}
                                        typeModal={'prev'}
                                        setModalVisible={setModalVisible}
                                        selectedValue={selectedValue}
                                        title={'חודש אחרון:'}
                                    />

                                    <CardInputs
                                        prevMonth={thisMonth}
                                        setPrevMonth={setThisMonth}
                                        infoucs={infoucs2}
                                        outfoucs={outfoucs2}
                                        inFoucs={inFoucsInput2}
                                        setModalType={setModalType}
                                        typeModal={'this'}
                                        setModalVisible={setModalVisible}
                                        selectedValue={selectedThisValue}
                                        title={'חודש נוכחי:'}
                                    />

                                    <View style={styles.divider}></View>
                                    <View style={styles.containerCal}>
                                        <TouchableOpacity pressDuration={0.5} onPress={calculate}>
                                            <View style={styles.buttonCal}>
                                                <Text style={{ color: 'white' }}>חשב</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </TouchableWithoutFeedback>
                        </KeyboardAvoidingView>
                    }


                </ScrollView>
                <View style={{
                    // top: 10,
                    // marginTop: 10,
                    // height: '100%',
                    width: Platform.OS === 'web' ? dimensions.screen.width < 750 ? 300 : 600 : '100%',
                    // justifyContent: 'center',
                    // alignItems: 'flex-start'
                    position: 'relative',
                    marginBottom: 0
                    // paddingHorizontal: 10, bottom: 0, position: 'absolute', width: '100%', justifyContent: 'center', alignItems: 'center' 
                }}>
                    <Text style={{
                        // width: Platform.OS === 'web' ? dimensions.screen.width < 750 ? 300 : 600 : 300
                    }}>
                        מחושב לפי תעריף החשמל העדכני בישראל לשנת 2021 (0.5066 אג' לקוט"ש כולל מע"מ) המחיר לא כולל תשלום קבוע ותשלום קיבולת
            </Text>
                </View>
            </View>



        </>
    );

}


const MONTHS = [`20${currentYear - 1} נובמבר`, `20${currentYear - 1} דצמבר`, `20${currentYear} ינאור`, `20${currentYear} פברואר`, `20${currentYear} מרץ`, `20${currentYear} אפריל`, `20${currentYear} מאי`, `20${currentYear} יוני`, `20${currentYear} יולי`, `20${currentYear} אוגוסט`, `20${currentYear} ספטמבר`, `20${currentYear} אוקטובר`, `20${currentYear} נובמבר`, `20${currentYear} דצמבר`, `20${Number(currentYear) + 1} ינאור`, `20${Number(currentYear) + 1} פברואר`,]



const newStyle = (width) => {
    return StyleSheet.create({

        cardContainer: {
            flexDirection: 'column',
            shadowOffset: { width: 1, height: 2 },
            shadowColor: 'black',
            shadowOpacity: 0.2,
            shadowRadius: 4.65,
            paddingHorizontal: 15,
            paddingVertical: 15,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 5,
            elevation: 4,
            marginTop: 10,
            width: Platform.OS === 'web' ? width < 750 ? 320 : 600 : '100%'
        },
        cardContainerCalculate: {
            flexDirection: 'column',
            width: Platform.OS === 'web' ? width < 750 ? 320 : 600 : '100%',
            shadowOffset: { width: 1, height: 2 },
            shadowColor: 'black',
            shadowOpacity: 0.2,
            shadowRadius: 4.65,
            paddingHorizontal: 15,
            paddingVertical: 15,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 5,
            elevation: 3,
            marginTop: 10
        },
    })

}


const styles = StyleSheet.create({

    container: {
        // height: '100%',
        width: '100%',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 15,
    },

    divider: {
        width: '100%',
        borderBottomColor: 'rgba(0,0,0,0.1)',
        borderBottomWidth: 1,
        margin: 5
    },
    itemStyle: {
        backgroundColor: 'red'
    },
    buttonReset: {
        shadowOffset: { width: 1, height: 2 },
        borderRadius: 25,
        minWidth: 120,
        height: 40,
        backgroundColor: "#dc3545",
        shadowColor: 'black',
        shadowOpacity: 0.2,
        elevation: 6,
        shadowRadius: 4.65,
        paddingHorizontal: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },

    containerBtn: {
        flexDirection: "row",
        paddingVertical: 10
    },

    buttonSave: {
        shadowOffset: { width: 1, height: 2 },
        borderRadius: 25,
        height: 40,
        minWidth: 120,
        backgroundColor: "#28a745",
        shadowColor: 'black',
        shadowOpacity: 0.2,
        elevation: 6,
        shadowRadius: 4.65,
        paddingHorizontal: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },

    cardContainer: {

    },

    h4style: {
        justifyContent: 'flex-start',
        width: '100%',
        marginBottom: 5
    },

    containerCal: {
        paddingVertical: 5,
        width: '100%'
    },

    containerTitle: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "flex-end",
        marginBottom: 10
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
        elevation: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },

    h1Style: {
        fontSize: 15,
    },

    h3style: {
        fontSize: 40,
        fontWeight: 'bold',
        color: "#007bff",
        alignSelf: "flex-end"
    },

    h2Style: {
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: "flex-end",
        backgroundColor: '#fd7e14',
        borderRadius: 25,
        marginTop: 10,
        paddingHorizontal: 20,
        paddingVertical: 2,
        color: 'white'

    },

    sum: {
        fontSize: 40,
        fontWeight: 'bold',
    },

    btnInput: {
        width: '40%',
        height: 40,
        color: 'white',
        minWidth: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        textAlign: 'center'

    },
    inputWeb: {
        borderColor: 'black',
        width: '60%',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 25,
        textAlign: 'right',
        justifyContent: 'flex-start',
        borderWidth: 1,
    },

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
    titleDownloadDate: {
        width: '60%',
        flexDirection: 'row',
        fontSize: 12,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

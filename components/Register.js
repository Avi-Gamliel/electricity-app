import React, { useState, useLayoutEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { auth, db } from '../firebase';
import { StatusBar } from 'expo-status-bar';
import InputDynamic from '../utitlyComp/InputDynamic'
import ButtonDynamic from '../utitlyComp/ButtonDynamic'

export default function Register({ navigation }) {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [secPass, setSecPass] = useState('')
    const [error, setError] = useState(false)
    const [msgError, setMsgError] = useState('')

    const registerUser = () => {

        if (password === '' || secPass === '' || name === '' || email === '') {
            setMsgError('חסרים פרטים')
            setError(true)
        } else if (password.length < 6) {
            setMsgError('הסיסמא פחות מ-6 ספרות')
            setError(true)
        } else if (password !== secPass) {
            setMsgError('הסיסמאות לא תואמות')
            setError(true)
        } else {

            auth.createUserWithEmailAndPassword(email, password)
                .then((authUser) => {
                    return db.collection('users').doc(authUser.user.uid).set({
                        name: name,
                        email: email
                    })
                }).catch(err => {
                    if (err.message === 'The email address is badly formatted.') {
                        setMsgError('יש בעיה עם כתובת המייל')
                        setError(true)
                    } else if (err.message === 'The email address is already in use by another account.')
                        setMsgError('מייל זה רשום על משתמש קיים')
                    setError(true)
                });

        }

        setTimeout(() => {
            setError(false)
        }, 6000);

    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'הרשמה',
            headerStyle: { backgroundColor: '#fd7e14', borderBottomLeftRadius: 15, borderBottomRightRadius: 15, height: 80 },
            headerTitleStyle: { color: 'white' },
            headerTintColor: 'white',

        })
    }, [])

    return (

        <View style={styles.container}>
            <StatusBar style="light" />
            <Text h1 style={styles.h1style}>הרשמה</Text>
            {error ?
                <Text style={styles.error}>{msgError}</Text> :
                null
            }
            <InputDynamic value={name} onChangeText={setName} placeHolder={'שם מלא'} typeInput="text" />
            <InputDynamic value={email} onChangeText={setEmail} placeHolder={'מייל'} typeInput="text" />
            <InputDynamic value={password} onChangeText={setPassword} placeHolder={'סיסמא'} typeInput="password" />
            <InputDynamic value={secPass} onChangeText={setSecPass} placeHolder={'הזן שנית את הסיסמא'} typeInput="password" />

            <ButtonDynamic onPress={registerUser} text={'הרשמה'} buttonColor="#fd7e14" textColor='white'>
                <Entypo style={styles.logogoogle} name="mail" size={20} color="white" />
            </ButtonDynamic>

            <Text style={{ marginTop: 10 }}>משתמש קיים?
            <Text style={styles.registerBtn} onPress={() => navigation.navigate('SignIn')}> כניסה </Text>
            </Text>

        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 15,
        justifyContent: 'center',
        backgroundColor: 'white'

    },
    error: {
        width: '70%',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 25,
        backgroundColor: '#dc3545',
        maxWidth: 300,
        color: 'white',
        marginBottom: 10
    },
    registerBtn: {
        color: '#fd7e14',
        right: 10,
        fontWeight: 'bold'
    },
    h1style: {
        fontSize: 50,
        color: "grey",
        fontWeight: 'bold',
        marginBottom: 50
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },

    logogoogle: {
        position: 'absolute',
        left: 10,
        width: 20,
        height: 20
    }
});

import React, { useState, useLayoutEffect, useEffect } from 'react';
import { Text, View, StyleSheet, LogBox, Image, Platform } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar'
import { auth, db } from '../firebase';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase/app'
import InputDynamic from '../utitlyComp/InputDynamic'
import ButtonDynamic from '../utitlyComp/ButtonDynamic';
import PromtDynamic from '../utitlyComp/PromtDynamic';
import LoadingScreen from './LoadingScreen'

const googleProvider = new firebase.auth.GoogleAuthProvider();
const googleIcon = 'https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png'

export default function SignIn(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [msgError, setMsgError] = useState('')
    const [restPass, setRestPass] = useState(false)

    useLayoutEffect(() => {
        props.navigation.setOptions({
            title: '',
            headerStyle: { height: 0, backgroundColor: 'red' },
        })
    }, [props.navigation])

    useEffect(() => {
        if (Platform.OS !== 'web') {
            LogBox.ignoreLogs(['Setting a timer']);
        }
    }, [])

    const socialMediaAuth = async (provider) => {

        return auth.signInWithPopup(provider).then(res => {
            props.login({ status: 'Loading', user: '' })
        }).catch(err => {
            return err;
        })
    }

    const signIn = () => {
        if (email === '' || password === '') {
            setMsgError('חסרים פרטים')
            setError(true)
        } else {

            auth.signInWithEmailAndPassword(email, password).then(() => {

            })
                .catch(err => {
                    if (err.message === 'The password is invalid or the user does not have a password.') {
                        setMsgError('הסיסמא לא נכונה')
                        setError(true)
                    } else if (err.message === "The email address is badly formatted.") {
                        setMsgError('יש בעיה בכתובת המייל')
                        setError(true)
                    }

                })
        }
        setTimeout(() => {
            setError(false)
        }, 6000);

    }

    function onSignIn(googleUser) {

        var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
            props.login({ status: 'Loading', user: '' })
            unsubscribe();
            if (!isUserEqual(googleUser, firebaseUser)) {
                var credential = firebase.auth.GoogleAuthProvider.credential(
                    googleUser.idToken,
                    googleUser.accessToken,
                );
                firebase
                    .auth()
                    .signInWithCredential(credential).then((result) => {
                    })
                    .catch((error) => {
                        props.login({ status: 'not', user: '' })

                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        // The email of the user's account used.
                        var email = error.email;
                        // The firebase.auth.AuthCredential type that was used.
                        var credential = error.credential;
                        // ...
                    });
            } else {

            }
        });
    }

    function isUserEqual(googleUser, firebaseUser) {
        if (firebaseUser) {
            var providerData = firebaseUser.providerData;
            for (var i = 0; i < providerData.length; i++) {
                if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                    providerData[i].uid === googleUser.getBasicProfile().getId()) {
                    // We don't need to reauth the Firebase connection.
                    return true;
                }
            }
        }
        return false;
    }

    async function signInWithGoogleAsync() {
        // props.navigation.replace('LoadingScreen')
        // props.login('loading')
        if (Platform.OS === 'web') {
            socialMediaAuth(googleProvider)

        } else {
            try {
                const result = await Google.logInAsync({
                    // behavior: 'web',
                    androidClientId: '522719535763-uiu2ngdtdk95e7v2cjucap73sd64btue.apps.googleusercontent.com',
                    androidStandaloneAppClientId: '522719535763-94qsdoo8d1s6jra65srvepbtujencl01.apps.googleusercontent.com',
                    // iosClientId: YOUR_CLIENT_ID_HERE,
                    scopes: ['profile', 'email'],
                });

                if (result.type === 'success') {


                    onSignIn(result)
                    return result.accessToken;
                } else {

                }
            } catch (e) {

            }

        }

    }

    return (

        <>
            <View style={styles.container}>
                {
                    restPass ?
                        <PromtDynamic
                            onPress={setRestPass}
                            text={'הזן כתובת מייל לאיפוס סיסמא'}
                            textCheck='שלח'
                            crossCheck='בטל'
                            placeHolder='מייל'
                        /> : null

                }

                <StatusBar style="light" />

                <Image style={styles.logo} source={require('../assets/icon.png')} />
                {error ?
                    <Text style={styles.error}>{msgError}</Text> :
                    null
                }

                <InputDynamic value={email} onChangeText={setEmail} placeHolder='מייל' typeInput="text" />
                <InputDynamic value={password} onChangeText={setPassword} placeHolder='סיסמא' typeInput="password" />

                <ButtonDynamic onPress={signIn} text={'כניסה'} buttonColor="#007bff" textColor='white'>
                    <Entypo style={styles.logogoogle} name="mail" size={20} color="white" />
                </ButtonDynamic>

                <ButtonDynamic onPress={signInWithGoogleAsync} text={'כניסה מהירה עם גוגל'} buttonColor="rgba(0,0,0,0.05)">
                    <Image
                        style={styles.logogoogle}
                        source={{ uri: googleIcon }}
                    />
                </ButtonDynamic>

                <Text style={{ marginTop: 5 }}> משתמש לא רשום?
                     <Text style={styles.registerBtn} onPress={() => props.navigation.navigate('Register')}> להרשמה </Text>
                </Text>

                <Text style={{ position: 'absolute', bottom: 20 }}> שכחתי סיסמא
            <Text style={styles.registerBtn} onPress={() => setRestPass(prev => !prev)}> לאיפוס לחץ כאן </Text>
                </Text>
            </View>


        </>

    )
}

const styles = StyleSheet.create({

    container: {
        position: 'absolute',
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 15,
        justifyContent: 'center',
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
    input: {
        borderColor: 'black',
        width: '70%',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 25,
        textAlign: 'right',
        justifyContent: 'flex-start',
        borderWidth: 1,
        marginBottom: 10,
        maxWidth: 300,

    },

    registerBtn: {
        color: '#007bff',
        right: 10,
        fontWeight: 'bold',
    },
    forgetPassword: {
        color: '#fd7e14',
        right: 10,
        fontWeight: 'bold',
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
        borderTopRightRadius: 150,
        borderTopLeftRadius: 150,
        borderBottomLeftRadius: 150,
        borderBottomRightRadius: 150,
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowRadius: 4.65,
        shadowOffset: { width: 2, height: 2 },
    },

    logogoogle: {
        position: 'absolute',
        left: 10,
        width: 20,
        height: 20
    },



});

import React, { useLayoutEffect } from 'react'
import { StyleSheet, StatusBar, Image, Text, View } from 'react-native'

const LoadingScreen = ({ navigation }) => {



    useLayoutEffect(() => {
        navigation.setOptions({
            title: '',
            headerStyle: { height: 0, backgroundColor: 'red' },

        })
    }, [navigation])

    return (
        <View style={styles.conainerLoading}>
            <StatusBar style="light" />
            <Image style={styles.imageLoading} source={require('../assets/adaptive-icon.png')} />
        </View>
    )
}

export default LoadingScreen

const styles = StyleSheet.create({

    conainerLoading: {
        flex: 1,
        height: '100%',
        marginTop: -5,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    imageLoading: {
        width: 150,
        height: 150
    }
})

import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function RadioButton(props) {

    return (

        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-end', marginTop: 10 }}>
            {props.items.data.map((item, key) => {
                return <View key={key} style={{ paddingHorizontal: 10, flexDirection: "row", alignContent: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity pressDuration={0.5} onPress={() => props.onPress(key)}>
                        <MaterialIcons style={{ paddingHorizontal: 5 }} name={`radio-button-${props.items.checked === key ? 'checked' : 'off'}`} size={24} color="black" />
                    </TouchableOpacity>
                    <Text>
                        {item}
                    </Text>
                </View>
            })}
        </View>

    );
}

const styles = StyleSheet.create({})

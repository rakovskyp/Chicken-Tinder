import React from 'react'

import { View, Text, StyleSheet } from 'react-native';

const InfoScreen = (props) => {

    return (
        <View>
            <Text>info screen placeholder, {props.somedata}</Text>
        </View>
    )
}

const s = StyleSheet.create({

});

export default InfoScreen;
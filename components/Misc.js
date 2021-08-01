import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import {
    useFonts,
    Jost_100Thin,
    Jost_200ExtraLight,
    Jost_300Light,
    Jost_400Regular,
    Jost_500Medium,
    Jost_600SemiBold,
    Jost_700Bold,
    Jost_800ExtraBold,
    Jost_900Black,
    Jost_100Thin_Italic,
    Jost_200ExtraLight_Italic,
    Jost_300Light_Italic,
    Jost_400Regular_Italic,
    Jost_500Medium_Italic,
    Jost_600SemiBold_Italic,
    Jost_700Bold_Italic,
    Jost_800ExtraBold_Italic,
    Jost_900Black_Italic,
  } from '@expo-google-fonts/jost';

// Misc. details relating to the card
const Misc = (props) => {

    // load in font
    let [fontsLoaded] = useFonts({
        Jost_300Light, Jost_600SemiBold,
    });

    const cuisine = props.data[props.cardIndex].cuisines[0];
    const id = props.data[props.cardIndex].restaurant_id;
    const name = props.data[props.cardIndex].name;
    const price = props.data[props.cardIndex].price;

    // if font isn't loaded, load it with default font 
    if (!fontsLoaded) {
        return (
            <Animated.View style={styles.misc}>
                <Text>{name}</Text>
                <Text>{cuisine}</Text>
                {/* <Text>Id: {id}</Text> */}
            </Animated.View>
        )
    } else {
        return (
            <Animated.View style={styles.misc}>
                <Text style={[styles.text, styles.resName,]}>{name}</Text>
                <Text style={[styles.text, styles.resCuisine,]}>{cuisine}</Text>
                <Text style={[styles.text, styles.resPrice]}>{price}</Text>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    // TODO: fix paddingTop of resName + resCuisine when dealing w/ diff device sizes
    misc: {
        position: 'absolute',
    },
    resName: {
        paddingTop: 470,
        fontFamily: 'Jost_600SemiBold',
        // position: 'absolute'
    },
    text: {
        color: 'white',
        fontFamily: 'Jost_300Light',
        fontSize: 30,
        paddingLeft: 20,
        position: 'absolute'
    }, 
    resCuisine: {
        paddingTop: 500,
    },
    resPrice : {
        paddingTop: 545,
        paddingLeft: 15,
        fontSize: 18,
    }
    
})

export default Misc;
import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import Logo from '../assets/chickentinder_yellow_4x.png';

const LandingScreen = (props) => {
    
    const navigateBasicInfo = () => {
        props.navigation.navigate('BasicInfo', {})
    }

    return (
        <>
        <View style={s.container}>
            <Image
                source={Logo}
                style={s.image}
            />
            <View style={s.buttonContainer}>
                <Button
                    title="LET'S START"
                    onPress={() => navigateBasicInfo()}
                    color="#FFD980"
                />
            </View>
        </View>
        </>
    );
}

const s = StyleSheet.create({
    container: {
      backgroundColor: "#FFD980",
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    },
    image: {
        width: 375,
        height: 667,
      justifyContent: "center"
    },
    buttonContainer: {
        backgroundColor: '#E83E32',
        borderRadius: 5,
        padding: 8,
    }
  });
  
  export default LandingScreen;
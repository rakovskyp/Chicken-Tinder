import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import Logo2 from '../assets/chickentinder_yellow_4x.png';
import LogoShadow from '../assets/first_page_shadow_4x.png';
import Logo from '../assets/first_page_4x.png';

const LandingScreen = (props) => {

    const navigateBasicInfo = () => {
        props.navigation.navigate('BasicInfo', {})
    }

    return (
        <>
        <View style={s.container} onTouchStart={() => navigateBasicInfo()}>
            <Image
                source={LogoShadow}
                style={s.image}
            />
            <Text style={s.text}>
                Tap anywhere to start
            </Text>
            {/* <View style={s.buttonContainer}>
                <Button
                    title = " "
                    onPress={() => navigateBasicInfo()}
                />
            </View> */}
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
        width: 378,
        height: 265,
        justifyContent: "center"
    },
    text: {
        color: "#E83E32",
        fontSize: 24
    }
  });
  
  export default LandingScreen;
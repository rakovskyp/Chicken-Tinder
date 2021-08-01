import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import Logo2 from '../assets/chickentinder_yellow_4x.png';
import LogoShadow from '../assets/first_page_shadow_4x.png';
import Logo from '../assets/first_page_4x.png';

const LandingScreen = (props) => {

    const navigateBasicInfo = () => {
        props.navigation.navigate('BasicInfo', {})
    }

    // const saveToAsyncStorage = async (key, value) => {
    //     try {
    //       const jsonValue = JSON.stringify(value)
    //       await AsyncStorage.setItem(key, jsonValue)
    //       console.log("async storage:", key, jsonValue, "successful")
    //     } catch (err) {
    //       console.log("error in saveToAsyncStorage:", err)
    //     }
    //   }
  
      // React.useEffect(() => {
      //   console.log('asking for location')
      //   getLocation()
      // }, [])
  
      // // get user's location and send it to the 
      // const getLocation = async () => {
      //   console.log('awaiting')
      //   const { status } = await Permissions.askAsync(Permissions.LOCATION_FOREGROUND)
      //   console.log('finished waiting')
      //   if (status !== 'granted') {
      //     console.log('PERMISSION NOT GRANTED FOR LOCATION')
      //   } 
  
      //   console.log('LOCATION GRANTED.')
  
      //   console.log('awaiting 2')
      //   const userLocation = await Location.getCurrentPositionAsync();
      //   console.log('worked')
      //   const { latitude, longitude } = userLocation.coords;
  
      //   saveToAsyncStorage('userLatitude', latitude)
      //   saveToAsyncStorage('userLongitude', longitude)
        
      //   console.log(userLocation);
        
      //   // add user's coordinates to firestore database
      //   await firebase.firestore().collection('coords').add({
      //     latitude: latitude,
      //     longitude: longitude,
      //   })
      // }

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
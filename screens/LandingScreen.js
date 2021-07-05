import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import Logo from '../assets/chickentinder_yellow_4x.png';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../firebase';

const LandingScreen = (props) => {
    
    const navigateBasicInfo = () => {
        props.navigation.navigate('BasicInfo', {})
    }

    const saveToAsyncStorage = async (key, value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem(key, jsonValue)
          console.log("async storage:", key, jsonValue, "successful")
        } catch (err) {
          console.log("error in saveToAsyncStorage:", err)
        }
      }
  
      React.useEffect(() => {
        console.log('asking for location')
        getLocation()
      }, [])
  
      // get user's location and send it to the 
      const getLocation = async () => {
        console.log('awaiting')
        const { status } = await Permissions.askAsync(Permissions.LOCATION_FOREGROUND)
        console.log('finished waiting')
        if (status !== 'granted') {
          console.log('PERMISSION NOT GRANTED FOR LOCATION')
        } 
  
        console.log('LOCATION GRANTED.')
  
        console.log('awaiting 2')
        const userLocation = await Location.getCurrentPositionAsync();
        console.log('worked')
        const { latitude, longitude } = userLocation.coords;
  
        saveToAsyncStorage('userLatitude', latitude)
        saveToAsyncStorage('userLongitude', longitude)
        
        console.log(userLocation);
        
        // add user's coordinates to firestore database
        await firebase.firestore().collection('coords').add({
          latitude: latitude,
          longitude: longitude,
        })
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
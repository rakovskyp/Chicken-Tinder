import React, { useEffect } from "react";
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Keyboard,
  TextInput,
  StyleSheet,
  View,
  Text
} from "react-native";
import firebase from '../firebase';

const BasicInfo = (props) => {

    const [name, setName] = React.useState("");

    const navigateUserType = () => {
        props.navigation.navigate('UserType', {
          name: name
        })
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

    useEffect(() => {
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
        <Text style={s.namePrompt}>
          ENTER NAME
        </Text>
        <TextInput
          style={s.input}
          placeholder="Please enter your name ..."
          onChangeText={
            text => setName(text)
          }
          onSubmitEditing={
              () => {
                Keyboard.dismiss
                navigateUserType()
              }
            }
        />
      </View>
    </>
  );
};

const s = StyleSheet.create({
  container: {
    backgroundColor: "#895322",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  namePrompt: {
    color: "#FFD980",
    fontFamily: "Village",
    fontSize: 90,
    paddingBottom: 30
  },
  input: {
    margin: 25,
    paddingBottom: 5,
    width: "65%",
    borderBottomWidth: 3.5,
    fontSize: 24,
    borderColor: "#FFD980",
    color: "#FFD980"
  },
});

export default BasicInfo;
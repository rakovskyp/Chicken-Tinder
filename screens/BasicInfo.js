import React, { useEffect } from "react";
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import {
  Keyboard,
  TextInput,
  StyleSheet,
  Button,
  View,
  Text,
} from "react-native";
import firebase from '../firebase'

const BasicInfo = (props) => {
  
    const [name, setName] = React.useState("");

    const navigateUserType = () => {
        props.navigation.navigate('UserType', {
          name: name
        })
    }

    useEffect(() => {
      console.log('asking for location')
      getLocation()
    }, [])

    // get user's location and send it to the 
    const getLocation = async () => {
      console.log('awaiting')
      const { status } = await Permissions.askAsync(Permissions.LOCATION)
      console.log('finished waiting')
      if (status !== 'granted') {
        console.log('PERMISSION NOT GRANTED FOR LOCATION')
      } 

      console.log('LOCATION GRANTED.')

      console.log('awaiting 2')
      const userLocation = await Location.getCurrentPositionAsync();
      console.log('worked')
      const { latitude, longitude } = userLocation.coords;
      
      // add user's coordinates to firestore database
      firebase.firestore().collection('coords').add({
        latitude: latitude,
        longitude: longitude,
      })

      console.log(userLocation);
    }

    
  return (
    <>
      <View>
        <TextInput
          style={s.input}
          placeholder="Please enter your name ..."
          onChangeText={
            text => setName(text)
          }
          onSubmitEditing={
              () => {
                Keyboard.dismiss
                console.log("Name entered:")
                navigateUserType()
              }
            }
        />
      </View>
    </>
  );
};

const s = StyleSheet.create({
  input: {
    margin: 60,
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  host: {
    paddingTop: 200
  },
});

export default BasicInfo;
import React, { useEffect } from 'react';
import { StyleSheet, Button, View, ScrollView, FlatList } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { FIREBASE_API_KEY } from '@env'

import CardDeck from './screens/CardDeck'
import Details from './components/Details'
import firebase from './firebase'

/*
  Future Ideas:
  ------------
    Copy tinder and prevent people from swiping too fast in order
    to optimize or load stuff faster
  */

const ChickenTinderApp = (props) => {

  console.log("firebase api key", FIREBASE_API_KEY)

  // hook that flips whether information mode styles should be activated or not
  const [infoStyles, setInfoStyles] = React.useState(true);

  // hook that decides which picture in arr of picture should be displayed
  const [picIndex, setPicIndex] = React.useState(0);

  // index represents the current card in the deck
  const [index, setIndex] = React.useState(0);

  // represents the restaurant data of the nearby restaurants
  const [resData, setResData] = React.useState([]);

  // reference to the main scroll view
  const mainScroll = React.useRef();

  /* 
    TODO : 
    - combine getLocation and postData into one useEffect [] hook.
    - ask for coordinates before 
    - fix i button cause there's an error with that
  */


    useEffect(() => 
    {
      console.log('asking for location')
      getLocation()
    }
    , [])

    useEffect(() => {
      postData('https://us-central1-chicken-tinder-c7de2.cloudfunctions.net/grubhubSearch-2', {
        latitude:"40.7415095",
        longitude:"-73.9569751"}
        )
      .then(data => {
        console.log('data incoming:')
        console.log(data); // JSON data parsed by `response.json()` call
        setResData(data)
      });
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
  
  // request data from google cloud platform
  async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  const handleInfoStyle = () => {
    setInfoStyles(!infoStyles)
    if(!infoStyles) {
      mainScroll.current.scrollTo({x: 0, y: 0})
    } else {
      mainScroll.current.scrollTo({x: 100, y: 100})
    }
  }

  // increments index by one
  const handleIncIndex = () => {
    setIndex(index => index + 1);
  }

  // handles the user's tap
  const handlePress = () => {
    console.log('incrementing pics')
    setPicIndex(picIndex => picIndex + 1);
  }

  return (
  <View style={{flex: 1, flexDirection: 'column',}}>
    
    <View style={{flex: 1,
      // height: 1000
      }}>
    
      <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        // borderColor: 'green', borderWidth: 5,
        height: 1000,
      }}
      scrollEnabled={!infoStyles}
      // this height will need to scale with amount of components 
      height={1000}
      ref={mainScroll}
      showsVerticalScrollIndicator={false}
      >

        <View>
          <View style={{flex: 1}}>
              {infoStyles && <CardDeck 
              infoStyleHuh={infoStyles}
              handleInfoStyle={handleInfoStyle}
              index={index}
              incIdx={handleIncIndex}
              handlePress={handlePress}
              picIdx={picIndex}
              data={resData}
              />}
          </View>
          
          <View 
          style={{flex: 1}}>
              {!infoStyles && <Details
              index={index}
              picIdx={picIndex}
              handleInfoStyle={handleInfoStyle}
              handlePress={handlePress}
              data={resData}
              />}
          </View>

        </View>
      </ScrollView>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  // TODO: fix marginTop and marginBottom when dealing w/ diff device sizes
  cardContain: {
      // flex: 1,
      // backgroundColor: 'skyblue',
      // margin: 10,
      // marginTop: 120,
      // marginBottom: 100,
      // borderWidth: 1,
      // borderColor: 'lightgrey',
      // borderRadius: 8,
      // overflow: 'hidden',
  },
  nothing: {
    // flex: 1,
    // width: 50,
    // height: 50,
  }, 
  scroll: {

  }
});

export default ChickenTinderApp
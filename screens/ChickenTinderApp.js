import React, { useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { FIREBASE_API_KEY } from "@env";

import CardDeck from "../components/CardDeck";
import AsyncStorage from "@react-native-async-storage/async-storage";

/*
  Future Ideas:
  ------------
    Copy tinder and prevent people from swiping too fast in order
    to optimize or load stuff faster
  */

const ChickenTinderApp = (props) => {
  const lobbyNumber = props.navigation.state.params.lobbyNumber;

  const { docId } = props.navigation.state.params;

  const { prefId } = props.navigation.state.params;

  console.log("firebase api key", FIREBASE_API_KEY);
  console.log("lobby id", props.navigation.state.params.lobbyNumber);

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

  // Hook to determine if the modal "info page" should be displayed or not
  const [infoVisible, setInfoVisible] = React.useState(false); 

  /*

  - coords should actually be working, for some reason i'm 
  getting only papa johns ????

  - check google cloud trigger to see whats up with that

  - after fix we need to go to 

  */

  useEffect(() => {
    async function getData() {
      try {
        const userLat = await AsyncStorage.getItem("userLatitude");
        const userLong = await AsyncStorage.getItem("userLongitude");

        if (userLat !== null && userLong !== null) {

          getToken().then(
            (tokenData) => {
              console.log("token data", tokenData)
              postData(
                "https://o6mr05jxvh.execute-api.us-east-2.amazonaws.com/default/Grubhub_Search", {
                  latitude: userLat,
                  longitude: userLong,
                }, tokenData.auth_token
                // put this in a try catch, what if the token doesn't work??
              ).then((data) => {
                console.log("data incoming:");
                console.log(data); // JSON data parsed by `response.json()` call
                setResData(data);
              });

            }
          )
            
        }
      } catch (e) {
        console.log("error", e);
      }
    }

    getData();
  }, []);

  // request data from google cloud platform
  async function postData(url = "", data = {}, token) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        "Authorization" : token,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  async function getToken() {
    // Default options are marked with *
    const response = await fetch('https://v7zjrf3ocj.execute-api.us-east-2.amazonaws.com/default/token_gen', {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  const handleInfoStyle = () => {
    setInfoStyles(!infoStyles);
    if (!infoStyles) {
      mainScroll.current.scrollTo({ x: 0, y: 0 });
    } else {
      mainScroll.current.scrollTo({ x: 100, y: 100 });
    }
  };

  const navigateInfoScreen = () => {
    //TODO: Right now it is navigating to this modal as a separate screen. 
    // If we want to achieve an overlay, we might want to render the info screen 
    // in the card deck. Either way, it seems to make sense to keep the infoscreen 
    // as a separate component. 
    // This package might be a way to achieve this: https://www.npmjs.com/package/react-native-modal-overlay

    //TODO: Another note, I have been having trouble with my expo build getting the button click to work
    // I am fairly confident the stuff I have added should work, but take a look for yourself anyway. 

    // set the info screen to be visible
    setInfoVisible(!infoVisible)

    // Navigate to the info screen and provide appropriate props. 
    console.log("Navigating to InfoScreen")
    props.navigation.navigate("InfoScreen", {
      data: resData,
      cardIndex: index, 
      modalActive: infoVisible, 
      toggleInfo: handleInfoPress 
    });
  };

  // increments index by one
  const handleIncIndex = () => {
    setIndex((index) => index + 1);
  };

  // handles the user's tap
  const handlePress = () => {
    console.log("incrementing pics");
    setPicIndex((picIndex) => picIndex + 1);
  };

  // handles activating the modal information screen 
  const handleInfoPress = () => {
    console.log("Info Toggled")
    setInfoVisible(!infoVisible)
  }

  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <View
        style={{
          flex: 1,
          // height: 1000
        }}
      >
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
            <View style={{ flex: 1 }}>
              {infoStyles && (
                <CardDeck
                  infoStyleHuh={infoStyles}
                  handleInfoStyle={handleInfoStyle}
                  index={index}
                  incIdx={handleIncIndex}
                  // handlePress={handlePress}
                  lobbyNumber={lobbyNumber}
                  docId={docId}
                  picIdx={picIndex}
                  prefId={prefId}
                  data={resData}
                  navInfo={navigateInfoScreen}
                  infoPress={handleInfoPress}
                />
              )}
            </View>

            <View style={{ flex: 1 }}>
              {!infoStyles && (
                <Details
                  index={index}
                  picIdx={picIndex}
                  // handleInfoStyle={handleInfoStyle}
                  // handlePress={handlePress}
                  data={resData}
                />
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

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
  scroll: {},
});

export default ChickenTinderApp;

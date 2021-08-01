import React, { useEffect } from "react";
import {
  Keyboard,
  TextInput,
  StyleSheet,
  Button,
  View,
  Text,
  TouchableWithoutFeedback, 
  Dimensions
} from "react-native";
import firebase from '../firebase'
import fb from 'firebase'

const UserType = ({ navigation }) => {

    const [lobbyNumber, setLobbyNumber] = React.useState("")

    const { name } = navigation.state.params

    const dbRef = firebase.firestore().collection('lobby')
    
    const generateRandom = () => {
      const random = Math.floor(Math.random() * 10000).toString()

      return random
    }

    const startLobby = async (random) => {
      dbRef.doc(random).set({})

      const res = await dbRef.doc(random).collection("person").add({
        usertype: 'host',
        name: name
      })

      // create preferences
      const pref = await dbRef.doc(random).collection("person").doc(res.id).collection('preferences').add({
        joinedLobby: fb.firestore.FieldValue.serverTimestamp()
      })

      // create scoreboard
      dbRef.doc(random).collection("leaderboard").doc("score").set({})

      // navigation.navigate('Lobby', {
      //   userType: 'host',
      //   lobbyNumber: random,
      //   docId:  res.id,
      //   prefId: pref.id
      // })
      navigation.navigate('LocationScreen', {
        userType: 'host',
        lobbyNumber: random,
        docId:  res.id,
        prefId: pref.id,
        name: name
      })

    }

    const addGuestToLobby = async (lobbyNumber, name) => {
      const res = await dbRef.doc(lobbyNumber).collection("person").add({
        usertype: 'guest',
        name: name,
      })

      const pref = await dbRef.doc(lobbyNumber).collection("person").doc(res.id).collection('preferences').add({
        joinedLobby: fb.firestore.FieldValue.serverTimestamp()
      })
      
      navigation.navigate('Lobby', {
        userType: 'guest',
        lobbyNumber: lobbyNumber,
        docId:  res.id,
        prefId: pref.id,
        name: name
      })
    }

    const HostButton = () => {
      return (
        <TouchableWithoutFeedback 
        onPress={() => {
            console.log("navigating to lobby as host")
            const lobbyNumber = generateRandom()
            startLobby(lobbyNumber)
            }
        }>
          <View style={s.hostButtonContainer}>
            <Text style={s.hostButtonText}>
              host
            </Text>
          </View>
        </TouchableWithoutFeedback>
      )
    }

    const JoinLobbyContainer = () => {
      return (
        <View style={s.joinButtonContainer}>
          <Text style={s.hostButtonText}>
            join 
          </Text>
          <TextInput
            style={s.input}
            placeholder="enter lobby code..."
            onSubmitEditing={
                () => {
                  Keyboard.dismiss

                  console.log("LOBBY NUMBER", lobbyNumber)
                  try {
                    dbRef.doc(  lobbyNumber).get()
                    .then((docSnapshot) => {
                      if (docSnapshot.exists) {
                        addGuestToLobby(lobbyNumber, name)
                        console.log("adding guest to lobby")
                      } else {
                        console.log('no lobby exists')
                      }
                    });
                  } catch (error){
                    console.log('lobby not found')
                  }
                  
                }
              //  if this is wrong - clear box and send an alert!!
              //  if the text is empty, don't allow a submit
              }
            onChangeText={
              (textValue) => {
                setLobbyNumber(textValue)
                console.log(textValue)
              }
            }
          />
        </View>
      )
    }

    
  return (
    <>
    <View style={s.container}>
      <Text style={s.hiText}>
        Hi {name}!
      </Text>

      <HostButton/>

      <Text style={s.orText}> or </Text>

      <JoinLobbyContainer/>

    </View>
    </>

  );
};

const windowHeight = Dimensions.get('window').height;

const s = StyleSheet.create({
  container: {
    backgroundColor: "#895322",
    flex: 1,
    alignItems: "center"
  },
  hiText: {
    fontSize: 80,
    fontFamily: "Village",
    color: "#FFD980",
    marginTop: windowHeight/5,
    marginBottom: "12.5%"
  },
  orText: {
    marginTop: "10%",
    marginBottom: "10%",
    fontSize: 30,
    color: "#FFD980",
  },
  hostButtonContainer: {
    backgroundColor: '#E83E32',
    // marginTop: 30,
    // marginBottom: 30,
    borderRadius: 5,
    width: "65%",
    height: "10%",
    // paddingTop: 10,
    // paddingBottom: 10,
    // paddingLeft: 75,
    // paddingRight: 75,
    alignItems: "center",
    justifyContent: "center"
  },
  joinButtonContainer: {
    backgroundColor: '#E83E32',
    // marginTop: 30,
    // marginBottom: 30,
    borderRadius: 5,
    width: "65%",
    height: "20%",
    // paddingTop: 10,
    // paddingBottom: 10,
    // paddingLeft: 75,
    // paddingRight: 75,
    alignItems: "center",
    justifyContent: "center"
  },
  hostButtonText: {
    color: "#FFD980",
    fontSize: 35
  },
  input: {
    marginTop: 10,
    marginBottom: 10, 
    padding: 5,
    borderWidth: 3,
    borderColor: "#FFD980",
    borderRadius: 5,
    backgroundColor: "#fff",
    fontSize: 20,
    //color: "#E83E32"
  }
});

export default UserType;

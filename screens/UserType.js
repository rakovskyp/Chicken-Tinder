import React, { useEffect } from "react";
import {
  Keyboard,
  TextInput,
  StyleSheet,
  Button,
  View,
  Text,
} from "react-native";
import firebase from '../firebase'
import fb from 'firebase'

const UserType = ({ navigation }) => {

    const [lobbyNumber, setLobbyNumber] = React.useState("")

    const { name } = navigation.state.params;

    const dbRef = firebase.firestore().collection('lobby')

    const generateRandom = () => {
      const random = Math.floor(Math.random() * 10000).toString()

      return random
    }

    const startLobby = async (random) => {

      const res = await dbRef.doc(random).collection("person").add({
        usertype: 'host',
        name: name
      })

      // create preferences
      dbRef.doc(random).collection("person").doc(res.id).collection('preferences').doc("preference").set({
        joinedLobby: fb.firestore.FieldValue.serverTimestamp()
      })

      // create scoreboard
      dbRef.doc(random).collection("leaderboard").doc("score").set({})

      navigation.navigate('Lobby', {
        userType: 'host',
        lobbyNumber: random,
        docId:  res.id,
      })
    }

    const addGuestToLobby = async (lobbyNumber, name) => {
      const res = await dbRef.doc(lobbyNumber).collection("person").add({
        usertype: 'guest',
        name: name,
      })

      dbRef.doc(lobbyNumber).collection("person").doc(res.id).collection('preferences').doc("preference").set({
        joinedLobby: fb.firestore.FieldValue.serverTimestamp()
      })
      
      navigation.navigate('Lobby', {
        userType: 'guest',
        lobbyNumber: lobbyNumber,
        docId:  res.id,
      })
    }

    
  return (
    <>
    <View style={s.host}>
      <Text>
        Hi {name}!
      </Text>
    </View>
      <View style={s.host}>
        <Button title="Host Lobby"
        onPress={
            () => {
                console.log("navigating to lobby as host")
                const lobbyNumber = generateRandom()
                startLobby(lobbyNumber)
            }
        }
        />
      </View>

      <View>
        <TextInput
          style={s.input}
          placeholder="Click here to join an existing lobby ..."
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

export default UserType;

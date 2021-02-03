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

const UserType = ({ navigation }) => {

    const [lobbyNumber, setLobbyNumber] = React.useState("")

    const [docId, setDocId] = React.useState("")

    const { name } = navigation.state.params;

    const dbRef = firebase.firestore().collection('lobby')

    const navigateLobby = (userTypeInfo, lobbyNumber, docId) => {
      console.log("DOC ID IS", docId)
        navigation.navigate('Lobby', {
          userType: userTypeInfo,
          lobbyNumber: lobbyNumber,
          docId:  docId
        })
    }


    const generateRandom = () => {
      const random = Math.floor(Math.random() * 10000).toString()

      return random
    }

    const startLobby = (random) => {
      dbRef.doc(random).set({})

      dbRef.doc(random).collection("person").add({
        usertype: 'host',
        name: name
      })
      // .then((docRef) => {
      //   navigateLobby("host", lobbyNumber, docRef.id)
      // })
    }

    const addGuestToLobby = (lobbyNumber, name) => {
      dbRef.doc(lobbyNumber).collection("person").add({
        usertype: 'guest',
        name: name,
      })
      .then((docRef) => {
        setDocId(docRef.id)
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
                // generate random number, stored in backend
                const lobbyNumber = generateRandom()
                startLobby(lobbyNumber)
                // place user in lobby
                navigateLobby("host", lobbyNumber, docId)
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
                      navigateLobby("guest", lobbyNumber, docId)
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

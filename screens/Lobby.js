import React, { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  TextInput,
  StyleSheet,
  Button,
  View,
  Text,
  FlatList,
  AppState
} from "react-native";
import LobbyUser from '../components/LobbyUser'
import firebase from '../firebase'

const Lobby = (props) => {

    const [lobbyUsers, setLobbyUsers] = React.useState([])

    const userType = props.navigation.state.params.userType
    
    const lobbyNumber = props.navigation.state.params.lobbyNumber

    const { docId } = props.navigation.state.params

    const { prefId } = props.navigation.state.params

    // console.log(lobbyNumber)

    const personRef = firebase.firestore().collection('lobby').doc(lobbyNumber).collection('person')

    const navigateChickenTinderApp = () => {
        props.navigation.replace('ChickenTinderApp', {
          lobbyNumber: lobbyNumber,
          docId : docId, 
          prefId : prefId
        })
    }

    useEffect(() => {
      const unsubscribe = personRef
      .onSnapshot(function(querySnapshot) {
          const personList = [];
          
          querySnapshot.forEach(function(doc) {
              personList.push({
                id: doc.id,
                name: doc.data().name,
                usertype: doc.data().usertype
              });
          });
  
          setLobbyUsers(personList)

          // console.log('subscribed')
  
      });

      return () => {
        // console.log('unsub')
        unsubscribe()
      }
    })

    
  return (
    <>
      <View>
        <Text>
          Lobby ID:  {lobbyNumber}
        </Text>
      </View>
      <View >
      <Button title="Start Lobby"
        onPress={
            () => {
                console.log("navigating to chicken tinder")
                console.log("user is", userType)
                navigateChickenTinderApp()
            }
        }
        />
      </View>
      <View>
        <FlatList
        data = {lobbyUsers}
        keyExtractor = {(person) => person.id}
        renderItem ={ ({item}) => <LobbyUser name={item.name} usertype={item.usertype}/>}
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

export default Lobby;

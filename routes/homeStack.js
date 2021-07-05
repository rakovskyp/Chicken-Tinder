import React from "react"
import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import ChickenTinderApp from '../screens/ChickenTinderApp'
import LandingScreen from '../screens/LandingScreen'
import BasicInfo from '../screens/BasicInfo'
import UserType from '../screens/UserType'
import Lobby from '../screens/Lobby'
import InfoScreen from '../screens/InfoScreen'
import firebase from '../firebase'
import LoadingScreen from "../screens/LoadingScreen"
import LocationScreen from "../screens/LocationScreen"

const findNewHost = async (personRef) => {
    const newHostSnapshot = await personRef.where('usertype', '==', 'guest').limit(1).get()

    if (newHostSnapshot.empty) {
        console.log("empty lobby")
        return 'nah'
    } else {
        newHostSnapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
            personRef.doc(doc.id).update({
                usertype: 'host'
            })
        });
    }
}

const screens = {
    LoadingScreen: {
        screen: LoadingScreen,
        navigationOptions: ({navigation}) => ({
            gestureEnabled: false,
            headerShown: false
        })
    },
    LandingScreen: {
        screen: LandingScreen,
        navigationOptions: ({navigation}) => ({
            gestureEnabled: false,
            headerShown: false
        })
    },
    LocationScreen: {
        screen: LocationScreen,
        navigationOptions: ({navigation}) => ({
            gestureEnabled: false,
            headerShown: false
        })
    },
    BasicInfo: {
        screen: BasicInfo,
        navigationOptions: ({navigation}) => ({
            gestureEnabled: false,
            headerShown: false
        })
    },
    UserType: {
        screen: UserType,
        navigationOptions: ({navigation}) => ({
            gestureEnabled: false,
        })
    },
    Lobby: {
        screen: Lobby,
        navigationOptions: ({navigation}) => ({
            title: 'Profile',
            gestureEnabled: false,
            headerLeft: () => <HeaderBackButton onPress={
                () => {
                    const { lobbyNumber } = navigation.state.params;
                    const { docId } = navigation.state.params;
                    const { userType } = navigation.state.params;
                    const personRef = firebase.firestore().collection('lobby').doc(lobbyNumber).collection('person')
                    console.log("stacknav")
                    console.log('docId of user', docId, 'lobby of user', lobbyNumber, 'usertype', userType)

                    if (userType == 'host') {
                        findNewHost(personRef)
                    }

                    personRef.doc(docId).delete()

                    navigation.navigate('UserType')
                    // 2-13-2020 - don't forget, deleting a document doesn't delete it's subcollections
                    // DELETE LOBBIES WHEN THERE ARE NO PEOPLE IN IT!!!!
                }
            } 
            />
        })
    },
    ChickenTinderApp: {
        screen: ChickenTinderApp,
        navigationOptions: ({navigation}) => ({
            gestureEnabled: false,
        }),
    },
    InfoScreen: {
        screen: InfoScreen,
        navigationOptions: ({navigation}) => ({
            gestureEnabled: false,
        }),
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack)
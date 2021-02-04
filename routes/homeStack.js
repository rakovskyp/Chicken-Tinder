import React from "react"
import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import ChickenTinderApp from '../ChickenTinderApp'
import BasicInfo from '../screens/BasicInfo'
import UserType from '../screens/UserType'
import Lobby from '../screens/Lobby'
import firebase from '../firebase'

const screens = {
    BasicInfo: {
        screen: BasicInfo
    },
    UserType: {
        screen: UserType
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
                    personRef.doc(docId).delete()
                    navigation.navigate('UserType')
                    // 2-13-2020 - don't forget, deleting a document doesn't delete it's subcollections
                }
            } 
            />
        })
    },
    ChickenTinderApp: {
        screen: ChickenTinderApp
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack)
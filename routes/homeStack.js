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
            headerLeft: () => <HeaderBackButton onPress={
                () => {
                    const { lobbyNumber } = navigation.state.params;
                    const { docId } = navigation.state.params;
                    console.log("stacknav")
                    console.log(lobbyNumber)
                    console.log('docId of user', docId)
                    navigation.navigate('UserType')
                }
            
            } />
        })
    },
    ChickenTinderApp: {
        screen: ChickenTinderApp
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack)
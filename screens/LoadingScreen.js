import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import * as Font from "expo-font";

export default class LoadingScreen extends React.Component {
    
    async componentDidMount() {
        await Font.loadAsync({
            Village: require("../assets/fonts/Village.ttf")
        });

        this.props.navigation.navigate("LandingScreen");
    }

    render() {
        return (
            <View stlye={s.container}>
                <ActivityIndicator size="large"/>
            </View>
        );
    }
}

const s = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: "center",
        alignItems: "center"
    }
})
import * as React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { StyleSheet, View, Text, Dimensions, Button, Image, Platform, SafeAreaView } from 'react-native';
import MapView from 'react-native-maps';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GOOGLE_PLACES_API_KEY } from "@env"

import marker from '../assets/marker.png'

const LocationScreen = (props) => {

    // const { lobbyNumber } = route.params

    const [region, setRegion ] = React.useState({
        latitude: 40.653149,
        longitude: 73.650040,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        time: 0
    })

    async function getAsyncLoc() {
        const userLat = await AsyncStorage.getItem("userLatitude");
        const userLong = await AsyncStorage.getItem("userLongitude");

        setRegion({
            latitude: parseFloat(userLat),
            longitude: parseFloat(userLong),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            time: new Date().getTime()
        })
    }

    const navigateLobby = () => {

        // console.log("name", props.navigation.params.name)
        console.log("lat", region.latitude)
        console.log("long", region.longitude)
        // console.log("userType", props.route.params.userType)
        console.log("lobnum", props.navigation.getParam('lobbyNumber'))
        console.log("docid", props.navigation.getParam('docId'))
        // console.log("prefid", props.navigation.params.prefId)
        props.navigation.navigate('Lobby', {
        name: props.navigation.getParam('name'),
        lat: region.latitude,
        long: region.longitude,
        userType: props.navigation.getParam('userType'),
        lobbyNumber: props.navigation.getParam('lobbyNumber'),
        docId:  props.navigation.getParam('docId'),
        prefId: props.navigation.getParam('prefId')
        })
    }

    React.useEffect(() => {
        getAsyncLoc()
      }, [])



    return (
        <>
            <View style={s.container}>
                <GooglePlacesAutocomplete
                    placeholder='Search for a location'
                    fetchDetails={true}
                    GooglePlacesSearchQuery={{
                        rankby: "distance"
                    }}
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log(data, details);
                        setRegion({
                            latitude: details.geometry.location.lat,
                            longitude: details.geometry.location.lng,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                            time: new Date().getTime()
                        })
                    }}
                    query={{
                        key: GOOGLE_PLACES_API_KEY,
                        language: 'en',
                        components: "country:us",
                        radius: 30000,
                        location: `${region.latitude}, ${region.longitude}`
                    }}
                    styles={{
                        container : { flex: 0, position: "absolute", top: '8%', left: '5%', right: '5%', zIndex: 1, width: '90%', },
                        listView: { backgroundColor: "white" },
                        textInput: {
                            height: 50,
                            color: '#5d5d5d',
                            fontSize: 17,
                            borderRadius: 20,
                        },
                        textInputContainer: {
                            shadowColor: "#000000",
                            shadowOpacity: 0.3,
                            shadowOffset: {
                            width: 0,
                            height: 8,
                            },
                            elevation: 16,
                            shadowRadius: 10,
                        },
                        predefinedPlacesDescription: {
                        color: '#1faadb',
                        },
                        poweredContainer: {
                        borderBottomRightRadius: 20,
                        borderBottomLeftRadius: 20,
                        },
                        
                    }}
                    />
                <MapView
                    style={s.map} 
                    provider="google"
                    initialRegion={{
                        latitude: 40.653149,
                        longitude: 73.650040,
                        latitudeDelta: 100,
                        longitudeDelta: 100,
                        time: new Date().getTime()
                    }}
                    region={{
                        latitude: region.latitude,
                        longitude: region.longitude,
                        latitudeDelta: region.latitudeDelta,
                        longitudeDelta: region.longitudeDelta,
                        time: new Date().getTime()
                    }}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    onRegionChangeComplete={(rgn) => {
                            console.log(rgn)
                        } 
                    }
                >
                </MapView>
                <View style={s.markerFixed}>
                    <Image style={s.marker} source={marker} />
                </View>
                <View style={s.letsEatBttnView}>
                    <Button
                        title="Let's Eat!"
                        color="#895322"
                        onPress={() => navigateLobby()}
                    />
                </View>
                <View style={s.cuisinesBttnView}>
                    <Button
                        title="Cuisines"
                        color="#000000"
                        onPress={() => navigateLobby()}
                    />
                </View>

            </View>
        </>
    );
}

const s = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      flex: 1,
    }, 
    letsEatBttnView : {
      position: 'absolute',//use absolute position to show button on top of the map
      top: '89%', //for center align
      left: '30%',
      alignSelf: 'flex-end', //for align to right
      flex: 1,
      borderWidth: .25,
      borderRadius: 5,
      borderColor: '#FFD980',
      width: '35%',
      height: '5%',
      backgroundColor: '#FFD980',
      shadowColor: "#000000",
      shadowOpacity: 0.2,
      shadowOffset : { width: 1, height: 5},
    },
    cuisinesBttnView: {
        position: 'absolute',//use absolute position to show button on top of the map
        top: '20%', //for center align
        left: '30%',
        alignSelf: 'flex-end', //for align to right
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        shadowColor: "#000000",
        shadowOpacity: 0.2,
        shadowOffset : { width: 1, height: 5},
    },
    markerFixed: {
        left: '50%',
        marginLeft: -24,
        marginTop: -48,
        position: 'absolute',
        top: '50%'
      },
    marker: {
        height: 48,
        width: 48
    }, 
  });
  
export default LocationScreen;


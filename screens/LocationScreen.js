import * as React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { StyleSheet, View, Text, Dimensions, Button, Image } from 'react-native';
import MapView, { Marker, AnimatedRegion, Animated } from 'react-native-maps';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GOOGLE_PLACES_API_KEY } from "@env"

const LocationScreen = (props) => {

    const [region, setRegion ] = React.useState({
        latitude: 40.653149,
        longitude: 73.650040,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    })

    async function getAsyncLoc() {
        const userLat = await AsyncStorage.getItem("userLatitude");
        const userLong = await AsyncStorage.getItem("userLongitude");

        setRegion({
            latitude: parseFloat(userLat),
            longitude: parseFloat(userLong),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        })
    }

    const navigateUserType = () => {
        props.navigation.navigate('UserType', {
          name: props.name,
          lat: region.latitude,
          long: region.longitude
        })
    }

    React.useEffect(() => {
        getAsyncLoc()
        console.log("name is", props.username)
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
                        container : { flex: 0, position: "absolute", width: "100%", zIndex: 1 },
                        listView: { backgroundColor: "white" }
                    }}
                    />
                <MapView
                    style={s.map} 
                    provider="google"
                    initialRegion={{
                        latitude: 40.653149,
                        longitude: 73.650040,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}
                    region={{
                        latitude: region.latitude,
                        longitude: region.longitude,
                        latitudeDelta: region.latitudeDelta,
                        longitudeDelta: region.longitudeDelta
                    }}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                >
                <Marker coordinate={{latitude: region.latitude, longitude: region.longitude }} />
                </MapView>
                <View style={s.letsEatBttnView}>
                    <Button
                        title="Let's Eat!"
                        color="#FFFFFF"
                        onPress={() => navigateUserType()}
                    />
                </View>

            </View>
        </>
    );
}

const s = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 50
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
      width: '35%',
      height: '5%',
      backgroundColor: '#FFD980',
    }
  });
  
export default LocationScreen;


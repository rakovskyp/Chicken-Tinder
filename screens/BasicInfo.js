import React, { useEffect } from "react";
import {
  Keyboard,
  TextInput,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback, 
  Button,
  Dimensions
} from "react-native";

const DismissKeyboard = ( {children} ) => (
  <TouchableWithoutFeedback onPress={() => dismissAndRenderNextButton()}>
    {children}
  </TouchableWithoutFeedback>
);

let shouldLoadNextButton = false;

const dismissAndRenderNextButton = () => {
  Keyboard.dismiss()
  //if (name.trim()) {
  shouldLoadNextButton = true;
  //}
}

const BasicInfo = (props) => {

    const [name, setName] = React.useState("");

    //const [loadNextButton, setLoadNextButton] = React.useState(false);

    const navigateUserType = () => {
        props.navigation.navigate('UserType', {
          name: name
        })
    }

    useEffect(() => {
      console.log('asking for location')
      getLocation()
    }, [])

    // get user's location and send it to the 
    const getLocation = async () => {
      console.log('awaiting')
      const { status } = await Permissions.askAsync(Permissions.LOCATION)
      console.log('finished waiting')
      if (status !== 'granted') {
        console.log('PERMISSION NOT GRANTED FOR LOCATION')
      } 

      console.log('LOCATION GRANTED.')

      console.log('awaiting 2')
      const userLocation = await Location.getCurrentPositionAsync();
      console.log('worked')
      const { latitude, longitude } = userLocation.coords;
      
      // add user's coordinates to firestore database
      firebase.firestore().collection('coords').add({
        latitude: latitude,
        longitude: longitude,
      })

      console.log(userLocation);
    }

    const NextButton = () => {
      return (
        <TouchableWithoutFeedback onPress={() => navigateUserType()}>
          <View style={s.buttonContainer}>
            <Text style={s.nextButtonText}>
              next
            </Text>
          </View>
        </TouchableWithoutFeedback>
      )
    }

    const NextButton2 = () => {
      return (
        <View style={s.buttonContainer}>
          <Button title="NExT" onPress={() => navigateUserType()}>
            <Text style={s.nextButtonText}>
              next
            </Text>
          </Button>
        </View>
      )
    }

  return (
    <DismissKeyboard>
      <View style={s.container}>
        <Text style={s.namePrompt}>
          ENTER NAME
        </Text>
        <TextInput
          style={s.input}
          onChangeText={
            text => setName(text)
          }
          onSubmitEditing={
              () => {
                Keyboard.dismiss
                navigateUserType()
              }
            }
        />
        {shouldLoadNextButton && <NextButton/>}
      </View>
    </DismissKeyboard>
  );
};

const windowHeight = Dimensions.get('window').height;

const s = StyleSheet.create({
  container: {
    backgroundColor: "#895322",
    flex: 1,
    alignItems: "center"
    //justifyContent: "center"
  },
  namePrompt: {
    color: "#FFD980",
    fontFamily: "Village",
    marginTop: windowHeight/3,
    fontSize: 90
  },
  input: {
    margin: "5%",
    marginBottom: "15%",
    paddingBottom: "1%",
    width: "65%",
    borderBottomWidth: 3.5,
    fontSize: 24,
    textAlign: "center",
    borderColor: "#FFD980",
    color: "#FFD980"
  },
  nextButtonText: {
    color: "#895322",
    fontSize: 24
  },
  buttonContainer: {
    backgroundColor: '#FFD980',
    borderRadius: 5,
    paddingTop: 12.5,
    paddingBottom: 12.5,
    paddingLeft: 75,
    paddingRight: 75
}
});

export default BasicInfo;
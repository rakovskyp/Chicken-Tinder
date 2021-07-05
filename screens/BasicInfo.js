import React, { useEffect } from "react";
import {
  Keyboard,
  TextInput,
  StyleSheet,
  View,
  Text
} from "react-native";

const BasicInfo = (props) => {

    const [name, setName] = React.useState("");

    const navigateLocationScreen = () => {
        props.navigation.navigate('LocationScreen', {
          name: name
        })
    }

  return (
    <>
      <View style={s.container}>
        <Text style={s.namePrompt}>
          ENTER NAME
        </Text>
        <TextInput
          style={s.input}
          placeholder="Please enter your name ..."
          onChangeText={
            text => setName(text)
          }
          onSubmitEditing={
              () => {
                Keyboard.dismiss
                navigateLocationScreen()
              }
            }
        />
      </View>
    </>
  );
};

const s = StyleSheet.create({
  container: {
    backgroundColor: "#895322",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  namePrompt: {
    color: "#FFD980",
    fontFamily: "Village",
    fontSize: 90,
    paddingBottom: 30
  },
  input: {
    margin: 25,
    paddingBottom: 5,
    width: "65%",
    borderBottomWidth: 3.5,
    fontSize: 24,
    borderColor: "#FFD980",
    color: "#FFD980"
  },
});

export default BasicInfo;
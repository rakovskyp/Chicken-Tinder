import React from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import Picture from '../components/Picture';
import Misc from '../components/Misc';
import { MaterialCommunityIcons } from '@expo/vector-icons';


// render the individual card
const Card = (props) => {

        return (
                    // <TouchableHighlight
                    // onPress={
                    //     props.navInfo
                    // }
                    // >
                        <View>
                                <Picture
                                cardIndex={props.cardIndex}
                                picIdx={props.picIdx}
                                data={props.data}
                                />
                                
                                <Misc 
                                cardIndex={props.cardIndex}
                                data={props.data}
                                />

                            <View style={styles.infoButton}>
            
                                <MaterialCommunityIcons.Button
                                name='information'
                                backgroundColor='transparent'
                                underlayColor='transparent'
                                size={40}
                                onPress={props.navInfo}
                                cardIndex = {props.cardIndex}
                                />
            
                            </View>
                    </View>
               
        )

}

const styles = StyleSheet.create({
    infoButton: {
        position: 'absolute',
        marginTop: 485,
        marginLeft: 250,
    }
})

export default Card;
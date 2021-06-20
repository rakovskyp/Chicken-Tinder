import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Animated, TouchableWithoutFeedback, Button } from 'react-native';
import Picture from '../components/Picture';
import Misc from '../components/Misc';
import { MaterialCommunityIcons } from '@expo/vector-icons';


// render the individual card
const Card = (props) => {


    // hook that switches between information mode and swiping mode
    const [infoMode, setInfoMode] = React.useState(false); 

        return (
                <TouchableHighlight
                // activeOpacity={1}
                // onLongPress={props.handlePress}
                // delayLongPress={1}
                onPressIn={props.handlePress}
                // onPress={() => console.log('hi')}
                >
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
                            size={25}
                            onPress={
                                () => {
                                    props.navInfo()
                                }
                            }
                            />
        
                        </View>
                </View>
    
                </TouchableHighlight> 
        )

}

const styles = StyleSheet.create({
    infoButton: {
        position: 'absolute',
        marginTop: 510,
        marginLeft: 300,
    }
})

export default Card;
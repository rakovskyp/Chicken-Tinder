import React from 'react';
import { Text, StyleSheet, Animated, PanResponder, StatusBar, Dimensions, } from 'react-native';
import Card from './Card';
import firebase from '../firebase'
import fb from 'firebase'


// represents the swiping deck of cards
const CardDeck = (props) => {

    const { lobbyNumber } = props

    const { width, height } = Dimensions.get('window');

    const { docId } = props

    const { prefId } = props

    const scoreRef = firebase.firestore().collection('lobby').doc(lobbyNumber).collection('leaderboard').doc('score')
    const prefRef = firebase.firestore().collection('lobby').doc(lobbyNumber).collection('person').doc(docId)
    .collection('preferences').doc(prefId)

    /*
        ---- A N I M A T I O N S -----
    */

    const pan = new Animated.ValueXY({x : 0, y : 0});

    const data = props.data;

    // reset card everytime we increment the index
    React.useEffect(() => {
        pan.setValue({x : 0, y : 0})
    }, [props.index])

    async function updateScore(restid, sentiment) {
        await scoreRef.update({
            [restid]: fb.firestore.FieldValue.increment(1)
        })
    }

    async function updatePrefs(restid, sentiment) {
        await prefRef.update({
            [restid]: sentiment
        })
    }

    // panResponder handles all swiping animations
    const panResponder = 
        PanResponder.create({

        onMoveShouldSetPanResponder: (evt, gestureState) => {
                return true;
        },
        onPanResponderMove: (evt, gestureState) => {
            pan.setValue({x : gestureState.dx, y : gestureState.dy})
        },
        onPanResponderRelease: (evt, gestureState) => {
            if (gestureState.dx > 120) {
                Animated.spring(pan, {toValue : {x : gestureState.dx > 0 ? width + 300 : -width - 300, y : gestureState.dy}, duration : 400, useNativeDriver: true}).start(() => {
                    props.incIdx();
                })
                console.log('swipe right')
                updateScore(props.data[props.index]['restaurant_id'])
                updatePrefs(props.data[props.index]['restaurant_id'], 1)

            } else if (gestureState.dx < -120) {
                Animated.spring(pan, {toValue : {x : gestureState.dx > 0 ? width + 300 : -width - 300, y : gestureState.dy}, duration : 400, useNativeDriver: true}).start(() => {
                    props.incIdx();
                })
                console.log('swipe left')
                updatePrefs(props.data[props.index]['restaurant_id'], 0)
            }
             else {
                Animated.spring(pan, {toValue : {x : 0, y : 0}, friction : 4, useNativeDriver: true}).start()
            }
         }
    });

    const rotate = pan.x.interpolate({
        inputRange : [-width / 2, 0, width / 2],
        outputRange : ['-10deg', '0deg', '10deg'],
        extrapolate : 'clamp'
    })

    const rotateAndTranslate = {
        transform : [
            {
                rotate
            },
            ...pan.getTranslateTransform()  
        ]
    }

    const seenTextLiked = pan.x.interpolate({
        inputRange : [-100, 0, 100],
        outputRange : [0, 0 ,1],
        extrapolate : 'clamp'
    })

    const seenTextDisliked = pan.x.interpolate({
        inputRange : [-100, 0, 100],
        outputRange : [1, 0, 0],
        extrapolate : 'clamp'
    })

    const backCardOpacity = pan.x.interpolate({
        inputRange : [-100, 0, 100],
        outputRange : [1, 0, 1],
        extrapolate : 'clamp'
    });

    const backCardScale = pan.x.interpolate({
        inputRange : [-100, 0, 100],
        outputRange : [1, 0.8, 1],
        extrapolate : 'clamp'
    })

    // instantiates the deck of cards
    const renderCards = (res, resIdx) => {

        // not sure if this actually works !!
        // only renders the the current indexed card and the following two cards
        if(resIdx >= props.index && resIdx <= props.index + 2) {
                console.log('residx ' + resIdx)

                // if the card being rendered comes before the current index do not render it
                if(resIdx < props.index) {
                    return null;
                }

                // if the current index is the card we should be on
                if (resIdx === props.index) {
                    
                    // returns an indexed new card with animations and the yes/no text
                    return (
                        <Animated.View key={resIdx}
                        style={[
                            {transform: [{ translateX: pan.x }, { translateY: pan.y }]},
                            {...rotateAndTranslate},
                            props.infoStyleHuh ? (styles.individualCard)  : (styles.noStyles)]}
                            {...panResponder.panHandlers}
                        >
                            <Animated.View style={{...styles.likeDislikeTextContainer, left : 50, borderColor : 'green', opacity : seenTextLiked, transform : [{rotate : '-30deg'}]}}>
                                <Text style={{color : 'green', fontSize : 32, fontWeight : '700'}}>YES</Text>
                            </Animated.View>

                            <Animated.View style={{...styles.likeDislikeTextContainer, right : 30, borderColor : 'red', opacity : seenTextDisliked, transform : [{rotate : '30deg'}]}}>
                                <Text style={{color : 'red', fontSize : 30, fontWeight : '700'}}>NO</Text>
                            </Animated.View>

                            <Card key={resIdx}
                                cardIndex={resIdx}
                                incIdx={props.incIdx}
                                handleInfoStyle={props.handleInfoStyle}
                                handlePress={props.handlePress}
                                picIdx={props.picIdx}
                                data={props.data}
                                navInfo={props.navInfo}
                                infoPress={props.handleInfoPress}
                            />
                            
                        </Animated.View>
                        )
                } 
                
                // background cards that blend in opacity
                return (
                    <Animated.View key={resIdx}
                    style={[ {opacity : backCardOpacity},
                        {transform : [{scale : backCardScale}]},
                        styles.individualCard]}
                        {...panResponder.panHandlers}
                    >

                        <Card key={resIdx}
                            cardIndex={resIdx}
                            incIdx={props.incIdx}
                            handleInfoStyle={props.handleInfoStyle}
                            picIdx={props.picIdx}
                            data={props.data}
                        />

                    </Animated.View>
                    )
        }
    }
   
    // renders the entire deck of cards
    return (
        <Animated.View>
            <StatusBar hidden />
            {data.map((res, resIdx) => renderCards(res, resIdx)).reverse()}
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    individualCard : {
        position: 'absolute',
        flex: 1,
        // backgroundColor: 'skyblue',
        width: 355,
        height: 600,
        margin: 10,
        marginTop: 25,
        marginBottom: 150,
        borderWidth: 1,
        backgroundColor: 'white',
        borderColor: 'white',
        borderRadius: 8,
        overflow: 'hidden',
        zIndex: 1,
    }, likeDislikeTextContainer : {
        position : 'absolute',
        top : 30,
        zIndex : 2,
        borderWidth : 4, 
        paddingVertical : 5,
        paddingHorizontal : 10,
    }, noStyles : {
        position: 'absolute',
    }
  });

export default CardDeck;
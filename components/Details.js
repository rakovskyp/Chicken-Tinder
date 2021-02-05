import React from 'react';
import { Text, StyleSheet, View, TouchableHighlight } from 'react-native';
// import data from '../sampleData';
import DetailsPicture from './DetailsPicture'
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Returns the specific details regarding each specific card
const Details = (props) => {

    function timeDifference(current, previous) {
    
        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;
        
        var elapsed = current - previous;
        
        if (elapsed < msPerMinute) {
             return  'a few seconds ago';   
        }
        
        else if (elapsed < msPerHour) {
             return 'a few minutes ago';   
        }
        
        else if (elapsed < msPerDay ) {
             return 'less than a day ago';   
        }
    
        else if (elapsed < msPerMonth) {
             return 'several days ago';   
        }
        
        else if (elapsed < msPerYear) {
             return 'a few months ago';   
        }
        
        else {
             return 'over a year ago';   
        }
    }

        const restaurant = props.data[props.index]

        return (
            <View>
                    <DetailsPicture
                    cardIndex={props.index}
                    picIdx={props.picIdx}
                    handlePress={props.handlePress}
                    data={props.data}
                    />
    
                <View style={styles.infoButton}>
        
                    <MaterialCommunityIcons.Button
                    name='information'
                    backgroundColor='transparent'
                    underlayColor='transparent'
                    size={25}
                    onPress={props.handleInfoStyle}
                    />

                </View>
                <View>
                    <Text style={styles.details}>{restaurant.name}</Text>
                    <Text style={styles.stars}>{restaurant.top_review.rating_value} stars</Text>
                    <Text style={styles.id}>{restaurant.top_review.review_text}
                     - {restaurant.top_review.reviewer_display_name} 
                     {timeDifference(new Date(), new Date(restaurant.top_review.time_created))}
                     
                    </Text>
                    {/* <Text style={styles.loc1}>{restaurant.[0]}</Text>
                    <Text style={styles.loc2}>{restaurant.[1]}</Text>
                    <Text style={styles.loc3}>{restaurant.[2]}</Text>  */}
                </View>
            </View>
        )
}

// TODO: fix paddingTop when dealing w/ diff device sizes
const styles = StyleSheet.create({
    details: {
        position: 'absolute',
        paddingTop: 700,
    }, cuisine: {
        position: 'absolute',
        paddingTop: 720,
    }, stars: {
        position: 'absolute',
        paddingTop: 740,
    }, id: {
        position: 'absolute',
        marginTop: 760,
    }, loc1 :{
        position: 'absolute',
        paddingTop: 850,
    }, loc2 :{
        position: 'absolute',
        paddingTop: 900,
    }, loc3 :{
        position: 'absolute',
        paddingTop: 950,
    }, infoButton: {
        position: 'absolute',
        marginTop: 310,
        marginLeft: 300,
        zIndex: 6,
    }
})

export default Details;
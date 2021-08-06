import { mdiPrinterPos } from '@mdi/js';
import React from 'react'
import { View, Text, StyleSheet, Modal, TouchableHighlight} from 'react-native';

const InfoScreen = (props) => {
    // Added Restaurant information to display in the infoscreen 
    const distance = props.data[props.cardIndex].distance_from_location
    const cuisines = props.data[props.cardIndex].cuisines
    const price_rating = props.data[props.cardIndex].price_rating
    const pickup_time = props.data[props.cardIndex].pickup_time
    const delivery_fee = props.data[props.cardIndex].delivery_fee
    const delivery_min = props.data[props.cardIndex].delivery_minimum
    const promos = props.data[props.cardIndex].promos
    const reviews = props.data[props.cardIndex].review_count
    const delivery_speed_rating = props.data[props.cardIndex].faceted_rating_list[0].positive_response_percentage
    const order_accuracy_rating = props.data[props.cardIndex].faceted_rating_list[1].positive_response_percentage
    const food_quality_rating = props.data[props.cardIndex].faceted_rating_list[2].positive_response_percentage

    return (
        <View>
            <Modal animationType="slide"
                transparent={true}
                visible={props.modalActive}
                style={styles.overlay}
            >
                <View>
                    <Text>Info Modal Test Screen</Text>
                    <TouchableHighlight onPress={props.toggleInfo}>
                        Exit
                    </TouchableHighlight>
                </View>
                <View>
                    <Text>Promos: {promos}</Text>
                    <Text>Delivery Speed Rating: {delivery_speed_rating}</Text>
                    <Text>Order Accuracy Rating: {order_accuracy_rating}</Text>
                    <Text>Food Quality Rating: {food_quality_rating}</Text>
                    <Text>Delivery Minimum: {delivery_min}</Text>
                    <Text>Delivery Fee: {delivery_fee}</Text>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    overlay: {
        opacity: 0.5, 
        height: 485, 
        width: 300, 
        margin: 10, 
        marginTop: 100, 
        marginBottom: 150, 
        borderWidth: 1, 
        overflow: 'hidden'
    }
});

export default InfoScreen;
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from 'react-native-vector-icons';

const MoreVerticalAndTime = ({ time}) => {
    return (
        <View style={styles.view1}>
            <Text style={styles.text3}>{time}h</Text>
            <Feather name="more-vertical" color={"white"} size={20} />
        </View>
    );
}

const styles = StyleSheet.create({
    view1: {
        flex: 0,
        alignItems: "center",
    },
    text3: {
        fontSize: 10,
        color: "white",
        fontWeight: 800,
        marginBottom: 5
    },
});

export default MoreVerticalAndTime;

import React from 'react';
import { View, Text, StyleSheet } from "react-native";

const JobAlertScreen = () => {
    return (
        <View style={styles.view1}>
            <Text style={{ color: "white" }}> JobAlertScreen </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    view1: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
    }
});

export default JobAlertScreen;
import React from 'react';
import { View, Text, StyleSheet } from "react-native";

const ViewJobsScreen = () => {
    return (
        <View style={styles.view1}>
            <Text style={{ color: "white" }}> ViewJobsScreen </Text>
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

export default ViewJobsScreen;
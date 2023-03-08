import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const NotificationButton1 = ({ w, t}) => {
    return (
        <TouchableOpacity style={[styles.easyApplyTouch, {width:w}]}>
            <Text style={styles.easyApply}>{t}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    easyApplyTouch: {
        margin: 10
    },
    easyApply: {
        color: "rgba(10,195,255,0.9)",
        fontWeight: 800,
        fontSize: 15,
        borderWidth: 2,
        borderColor: "rgba(10,195,255,0.9)",
        padding: 7,
        borderRadius: 30,
        textAlign: "center"
    }
});

export default NotificationButton1;

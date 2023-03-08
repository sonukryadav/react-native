import React from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";
import MoreVerticalAndTime from './MoreVerticalAndTime';
import NotificationsImages from './NotificationsImages';
import NotificationButton1 from './NotificationButton1';

const JobAlert = ({ navigation }) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('JobAlert')}>
            <View style={styles.view1}>
                <NotificationsImages item={
                    {
                        uri: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVU2ysdiMsdYm1mVWGFI_pe2hMPQZ2zWZCmQ&usqp=CAU`,
                        w: 60,
                        h: 60,
                        r: 30
                    }}
                />
                <View style={{ flex: 0.9 }}>
                    <Text style={styles.text1}> Your
                        <Text style={styles.text2}> Job Alert </Text>
                        for
                        <Text style={styles.text2}> ReactNative Developer </Text>
                        role in
                        <Text style={styles.text2}> New Delhi, India </Text>
                    </Text>
                    <NotificationButton1 w={130} t={"View 30+ Jobs"}/>
                </View>
                <MoreVerticalAndTime time={12}  />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    view1: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "black",
        alignItems: "center",
        padding: 10,
        marginVertical: 2,
    },
    text1: {
        color: "white",
    },
    text2: {
        color: "white",
        fontWeight: 800,
    },
    easyApply: {
        color: "rgba(10,195,255,0.9)",
        fontWeight: 800,
        fontSize: 15,
        borderWidth: 2,
        borderColor: "rgba(10,195,255,0.9)",
        padding: 7,
        borderRadius: 30,
        maxWidth: 150,
        margin: 10,
        textAlign: "center"
    }
});

export default JobAlert;

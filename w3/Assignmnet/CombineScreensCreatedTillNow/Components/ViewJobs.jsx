import React from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";
import MoreVerticalAndTime from './MoreVerticalAndTime';
import NotificationsImages from './NotificationsImages';
import NotificationButton1 from './NotificationButton1';

const ViewJobs = ({navigation}) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('ViewJobs')}>
            <View style={styles.view1}>
                <NotificationsImages item={
                    {
                        uri: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg9__LyRPUE7TDX-k1HDYq_QPVOyz4hCfvHA&usqp=CAU`,
                        w: 60,
                        h: 60,
                        r: 0
                    }}
                />
                <View style={{ flex: 0.9 }}>
                    <Text style={styles.text1}>
                        <Text style={styles.text2}> Microsoft </Text>
                        is promoting a high pripority
                        <Text style={styles.text2}> Full stack Developer </Text>
                        role in
                        <Text style={styles.text2}> India </Text>
                        that matches your job alert.
                    </Text>
                    <NotificationButton1 w={110} t={"View Jobs"} />
                </View>
                <MoreVerticalAndTime time={19} />
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
});

export default ViewJobs;

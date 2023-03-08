import React from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";
import MoreVerticalAndTime from './MoreVerticalAndTime';
import NotificationsImages from './NotificationsImages';

const RecentConnect = ({navigation}) => {
    return (
        <TouchableOpacity onPress={()=>navigation.navigate('RecentConnect')}>
            <View style={styles.view1}>
                <NotificationsImages item={
                    {
                        uri: `https://images.unsplash.com/photo-1623091410901-00e2d268901f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8aW5kaWFuJTIwZ2lybHxlbnwwfHwwfHw%3D&w=1000&q=80`,
                        w: 60,
                        h: 60,
                        r: 30
                    }}
                />
                <View style={{ flex: 0.9 }}>
                    <Text style={styles.text1}>Reach out to your recent connections
                        <Text style={styles.text2}> Anjali Mondal </Text>
                        and
                        <Text style={styles.text2}> Sanjeev Kumar </Text>
                    </Text>
                </View>
                <MoreVerticalAndTime time={8} />
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
    },
    text1: {
        color: "white",
    },
    text2: {
        color: "white",
        fontWeight: 800,
    },
});

export default RecentConnect;
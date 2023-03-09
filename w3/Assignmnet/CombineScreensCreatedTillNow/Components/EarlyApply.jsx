import React from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";
import MoreVerticalAndTime from './MoreVerticalAndTime';
import NotificationsImages from './NotificationsImages';
import NotificationButton1 from './NotificationButton1';

const EarlyApply = ({ navigation }) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('EarlyApply')}>
            <View style={styles.view1}>
                <NotificationsImages item={
                    {
                        uri: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEX/////uQB/ugAApO/yUCL/+/T/tAD5wbfxRADyShT2j3vO47R4twCpz3S02/gAoO50wPT4+/R0tQD0+f4Ane771M3xPQD1iXT/rgD95uLL4a5tsgD4s6ejzGj6/f+u2PgAmO3ics+kAAABEElEQVR4nO3biQ2CUBREUVfAXVEBd/qv0sRvBy8/MXhuAZOcAmY0kiRJkiRJkiRJkiRJkiRJv9qljHVOM9dVqGtGYdlUkZr2s3K4rUPdcgqrWaTFMgnrSaiakJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQ8J+EzSJS9fvftXO7jNTek/CxCfXIKJSk/D2PsZ5pZh4so/DVnyL1+wTsilBdRuF2N420+wqLcaiCkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkHBAwuG/8yRJkiRJkiRJkiRJkiRJUqw3TWrkMTMBDxwAAAAASUVORK5CYII='`,
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
                    <NotificationButton1 w={110} t={"Early Apply"} />
                </View>
                <MoreVerticalAndTime time={10} />
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

export default EarlyApply;

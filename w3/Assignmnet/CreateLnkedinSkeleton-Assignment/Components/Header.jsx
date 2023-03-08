import React from 'react';
import { Alert, View, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import sonu1 from "../assets/sonuImage.png";


const Header = ({ navigation }) => {
    const chat = () => {
        Alert.alert("Chat section under development.")
    }
    return (
        <>
            <View style={styles.view1}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Image style={styles.image1} source={sonu1} />
                </TouchableOpacity>
                <TextInput style={styles.input1}
                    placeholder={" 🔍   Search"}
                    placeholderTextColor={"white"}
                />
                <Ionicons onPress={chat} name={"chatbubble-ellipses-sharp"} size={25} color={"grey"} />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    view1: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        backgroundColor: "#333333",
        padding: 3
    },
    input1: {
        flex: 1,
        // borderWidth:0.5,
        marginHorizontal: 10,
        backgroundColor: "#4080bf",
        padding: 2,
        paddingHorizontal: 10,
        color: "white",
        fontSize: 15,
        borderRadius: 4
    },
    image1: {
        width: 40,
        height: 40,
        borderRadius: 50,
    }
});
export default Header;

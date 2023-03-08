import * as React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/AntDesign';
import Icons1 from 'react-native-vector-icons/FontAwesome'
import Icons2 from 'react-native-vector-icons/Feather'
import post from "../db.json";
import {
    SafeAreaView, Text, View, StyleSheet, ScrollView, Image, Alert, TouchableOpacity, FlatList, StatusBar
} from 'react-native';
import Header from '../Components/Header';
import sonu1 from "../assets/sonuImage.png";



const SeeMoreText = ({ text }) => {
    const [showFullText, setShowFullText] = React.useState(false);

    const toggleTextShown = () => {
        setShowFullText(!showFullText);
    };

    return (
        <Text style={styles.postText}>
            {showFullText ? text : `${text.slice(0, 50)}`}
            {text.length > 50 && (
                <TouchableOpacity onPress={toggleTextShown}>
                    <Text style={{
                        color: "#00bfff", borderWidth: 0,
                        borderColor: "teal"
                    }}>
                        {showFullText ? 'See less' : '...See more'}
                    </Text>
                </TouchableOpacity>
            )}
        </Text>
    );
};

const PostImage = ({ url }) => {
    return (
        <>
            <Image source={{ uri: url }} style={{ width: 350, height: 250, margin: 10, borderRadius: 10 }} />
        </>
    );
}

let postImages = [
    "https://images.pexels.com/photos/4825701/pexels-photo-4825701.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/4356144/pexels-photo-4356144.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/1252500/pexels-photo-1252500.jpeg?auto=compress&cs=tinysrgb&w=400"
]


const Post = ({ item }) => {
    return (
        <>
            <View style={styles.postBox}>

                <View style={styles.postBoxHead}>

                    <View style={styles.view3}>
                        <Image style={styles.image1} source={sonu1} />
                    </View>

                    <View style={styles.view4}>
                        <Text style={styles.postUserName}> {item.name}</Text>
                        <Text style={styles.postUserAbout}> {item.role}</Text>
                        <Text style={styles.postUserTime}> {item.time} • 🕐</Text>
                    </View>

                    <View style={styles.view5}>
                        <Text style={styles.postUserConnect}> + Connect</Text>
                    </View>

                </View>


                <View style={styles.postTextView}>
                    <SeeMoreText text={item.text} />
                </View>

                <FlatList
                    horizontal
                    data={postImages}
                    renderItem={({ item }) => (<PostImage url={item} />)}
                    keyExtractor={item => item}
                    style={{ marginVertical: 20 }}
                />


                <View style={{ flexDirection: "row", borderWidth: 0, borderColor: "white", padding: 5 }}>

                    <View style={{ flex: 1 }}>
                        <Text style={{ color: "white" }}>{item.likes} likes</Text>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ color: "white", marginHorizontal: 8 }}>{item.comment} comments</Text>
                        <Text style={{ color: "white" }}>•</Text>
                        <Text style={{ color: "white", marginHorizontal: 8 }}> {item.repost} reposts</Text>
                    </View>

                </View>


                <View style={{ marginVertical: 10, flexDirection: "row", flex: 1, justifyContent: "space-between", paddingHorizontal: 5 }}>

                    <View>
                        <TouchableOpacity onPress={() => Alert.alert("Like", "You liked the post.")}>
                            <Icons name={"like2"} size={25} color={"white"} />
                            <Text style={{ color: "white" }}>Like</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity onPress={() => Alert.alert("Comment", "You commented on the post.")}>
                            <Icons1 name={"commenting-o"} size={25} color={"white"} />
                            <Text style={{ color: "white" }}>Comment</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity onPress={() => Alert.alert("Repost", "You reposted the post.")}>
                            <Icons2 name={"repeat"} size={25} color={"white"} />
                            <Text style={{ color: "white" }}>Repost</Text>
                        </TouchableOpacity>
                    </View>


                    <View>
                        <TouchableOpacity onPress={() => Alert.alert("Send", "Post sent.")}>
                            <Icons1 name={"send"} size={25} color={"white"} />
                            <Text style={{ color: "white" }}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    )
}


export default function Home({ navigation }) {
    return (
        <SafeAreaView style={[styles.container]}>
            <StatusBar/>
            <ScrollView>
            </ScrollView>
            <FlatList
                data={post}
                renderItem={({ item }) => (<Post item={item} />)}
                keyExtractor={item => (item.id).toString()}
                ListHeaderComponent={<Header navigation={navigation} />}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        paddingHorizontal: 4,
        // borderWidth:2,
        borderColor: "red",
    },
    postBox: {
        flex: 1,
        borderWidth: 3,
        // borderColor:"red",
        backgroundColor: "#333333",
        marginBottom:15,
        padding: 5,
        borderRadius: 10,
    },
    postBoxHead: {
        // borderWidth:1,
        borderColor: "white",
        flexDirection: "row"
    },
    view4: {
        marginHorizontal: 12,
    },
    view5: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    image1: {
        width: 40,
        height: 40,
        borderRadius: 50,
    },
    postUserName: {
        color: "white",
        fontSize: 15
    },
    postUserAbout: {
        color: "lightgrey",
        fontSize: 10
    },
    postUserConnect: {
        color: "lightblue",
        fontSize: 15,
        fontWeight: "800",
    },
    postUserTime: {
        fontSize: 10,
        color: "lightgrey",
    },
    postTextView: {
        // borderWidth:1,
        borderColor: "teal",
        padding: 8
    },
    postText: {
        color: "white",
        // borderWidth:1,
        borderColor: "green",

    }
});
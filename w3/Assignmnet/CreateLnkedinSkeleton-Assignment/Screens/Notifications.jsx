import React from 'react';
import { createNativeStackNavigator, } from '@react-navigation/native-stack';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from 'react-native-vector-icons';

const Stack = createNativeStackNavigator();

const RecentConnect = () => {
    return (
        <TouchableOpacity>
            <View style={styles.view1}>
                <Image source={{ uri: 'https://images.unsplash.com/photo-1623091410901-00e2d268901f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8aW5kaWFuJTIwZ2lybHxlbnwwfHwwfHw%3D&w=1000&q=80' }}
                        style={styles.Img1}
                    />
                    <Text>Reach out to your recent connections <Text style={{ fontWeight: 800, }}>Anjali Mondal</Text></Text>
                    <Text style={{fontSize:19}}>12h</Text>
                    {/* <Feather name="more-vertical" /> */}
            </View>
        </TouchableOpacity>
    );
}


const JobAlert = () => {
    return (
        <>
        </>
    );
}

const EarlyApply = () => {
    return (
        <>
        </>
    );
}

const ViewJobs = () => {
    return (
        <>
        </>
    );
}

const Notification = () => {
    return (
        <SafeAreaView>
            <View>
                <RecentConnect />
                <JobAlert />
                <EarlyApply />
                <ViewJobs />
            </View>
        </SafeAreaView>
    );
}

function Notifications() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Notifications" component={Notification} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    view1: {
        // flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "red",
    },
    Img1: {
        width: 50,
        height: 50,
        borderRadius: 50
    }
});


export default Notifications;

import React from 'react';
import { createNativeStackNavigator, } from '@react-navigation/native-stack';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from 'react-native-vector-icons';

const Stack = createNativeStackNavigator();

const RecentConnect = () => {
    return (
        <TouchableOpacity>
            <View style={{flex:1, flexDirection:"row", justifyContent:"space-between", backgroundColor:"black", }}>
                <View>
                    <Image source={{ uri: 'https://images.unsplash.com/photo-1623091410901-00e2d268901f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8aW5kaWFuJTIwZ2lybHxlbnwwfHwwfHw%3D&w=1000&q=80' }}
                        style={{width:50, height:50, borderRadius:50}}
                    />
                </View>
                <View>
                    <Text>Reach out to your recent connections <Text style={{ fontWeight: 800 }}>Anjali Mondal</Text></Text>
                </View>
                <View>
                    <Text style={{fontSize:19}}>12h</Text>
                    {/* <Feather name="more-vertical" /> */}
                </View>
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
        <View style={{ backgroundColor: "black" }}>
            <RecentConnect />
            <JobAlert />
            <EarlyApply />
            <ViewJobs />
        </View>
    );
}

function Notifications() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Notifications" component={Notification} />
        </Stack.Navigator>
    );
}


export default Notifications;

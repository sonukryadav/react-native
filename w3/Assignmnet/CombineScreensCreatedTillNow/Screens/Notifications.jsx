import React from 'react';
import { createNativeStackNavigator, } from '@react-navigation/native-stack';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../Components/Header';
import RecentConnect from '../Components/RecentConnect';
import EarlyApply from '../Components/EarlyApply';
import JobAlert from '../Components/JobAlert';
import ViewJobs from '../Components/ViewJobs';
import RecentConnectScreen from '../Screens/RecentConnectScreen';
import EarlyApplyScreen from '../Screens/EarlyApplyScreen';
import JobAlertScreen from '../Screens/JobAlertScreen';
import ViewJobsScreen from '../Screens/ViewJobsScreen';


const Stack = createNativeStackNavigator();

const Notification = ({ navigation}) => {
    return (
        <SafeAreaView style={styles.view0}>
            <View>
                <Header navigation={navigation} />
                <RecentConnect navigation={navigation} />
                <EarlyApply navigation={navigation} />
                <JobAlert navigation={navigation} />
                <ViewJobs navigation={navigation} />
            </View>
        </SafeAreaView>
    );
}

function Notifications() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Notifications" component={Notification} options={{ headerShown: false, title:"Notifications" }} />
            <Stack.Screen name="RecentConnect" component={RecentConnectScreen} options={{ headerShown: true, title:"Recent Connect" }} />
            <Stack.Screen name="EarlyApply" component={EarlyApplyScreen} options={{ headerShown: true, title:"Early Apply" }} />
            <Stack.Screen name="JobAlert" component={JobAlertScreen} options={{ headerShown: true, title:"Job Alert" }} />
            <Stack.Screen name="ViewJobs" component={ViewJobsScreen} options={{ headerShown: true, title:"View Jobs" }} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    view0: {
        flex: 1,
        backgroundColor: "black",
        padding:5
    },
});


export default Notifications;

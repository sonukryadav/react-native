import React from 'react';
import { SafeAreaView, View, Text, ScrollView } from "react-native";
import Header from '../Components/Header';


const Groups = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <Header navigation={navigation} />
                <View style={{ alignItems: "center" }}>
                    <Text>Group</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Groups;
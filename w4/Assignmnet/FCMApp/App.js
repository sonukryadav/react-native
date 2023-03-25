import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Platform, Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import React, { useEffect, useState } from 'react';

// On IOS you have to request permission
async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    return true;
  }
  return false;
}

export default function App() {
  const [pushToken, setPushToken] = useState('');

  useEffect(()=>{
    requestUserPermission().then((msgPermission) => {
      if(msgPermission){
        messaging().getToken().then(token => {
          setPushToken(token);
          console.log(token);
        })
      }else{
        Alert("MSG Permission","Permission not granted!")
      }
    })
    
  },[])

  useEffect(() => {
    // Foreground State Messages
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Text>Firebase Cloud Messaging Tutorial</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
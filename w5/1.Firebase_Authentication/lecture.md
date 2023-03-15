# Firebase Authentication

[Follow the steps to install firebase app](https://github.com/subrataindia/React-Native-Course-V1/blob/main/extra/bare-react-native-expo-managed-fcm.md#install-firebase-app)

```js
# Install the authentication module
yarn add @react-native-firebase/auth
```

## Firebase Console Setup

- Goto `All Products` -> `Authentication` -> `Sign In Method` , then choose the methods. For this project select `google` and `email and password`.
- As you have already created project now add `SHA1` key to it. `Project settings` -> `Add Fingerprint` -> paste `SHA1` -> `SAVE`.
- If you have not generated `SHA1`, then generate it by `cd android && ./gradlew signingReport`.
- Download this new `google-services.json` and paste in `android/app` folder.

## Google SignIn

```js
npx expo install @react-native-google-signin/google-signin
```

Before triggering a sign-in request, you must initialize the Google SDK using your any required scopes and the `webClientId`, which can be found in the `android/app/google-services.json` file as the `client/oauth_client/client_id` property (the id ends with `.apps.googleusercontent.com`). Make sure to pick the `client_id` with `client_type: 3`.

```js
import { registerRootComponent } from 'expo';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '330241489424-7nda9ml1i4l7oms5cgsgbfg5lo2ib3nm.apps.googleusercontent.com',
});

import App from './src/App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
```

```js
import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

async function onGoogleButtonPress() {

  try{
    console.log("Check if your device supports Google Play");
  
    const r1 = await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  
    console.log("Get the users ID token", r1);
    const { idToken } = await GoogleSignin.signIn();

    console.log(" Create a Google credential with the token", idToken)
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential

    const res = await auth().signInWithCredential(googleCredential);
    return res;
  }catch(e){
    console.log("Signin Error:",e)
    return null;
  }

}

```

## Email and Password Signin

```js
import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

async function onEmailAndPassSignInPressed() {

  try{
    console.log("Check if your device supports Google Play");
  
    const r1 = await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  
    console.log("Get the users ID token", r1);
    const { idToken } = await GoogleSignin.signIn();

    console.log(" Create a Google credential with the token", idToken)
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential

    const res = await auth().signInWithCredential(googleCredential);
    return res;
  }catch(e){
    console.log("Signin Error:",e)
    return null;
  }
}

// Sign-Up
auth()
    .createUserWithEmailAndPassword(email,password)
    .then((result) => {
      result.user.updateProfile({displayName:displayName}))
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        // If already signup then sign in
        auth().signInWithEmailAndPassword(email, password).then(()=>{
          Alert.alert('Signed In!',"Signed In Successful!.");
        })
      }else if (error.code === 'auth/invalid-email') {
        Alert.alert('That email address is invalid!');
      } else {
        Alert.alert("Error Occured! Please try later")
      }
      console.error(error);
    });

```

https://codesandbox.io/s/lively-sun-t5129f?file=/src/App.js

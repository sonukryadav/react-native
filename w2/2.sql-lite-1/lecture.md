## React Native Architecture

When we look at the react native architecture we find two different divisions often interact with each other :

- native world (Android or IOS)
- JavaScript world

Communication between these two worlds happens via React Native Bridge. React Native parses the bunch of commands coming from the React world into a JSON array, serializes it as a string, and then transfers it to the native world via that bridge.

To maintain consistency across all platforms, React Native implements the actual layout by converting React-based display styles (eg, flex) to the relative position values where each element is to be structured and then finally passes it over the UI layer of the native world. Broadly speaking, the current React Native architecture is based on 3 major threads-

- `Main/Native/UI thread` — where all the UI elements are rendered and native code is executed.
- `Layout thread/Shadow Thread` — this is a background thread where the actual layout is calculated. As mentioned, it recasts the flexbox layout with the help of Facebook’s layout engine called Yoga.
- `JavaScript thread` — this thread is responsible for executing and compiling all the JavaScript-related code or business logic.

![](https://firebasestorage.googleapis.com/v0/b/mymasai-school.appspot.com/o/project_files%2Fold_architecture.webp?alt=media&token=968b1e3f-a715-447f-b9a7-e3dc152c0aea)

## The drawbacks of this architecture

- In the current architecture, communication between threads occurs through the bridge so it leads to a slow transfer rate and unnecessary copying of data.
- Since the communication happens asynchronously, one major drawback of this asynchronous approach is that it doesn’t execute the events in real-time instead it schedules the action. Let’s imagine a scenario where we implemented a Flatlist and when we start scrolling, each time an event is triggered and is scheduled for its execution. So, when dealing with a large set of list items and scrolling rapidly one can easily notice a white glitch before actual rendering happens. This happens because the UI layer of that native world hasn’t received any layout information by the time scrolling is completed. So this scrolling effect needs to take place synchronously to achieve the desired result which is not possible in the current architecture.

# The new architecture

Starting from version 0.68, React Native provides the New Architecture, which offers developers new capabilities for building highly performant and responsive apps.

![](https://firebasestorage.googleapis.com/v0/b/mymasai-school.appspot.com/o/project_files%2Fnew_architecture.webp?alt=media&token=cff47435-c289-4bb3-b89e-fe0aa99e70e2)

The New Architecture dropped the concept of The Bridge in favor of another communication mechanism: the JavaScript Interface (JSI). The JSI is an interface that allows a JavaScript object to hold a reference to a C++ and viceversa.

Once an object has a reference to the other one, it can directly invoke methods on it. So, for example, a C++ object can now ask a JavaScript object to execute a method in the JavaScript world and viceversa.

This idea allowed to unlock several benefits:

- `Synchronous execution:` it is now possibile to execute synchronously those functions that should not have been asynchronous in the first place.
- `Concurrency:` it is possible from JavaScript to invoke functions that are executed on different thread.
- `Lower overhead:` the New Architecture don't have to serialize/deserialize the data anymore, therefore there are no serialization taxes to pay.
- `Code sharing:` by introducing C++, it is now possible to abstract all the platform agnostic code and to share it with ease between the platforms.
- `Type safety:` to make sure that JS can properly invoke methods on C++ objects and viceversa, a layer of code automatically generated has been added. The code is generated starting from some JS specification that must be typed through Flow or TypeScript.

## Security

There is no bulletproof way to handle security, but with conscious effort and diligence, it is possible to significantly reduce the likelihood of a security breach in your application. Invest in security proportional to the sensitivity of the data stored in your application, the number of users, and the damage a hacker could do when gaining access to their account.

### Storing Sensitive Info

Never store sensitive API keys in your app code. Anything included in your code could be accessed in plain text by anyone inspecting the app bundle. Tools like [react-native-dotenv](https://github.com/goatandsheep/react-native-dotenv) and [react-native-config](https://github.com/luggit/react-native-config/) are great for adding environment-specific variables like API endpoints, but they should not be confused with server-side environment variables, which can often contain secrets and API keys.

Don't store Token and secrets on Async Storage.

React Native does not come bundled with any way of storing sensitive data. However, ther are pre-existing solutions for Android and IOS platforms. You can use any of the below external libraries to achieve this.

- [expo-secure-store](https://docs.expo.dev/versions/latest/sdk/securestore/)

  uses `keychain` on iOS and `SharedPreferences, encrypted with Android's Keystore system` in android.

- [react-native-encrypted-storage](https://github.com/emeraldsanto/react-native-encrypted-storage)

  uses `Keychain` on iOS and `EncryptedSharedPreferences` on Android.

### Firebase AppCheck

App Check is an additional layer of security that helps protect access to your services by attesting that incoming traffic is coming from your app, and blocking traffic that doesn't have valid credentials. It helps protect your backend from abuse, such as billing fraud, phishing, app impersonation, and data poisoning.

### SSL Pinning

Using https endpoints could still leave your data vulnerable to interception. With https, the client will only trust the server if it can provide a valid certificate that is signed by a trusted Certificate Authority that is pre-installed on the client. An attacker could take advantage of this by installing a malicious root CA certificate to the user’s device, so the client would trust all certificates that are signed by the attacker. Thus, relying on certificates alone could still leave you vulnerable to a man-in-the-middle attack.

SSL pinning is a technique that can be used on the client side to avoid this attack. It works by embedding (or pinning) a list of trusted certificates to the client during development, so that only the requests signed with one of the trusted certificates will be accepted, and any self-signed certificates will not be.

When using SSL pinning, you should be mindful of certificate expiry. Certificates expire every 1-2 years and when one does, it’ll need to be updated in the app as well as on the server. As soon as the certificate on the server has been updated, any apps with the old certificate embedded in them will cease to work.

# SQL Lite Storage on React Native

React Native SQLite is a library that implements a self-contained, serverless, zero-configuration SQL database engine. SQLite is the most widely deployed SQL database engine in the world. The source code for SQLite is in the public domain.

## Installation

```js
npm install --save react-native-sqlite-storage
```

## Use Database of SQLite

```js
import {openDatabase} from 'react-native-sqlite-storage';
// import {openDatabase} from 'expo-sqlite';
...

export const db = openDatabase({name: 'mydatabase1.db'},
  () => { },
  error => {
    console.log("ERROR: " + error);
  });
```

[Practice](https://www.sql-practice.com/)

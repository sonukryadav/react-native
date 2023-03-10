# Firebase Cloud Messaging in Expo Managed Bare React Native

Firebase cloud messaging works on `bare react native app`. To know about expo and bare-react-native app [click here](https://docs.expo.dev/introduction/managed-vs-bare/#workflow-comparison). 


```js
// Create Expo App
npx create-expo-app fcmApp
// Switch to bare react native
npx expo run:android
```

```js
allprojects {
    repositories {
        ...
        maven {
            // Android JSC is installed from npm
            url("$rootDir/../node_modules/jsc-android/dist")
        }
        ...
    }
}            
```

Before proceding further please further please confirm that you have installed `firebase app`, If not please follow the below steps to install.

## Install Firebase App

```js
# Using npm install firebase app
npm install --save @react-native-firebase/app
```

### Create a Firebase Project

- goto `https://console.firebase.google.com/u/0/`. Login through your google account
- click on `add project`, enter your project name and click continue.
- deselect `Enable Google Analytics for this project`, and click on `create project`.
- It will take some time to create the project, Then `Your new project is ready` message will be displayed with a `continue` button. Click on that.
- On left side of dashboard, click on `Project Overview`. Then click on android icon, which says `add an app to get started`.
- Write android package name. This you will get from `/android/app/src/main/AndroidManifest.xml` with in your project.
- Write an optional app nick name, and click on `register app` button.
- Download `google-services.json`, and move to `/android/app/` directory.
- Then follow the steps given in `Add Firebase SDK`.

```js
// Add the plugin as a buildscript dependency to your project-level build.gradle file
buildscript {
  repositories {
    // Make sure that you have the following two repositories
    google()  // Google's Maven repository

    mavenCentral()  // Maven Central repository

  }
  dependencies {
    ...
    // Add the dependency for the Google services Gradle plugin
    classpath 'com.google.gms:google-services:4.3.13'

  }
}

allprojects {
  ...
  repositories {
    // Make sure that you have the following two repositories
    google()  // Google's Maven repository

    mavenCentral()  // Maven Central repository

  }
}
```

- Then, in your module (app-level) `build.gradle` file, add both the `google-services` plugin and any Firebase SDKs that you want to use in your app

```js
apply plugin: "com.android.application"
// Add the Google services Gradle plugin
apply plugin: 'com.google.gms.google-services'

dependencies {
  // Import the Firebase BoM
  implementation platform('com.google.firebase:firebase-bom:31.1.1')


  // TODO: Add the dependencies for Firebase products you want to use
  // When using the BoM, don't specify versions in Firebase dependencies
  // https://firebase.google.com/docs/android/setup#available-libraries
}
```

- After finishing these steps click on `next` button on firebase console. Then click on `continue to console`.

### Enabling Multidex

As more native dependencies are added to your project, it may bump you over the 64k method limit on the Android build system. Once this limit has been reached, you will start to see the following error while attempting to build your Android application.

```js
Execution failed for task ':app:mergeDexDebug'.
```

```js
// Open the /android/app/build.gradle file. Under dependencies we need to add the module, and then enable it within the defaultConfig

android {
    defaultConfig {
        // ...
        multiDexEnabled true // <-- ADD THIS in the defaultConfig section
    }
    // ...
}

dependencies {
  implementation 'androidx.multidex:multidex:2.0.1'  // <-- ADD THIS DEPENDENCY
}
```

Next step is to alter `android/app/src/main/java/.../MainApplication.java` file to extend `MultiDexApplication`.

```js

// ... all your other imports here
import androidx.multidex.MultiDexApplication; // <-- ADD THIS IMPORT


// Your class definition needs `extends MultiDexApplication` like below
public class MainApplication extends MultiDexApplication implements ReactApplication {
```

Once you done this clean gradle.

```js
cd android
gradlew clean
```

## Set Up Cloud Messaging

```js
npx expo install @react-native-firebase/messaging
```

Depending on the devices state, incoming messages are handled differently by the device and module. To understand these scenarios, it is first important to establish the various states a device can be in:

state | Description
------|------------
Foreground | When the application is open and in view.
Background | When the application is open, however in the background (minimised). This typically occurs when the user has pressed the "home" button on the device or has switched to another app via the app switcher.
Quit       | When the device is locked or application is not active or running. The user can quit an app by "swiping it away" via the app switcher UI on the device.

## Live 1: Foreground state messages
## Live 2: Background and Quit state message

- Now to send a message goto firebase console. 
- Click on `All Products` -> `Cloud Messaging` -> `Create Your First Campaign` -> `Firebase Notification Messages`. 
- Enter `notification title` and `notification text`, click on next.
- On target app chose your app, click next and again next (If you don't want to schedule for later).
- Click on `review` -> `publish`.
- It may take some time to display the notification in your app. If it is open then the `Alert` will display. If it is on background then you will see notification and log on console.


[Working Example](https://github.com/subrataindia/FCM-React-Native-Example)



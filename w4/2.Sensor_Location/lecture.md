# Step Count Project - Using expo-sensor API

[download apk](https://drive.google.com/file/d/1igLIRBcW8XZcLYc1myes8WqCFYeXW932/view?usp=sharing)

This should be a bare react native project

```js
npx create-expo-app stepcount // Create Expo App
cd stepcount
npx expo run:android // Convert to bare react native
```

If you have already created a React Native app then add expo sdk to it.

```js
npx react-native init stepcount
cd stepcount
npx install-expo-modules@latest
```

Update android/build.gradle

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

```js
// AndroidManifest.xml
...
<uses-permission android:name="android.permission.ACTIVITY_RECOGNITION"/>
...
```


```js
// package.json
{
  "name": "stepcount",
  "version": "1.0.0",
  "scripts": {
    "start": "expo start --dev-client",
    "eject": "npx expo run:android",
    "android": "expo run:android",
    "ios": "expo run:ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "expo": "~47.0.8",
    "expo-sensors": "~12.0.1",
    "expo-status-bar": "~1.4.2",
    "react": "18.1.0",
    "react-native": "0.70.5",
    "react-native-circular-progress-indicator": "^4.4.2",
    "react-native-svg": "13.4.0",
    "react-native-reanimated": "~2.12.0",
    "expo-splash-screen": "~0.17.5"
  },
  "devDependencies": {
    "@babel/core": "^7.12.9"
  },
  "private": true
}
```

```js
// babel.config.js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'],
  };
};
```

```js
// App.js
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  PermissionsAndroid,
  Alert,
} from "react-native";

import { Pedometer } from "expo-sensors";

import CircularProgress from "react-native-circular-progress-indicator";

const colors = {
  primary: "rgb(51, 51, 0)",
  primary50: "rgba(51, 51, 0,0.5)",
  secondary: "#f39c12",
  text: "#ecf0f1",
};

export default function App() {
  const [PedomaterAvailability, SetPedomaterAvailability] = useState("");
  const [StepCount, SetStepCount] = useState(0);
  var WindowHeight = Dimensions.get("window").height;
  var Dist = StepCount * 0.762; // 1 step = 0.762 meter and 1 meter = 1.3123 steps
  var DistanceCovered = Dist.toFixed(2);
  var cal = DistanceCovered * 0.06; // Calories burnt asumed 60 per kilometer
  var caloriesBurnt = cal.toFixed(2);

  const requestActivityPermission = async () => {
    Pedometer.requestPermissionsAsync()
      .then((result) => {})
      .catch((e) => {});

    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION
    )
      .then((result) => {})
      .catch(() => {});
  };

  subscribe = () => {
    Pedometer.isAvailableAsync().then(
      (result) => {
        SetPedomaterAvailability(String(result));
      },

      (error) => {
        SetPedomaterAvailability(error);
      }
    );

    return Pedometer.watchStepCount((result) => {
      SetStepCount(result.steps);
    });
  };

  useEffect(() => {
    requestActivityPermission();
    const subscription = subscribe();
    return () => subscription && subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={{ flex: 1 }}
        source={require("./assets/step.jpg")}
        resizeMode="cover"
      >
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={styles.headingDesign}>
            Is Pedometer available on the device : {PedomaterAvailability}
          </Text>
        </View>
        {PedomaterAvailability !== "false" ? (
          <View style={{ flex: 5 }}>
            <View style={{ flex: 3, alignItems: "center" }}>
              <CircularProgress
                value={StepCount}
                maxValue={6500}
                radius={200}
                textColor={colors.text}
                activeStrokeColor={colors.secondary}
                inActiveStrokeColor={colors.primary}
                inActiveStrokeOpacity={0.8}
                inActiveStrokeWidth={60}
                activeStrokeWidth={60}
                title={"Step Count"}
                titleColor={colors.text}
                titleStyle={{ fontWeight: "bold" }}
              />
            </View>

            <View style={{ flex: 1 }}>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={[styles.textDesign]}>
                  Target : 6500 steps(5kms)
                </Text>
              </View>

              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={[styles.textDesign]}>
                  Distance Covered : {DistanceCovered} m
                </Text>
              </View>

              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={[styles.textDesign]}>
                  Calories Burnt : {caloriesBurnt}
                </Text>
              </View>
              <StatusBar style="auto" />
            </View>
          </View>
        ) : (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={[styles.headingDesign]}>
              Sorry! Pedometer not available. You can't use this app.
            </Text>
          </View>
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  headingDesign: {
    backgroundColor: colors.primary,
    alignSelf: "center",
    width: "100%",
    fontSize: 20,
    padding: 10,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  textDesign: {
    backgroundColor: colors.primary50,
    width: "85%",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 20,
    overflow: "hidden",
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

```

```js
// app.json
{
  "expo": {
    "name": "stepCount",
    "slug": "stepCount",
    "version": "1.0.1",
    "orientation": "portrait",
    "icon": "./assets/run.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "cover",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/run.png",
        "backgroundColor": "#FFFFFF"
      },
      "package": "com.subrat1977.stepCount",
      "versionCode": 2
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      "eas": {
        "projectId": "52f7707d-e8f6-4585-9671-19d6b94e538e"
      }
    }
  }
}
```


```js
// eas.json
{
  "cli": {
    "version": ">= 3.0.0"
  },
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "preview2": {
      "android": {
        "gradleCommand": ":app:assembleRelease"
      }
    },
    "preview3": {
      "developmentClient": true
    },
    "production": {}
  },
  "submit": {
    "production": {}
  }
}

```

## Expo Location

```js
npx expo install expo-location
```

```js
// app.json
{
  "expo": {
    "plugins": [
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Allow $(PRODUCT_NAME) to use your location."
        }
      ]
    ]
  }
}
```

```js
// Get user current location
import * as Location from 'expo-location';
...
...
...
let location = await Location.getCurrentPositionAsync({});
// Find latitude and longitude
let latitude: location.coords.latitude
let longitude: location.coords.longitude
```

## Find Distance between two locations

use npm package [geolib](https://www.npmjs.com/package/geolib) 

```js
import { getDistance } from 'geolib';

getDistance(
    { latitude: 51.5103, longitude: 7.49347 },
    { latitude: "51° 31' N", longitude: "7° 28' E" }
);
```

# [Expo Sensor](https://docs.expo.dev/versions/latest/sdk/sensors/)

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
// Request Permission
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
// Subscribe to pedometer.watchStepCount()
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

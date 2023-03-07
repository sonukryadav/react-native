
## [Using Expo-Camera](https://docs.expo.dev/versions/latest/sdk/camera/)

Please be sure that you have already installed expo-module

```js
npx install-expo-modules@latest
```

### install expo-camera

```js
npx expo install expo-camera
```

## Update android/gradle/build.gradle


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

## [Expo text to speech](https://docs.expo.dev/versions/latest/sdk/speech/)

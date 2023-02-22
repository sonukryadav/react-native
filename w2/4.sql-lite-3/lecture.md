# SQLite Project Part 2 and Create APK and AAB for distribution

Implementation of

- Update data of Table
- Delete data from table

## Project : Task List Part 2

    - long press on the task to complete it. Display completed tasks in different color
    - press on completed task to delete it. ask confirmation before deleting task
    - press on uncompleted task to edit it.

# Creating APK or AAB file for distribution


## Change app.json

```js
// app.json
    "android": {
      "package": "in.subrat.sample",
      "versionCode": 1,
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      }
    },
```

## Install latest eas cli

```js
npm install -g eas-cli
```

## Login to your expo account

```js
eas login
```

## Configure profile to build apk

```js
// eas.json
{
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
  }
}
```

## credential source

If you do not set any option, "credentialsSource" will default to "remote".

```js
// eas.json
{
  "build": {
    "amazon-production": {
      "android": {
        "credentialsSource": "local"
      }
    },
    "google-production": {
      "android": {
        "credentialsSource": "remote"
      }
    }
  }
}
```

## Android app signing credentials

- If you have not yet generated a keystore for your app, you can let EAS CLI take care of that for you by selecting Generate new keystore, and then you are done. The keystore is stored securely on EAS servers.
- If you have previously built your app with expo build:android, you can use the same credentials here.
- If you want to manually generate your keystore, please see the below manual 

## Android credentials guide

```js
keytool -genkey -v -storetype JKS -keyalg RSA -keysize 2048 -validity 10000 -storepass KEYSTORE_PASSWORD -keypass KEY_PASSWORD -alias KEY_ALIAS -keystore release.keystore -dname "CN=in.subrat.sample,OU=,O=,L=,S=,C=US"
```

## Migrate "release.keystore" to PKCS12

```JS
keytool -importkeystore -srckeystore release.keystore -destkeystore release.keystore -deststoretype pkcs12
```

## create credentials.json

```js
{
  "android": {
    "keystore": {
      "keystorePath": "./release.keystore",
      "keystorePassword": "KEYSTORE_PASSWORD",
      "keyAlias": "KEY_ALIAS",
      "keyPassword": "KEY_PASSWORD"
    }
  }
}
```

## Build android platform binary

```js
eas build --platform android // aab file
eas build -p android --profile preview // apk file
```

## Build for both android and ios platform

```js
eas build --platform all
```

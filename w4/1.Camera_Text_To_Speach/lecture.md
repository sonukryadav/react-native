
## Using Expo-Camera

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

## Sample Camera Project

```js
import React, {useState, useEffect} from 'react';
import {Modal, Text, TouchableOpacity, View, Image, Button} from 'react-native';
import {Camera} from 'expo-camera';

const CameraModule = ({showModal, setModalVisible, setImage}) => {
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => {
        setModalVisible();
      }}>
      <Camera
        style={{flex: 1}}
        ratio="16:9"
        flashMode={Camera.Constants.FlashMode.on}
        type={type}
        ref={ref => {
          setCameraRef(ref);
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              backgroundColor: '#003366',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Button
              style={{marginLeft: 12}}
              onPress={() => {
                setModalVisible();
              }}
              title="Close"
            />
            <TouchableOpacity
              onPress={async () => {
                if (cameraRef) {
                  let photo = await cameraRef.takePictureAsync();
                  setImage(photo);
                  setModalVisible();
                }
              }}>
              <View
                style={{
                  borderWidth: 2,
                  borderRadius: 50,
                  borderColor: 'white',
                  height: 50,
                  width: 50,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 16,
                  marginTop: 16,
                }}>
                <View
                  style={{
                    borderWidth: 2,
                    borderRadius: 50,
                    borderColor: 'white',
                    height: 40,
                    width: 40,
                    backgroundColor: 'white',
                  }}></View>
              </View>
            </TouchableOpacity>
            <Button
              style={{marginRight: 12}}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back,
                );
              }}
              title={type === Camera.Constants.Type.back ? 'Front' : 'Back '}
            />
          </View>
        </View>
      </Camera>
    </Modal>
  );
};
export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const [camera, setShowCamera] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{textAlign: 'center'}}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View
        style={{
          backgroundColor: '#eeee',
          width: 120,
          height: 120,
          borderRadius: 100,
          marginBottom: 8,
        }}>
        <Image
          source={{uri: image}}
          style={{width: 120, height: 120, borderRadius: 100}}
        />
      </View>
      <Button
        style={{width: '30%', marginTop: 16}}
        onPress={() => {
          setShowCamera(true);
        }}
        title="Camera"
      />

      {camera && (
        <CameraModule
          showModal={camera}
          setModalVisible={() => setShowCamera(false)}
          setImage={result => setImage(result.uri)}
        />
      )}
    </View>
  );
}

```

<table>
    <tr>
        <td><img src="https://firebasestorage.googleapis.com/v0/b/mymasai-school.appspot.com/o/project_files%2Fcamera_images%2Fimage1.PNG?alt=media&token=4df95558-6c2d-495d-aad6-7f1b1236dfa2" /></td>
        <td><img src="https://firebasestorage.googleapis.com/v0/b/mymasai-school.appspot.com/o/project_files%2Fcamera_images%2Fimage2.PNG?alt=media&token=067a589a-05b5-4a4c-91b1-cfc128a36753" /></td>
        <td><img src="https://firebasestorage.googleapis.com/v0/b/mymasai-school.appspot.com/o/project_files%2Fcamera_images%2Fimage3.PNG?alt=media&token=ea6eeb54-dd33-4162-9760-6fa24611b161" /></td>
    </tr>
</table>

# Expo Text-To-Speach Project

```js
import React,{useState} from 'react';
import { View, StyleSheet, Button, TextInput } from 'react-native';
import * as Speech from 'expo-speech';

export default function App() {
  const [word, setWord] = useState('');

  const speak = () => {
    //const thingToSay = 'Subrat';
    Speech.speak(word);
  };

  return (
    <View style={styles.container}>
      <TextInput value={word} onChangeText={(t) => setWord(t)} 
        placeholder={"Enter any text"} 
        style={[styles.text,{marginBottom:20}]}
        />
      <Button title="Press me to hear" onPress={speak} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  text: {
    borderWidth:1,
    borderColor: 'rgb(20,20,20)',
    borderRadius:10,
    padding:5
  }
});
```
  

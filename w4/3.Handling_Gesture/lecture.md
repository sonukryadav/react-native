# Bottom Sheet

```js
// Install Expo
npx create-expo-app bottom-sheet
npx expo run:android
```

## Install React Native Reanimated

Reanimated is a React Native library that allows for creating smooth animations and interactions that runs on the UI thread.

**Why Reanimated ?**

In React Native apps, the application code is executed outside of the application's main thread. This is one of the key elements of React Native's architecture and helps with preventing frame drops in cases where JavaScript has some heavy work to do. Unfortunately this design does not play well when it comes to event driven interactions. When interacting with a touch screen, the user expects effects on screen to be immediate. If updates are happening in a separate thread it is often the case that changes done in the JavaScript thread cannot be reflected in the same frame. In React Native by default all updates are delayed by at least one frame as the communication between the UI and JavaScript threads is asynchronous and the UI thread never waits for the JavaScript thread to finish processing events. On top of the lag with JavaScript playing many roles like running react diffing and updates, executing app's business logic, processing network requests, etc., it is often the case that events can't be immediately processed thus causing even more significant delays. Reanimated aims to provide ways of offloading animation and event handling logic off of the JavaScript thread and onto the UI thread. This is achieved by defining Reanimated worklets – tiny chunks of JavaScript code that can be moved to a separate JavaScript VM and executed synchronously on the UI thread. This makes it possible to respond to touch events immediately and update the UI within the same frame when the event happens without worrying about the load that is put on the main JavaScript thread.

```js
npx expo install react-native-reanimated
```

```js
  module.exports = {
    presets: [
      ...
    ],
    plugins: [
      ...
      'react-native-reanimated/plugin',
    ],
  };
```

## React Native Gesture Handler

Gesture Handler aims to replace React Native's built in touch system called Gesture Responder System. To know more about them visit : [Gesture Responder System](https://reactnative.dev/docs/gesture-responder-system) and [Pan Responder](https://reactnative.dev/docs/panresponder) 

The motivation for building this library was to address the performance limitations of React Native's Gesture Responder System and to provide more control over the built-in native components that can handle gestures.

```js
expo install react-native-gesture-handler
```

After installation, wrap your entry point with `<GestureHandlerRootView>` or `gestureHandlerRootHOC`.
  
```js
export default function App() {
  return <GestureHandlerRootView style={{ flex: 1 }}>{/* content */}</GestureHandlerRootView>;
}  
```

Note that GestureHandlerRootView acts like a normal View. So if you want it to fill the screen, you will need to pass { flex: 1 } like you'll need to do with a normal View. By default, it'll take the size of the content nested inside.

- [withSpring](https://docs.swmansion.com/react-native-reanimated/docs/api/animations/withSpring/) : Starts a spring-based animation.

```js
// App.js
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from './components/BottomSheet';

export default function App() {
  return (
    <GestureHandlerRootView style={{flex:1}}>
    <View style={styles.container}>
      <StatusBar style="light" />
      <BottomSheet />
    </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

### Basic Understanding Of Gesture

```js
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

const BottomSheet = () => {
  const gesture = Gesture.Pan()
    .onStart(() => {
      console.log('Started........');
    })
    .onUpdate(event => {
      console.log('X: ', event.translationX, 'Y: ', event.translationY);
    })
    .onEnd(() => {
      console.log('End........');
    });
  return (
    <GestureDetector gesture={gesture}>
      <View style={styles.bottomSheet}>
        <Text>BottomSheet</Text>
      </View>
    </GestureDetector>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  bottomSheet: {
    height: 500,
    width: '100%',
    backgroundColor: '#FFF',
  },
});

```

## Actual Use


```js
// BottomSheet.js
import React, { useEffect } from 'react'
import { Dimensions, View, Text, StyleSheet } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const BottomSheet = () => {
  const translateY = useSharedValue(0);
  const prevPosition = useSharedValue({y:0});

  const gesture = Gesture.Pan()
  .onStart(()=>{
    prevPosition.value = { y: translateY.value};
  })
  .onUpdate((event) => {
    translateY.value = Math.max(event.translationY + prevPosition.value.y, -SCREEN_HEIGHT );
  })
  .onEnd(()=>{
    if(translateY.value > -SCREEN_HEIGHT/2){
      translateY.value = withSpring(-35, {damping: 50})
    }else if(translateY.value < -SCREEN_HEIGHT/3){
      translateY.value = withSpring(-SCREEN_HEIGHT, {damping: 50})
    }
  })

  useEffect(()=>{
    translateY.value = withSpring(-35, {damping: 50})
  },[])
  const btmSheetAnimStyle = useAnimatedStyle(()=> {
    return {
    transform: [{translateY: translateY.value}],
    borderRadius: interpolate(translateY.value,
      [-SCREEN_HEIGHT,-SCREEN_HEIGHT+50, 0, ],
      [2,25,25])
  }})

  return (
    <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.btmSheet,btmSheetAnimStyle]}>
        <View style={styles.line}></View>
        <Text>BottomSheet</Text>
        </Animated.View>
    </GestureDetector>
  )
}

export default BottomSheet;

const styles = StyleSheet.create({
    btmSheet : {
        height: SCREEN_HEIGHT,
        width: '100%',
        backgroundColor:"#FFF",
        top: SCREEN_HEIGHT,
        borderRadius: 25
    },
    line:{
        width: 150,
        height: 2,
        backgroundColor: 'grey',
        alignSelf:'center',
        marginVertical: 15,
        borderRadius: 2
    }
})
```

## Worklets

The ultimate goal of worklets was for them to define small pieces of JavaScript code that we run when updating view properties or reacting to events on the UI thread. A natural construct in JavaScript for such a purpose was a simple method. With Reanimated 2 we spawn a secondary JS context on the UI thread that then is able to run JavaScript functions. The only thing that is needed is for that function to have the “worklet” directive at the top:

## Refactor code 

```js
import React, { useEffect } from 'react'
import { Dimensions, View, Text, StyleSheet } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const BottomSheet = () => {
  const translateY = useSharedValue(0);
  const prevPosition = useSharedValue({y:0});

  const scrollTo = (number) => {
    'worklet';
    translateY.value = withSpring(number, {damping: 50});
  }
  const gesture = Gesture.Pan()
  .onStart(()=>{
    prevPosition.value = { y: translateY.value};
  })
  .onUpdate((event) => {
    translateY.value = Math.max(event.translationY + prevPosition.value.y, -SCREEN_HEIGHT );
  })
  .onEnd(()=>{
    if(translateY.value > -SCREEN_HEIGHT/2){
      //translateY.value = withSpring(-35, {damping: 50})
      scrollTo(-35);
    }else if(translateY.value < -SCREEN_HEIGHT/3){
      //translateY.value = withSpring(-SCREEN_HEIGHT, {damping: 50})
      scrollTo(-SCREEN_HEIGHT);
    }
  })

  useEffect(()=>{
    //translateY.value = withSpring(-35, {damping: 50})
    scrollTo(-35);
  },[])
  const btmSheetAnimStyle = useAnimatedStyle(()=> {
    return {
    transform: [{translateY: translateY.value}],
    borderRadius: interpolate(translateY.value,
      [-SCREEN_HEIGHT,-SCREEN_HEIGHT+50, 0, ],
      [2,25,25])
  }})

  return (
    <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.btmSheet,btmSheetAnimStyle]}>
        <View style={styles.line}></View>
        <Text>BottomSheet</Text>
        </Animated.View>
    </GestureDetector>
  )
}

export default BottomSheet;

const styles = StyleSheet.create({
    btmSheet : {
        height: SCREEN_HEIGHT,
        width: '100%',
        backgroundColor:"#FFF",
        top: SCREEN_HEIGHT,
        borderRadius: 25
    },
    line:{
        width: 150,
        height: 2,
        backgroundColor: 'grey',
        alignSelf:'center',
        marginVertical: 15,
        borderRadius: 2
    }
})
```



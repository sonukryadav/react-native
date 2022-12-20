# Animated View

Animation can be defined as manipulating images or objects to appear as moving images or objects. React native provide you with an animated API, which mean animated is an object provided by react native which provide heavy lifting of animation and coordination with the native operating systems such as Android and IOS.

Before starting remember the requirement needed.

- Define the starting value or location (x,y coordinate of screen) of the animation.
- Define the end value or ending location of the animation.
- Define which element we are animating.
- Define the type of animation you want
- Define the duration in which animation should get completed

# Animated View Basic Example

```js
import React, {useRef, useState} from 'react'
import { Animated, Text,SafeAreaView, View, StyleSheet, TouchableOpacity, Platform } from 'react-native';

export default function App() {
  const br = useRef(new Animated.Value(0)).current;
  const rt = useRef(new Animated.Value(0)).current;
  const [isCircle, setIsCircle ] = useState(false);

  const makeCircle = () => {
    Animated.parallel([
      Animated.spring(rt, {toValue: 1, useNativeDriver: true}),
      Animated.spring(br, {toValue: 50, useNativeDriver: true})
    ]).start()
    
    setIsCircle(true);
  }

  const makeSquare = () => {
    Animated.parallel([
      Animated.spring(rt, {toValue: 0, useNativeDriver: true}),
      Animated.spring(br, {toValue: 0, useNativeDriver: true})
    ]).start()
    setIsCircle(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.square,{borderRadius:br, 
                                transform: [
                                  {rotate: rt.interpolate({
                                    inputRange: [0,1],
                                    outputRange: ['0deg', '135deg'],
                                  })}
                                ]}]}></Animated.View>
      <TouchableOpacity style={styles.btn} onPress={ isCircle ? makeSquare : makeCircle}>
        <Text style={styles.btnText}> {isCircle ? "Square" : "Circle"}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    paddingTop: Platform.OS =='android' ? 24 : 0,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  square : {
    width:100,
    height:100,
    backgroundColor:'red',
  },
  btn : {
    marginTop:20,
    backgroundColor:'blue',
    borderRadius:5,
    paddingHorizontal:10,
    paddingVertical:5
  },
  btnText:{
    color:'#fff'
  }
});
```

## Using the native driver

The Animated API is designed to be serializable. By using the native driver, we send everything about the animation to native before starting the animation, allowing native code to perform the animation on the UI thread without having to go through the bridge on every frame. Once the animation has started, the JS thread can be blocked without affecting the animation.

Using the native driver for normal animations is straightforward. You can add useNativeDriver: true to the animation config when starting it.

## Configuring animations

`Animated` provides three types of animation types. Each animation type provides a particular animation curve that controls how your values animate from their initial value to the final value:

Animated.decay() starts with an initial velocity and gradually slows to a stop.
Animated.spring() provides a basic spring physics model.
Animated.timing() animates a value over time using easing functions.

```js
Animated.timing({}).start(({ finished }) => {
  /* completion callback */
});
```
## Animatable Components

- Animated.Image
- Animated.ScrollView
- Animated.Text
- Animated.View
- Animated.FlatList
- Animated.SectionList

## Composing Animations

- Animated.delay() starts an animation after a given delay.
- Animated.parallel() starts a number of animations at the same time.
- Animated.sequence() starts the animations in order, waiting for each to complete before starting the next.
- Animated.stagger() starts animations in order and in parallel, but with successive delays.

## Combining animated values
You can combine two animated values via addition, subtraction, multiplication, division, or modulo to make a new animated value:

- Animated.add()
- Animated.subtract()
- Animated.divide()
- Animated.modulo()
- Animated.multiply()

## Interpolation

Each property can be run through an interpolation first. An interpolation maps input ranges to output ranges.

```js
  style={{
    opacity: fadeAnim, // Binds directly
    transform: [{
      translateY: fadeAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [150, 0]  // 0 : 150, 0.5 : 75, 1 : 0
      }),
    }],
  }}
```

interpolate() supports multiple range segments as well

```js
value.interpolate({
  inputRange: [-300, -100, 0, 100, 101],
  outputRange: [300, 0, 1, 0, 0]
});
```


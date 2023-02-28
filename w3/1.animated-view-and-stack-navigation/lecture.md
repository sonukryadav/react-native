# Animated View

Animation can be defined as manipulating images or objects to appear as moving images or objects. React native provide you with an animated API, which mean animated is an object provided by react native which provide heavy lifting of animation and coordination with the native operating systems such as Android and IOS.

Before starting remember the requirement needed.

- Define the starting value or location (x,y coordinate of screen) of the animation.
- Define the end value or ending location of the animation.
- Define which element we are animating.
- Define the type of animation you want
- Define the duration in which animation should get completed

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

# React Navigation 

[follow the official documentation to install react navigation](https://reactnavigation.org/docs/getting-started)

### Wrapping your app in NavigationContainer

In a typical React Native app, the NavigationContainer should be only used once in your app at the root. You shouldn't nest multiple NavigationContainers unless you have a specific use case for them.

## Stack Navigation

In a web browser, you can link to different pages using an anchor (<a>) tag. When the user clicks on a link, the URL is pushed to the browser history stack. When the user presses the back button, the browser pops the item from the top of the history stack, so the active page is now the previously visited page. 
  
React Native doesn't have a built-in idea of a global history stack like a web browser does -- this is where React Navigation came into picture. 

React Navigation's native stack navigator provides a way for your app to transition between screens and manage navigation history. If your app uses only one stack navigator then it is conceptually similar to how a web browser handles navigation state - your app pushes and pops items from the navigation stack as users interact with it, and this results in the user seeing different screens.
  
```js
import * as React from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// Import all the required screens
// React Navigation 6.x
// import { createNativeStackNavigator } from '@react-navigation/native-stack'; 

const Stack = createStackNavigator();
// React Navigation 6.x
// const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen}  options={{title:"Settings Screen"}} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
      
```
      
- To specify screen-specific options, we can pass an `options` prop to Stack.Screen, and for common options, we can pass `screenOptions` to Stack.Navigator

- `navigation.navigate('RouteName')` pushes a new route to the native stack navigator if it's not already in the stack, otherwise it jumps to that screen.
- We can call `navigation.push('RouteName')` as many times as we like and it will continue pushing routes.
- The header bar will automatically show a back button, but you can programmatically go back by calling `navigation.goBack()`. On Android, the hardware back button just works as expected.
- You can go back to an existing screen in the stack with `navigation.navigate('RouteName')`, and you can go back to the first screen in the stack with `navigation.popToTop()`.
- The navigation prop is available to all screen components (components defined as screens in route configuration and rendered by React Navigation as a route).      


## Passing parameters to routes

- Pass params to a route by putting them in an object as a second parameter to the `navigation.navigate` function: `navigation.navigate('RouteName', { /* params go here */ })`

- Read the params in your screen component: `route.params`.
- You can update the screen's params with navigation.setParams
- Initial params can be passed via the initialParams prop on Screen
- Params should contain the minimal data required to show a screen, nothing more

```js
  navigation.navigate('Details', {
    itemId: 86,
    otherParam: 'anything you want here',
  });
```



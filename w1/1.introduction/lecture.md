
# Prerequisites

I assume that you have a sound knowledge of JavaScript, ES6 and React. No prior knowledge of android or IOS development is required.

# Introduction

Almost any business, especially B2C could benefit from creating App for their business. When we are thinking about app development we have take into consideration two major mobile operating systems Android and IOS. Android app can be developed using Java or Kotlin and IOS app can be developed using swift which is mostly written in C++. This type of development is called **Native Development**. There is an alternative to this which is called **Hybrid Development**. In **Hybrid Development** you have to develop using only one language or framework and it will run both on Android and IOS.

In Hybrid Development there are two famous frameworks. React Native developed by facebook and Flutter developed by Google. 

# Why choose React Native ?

- React Native uses JavaScript while Flutter uses Dart. All of us know that JavaScript is a popular language and uses for webdevelopment as well as backend development. So learning JavaScript is suggestible. As you already know JavaScript and React, It will be easier for you.
- React Native released in 2015 and Flutter released in 2017. React native is mature and it has a large community support which makes tasks easier.
- React Native can call Native functions and vice versa.

# Create First React Native App

We can use either class or function components in React Native. With the introduction of Hooks in React Native 0.59, Function components are more useful then class components.

## Class Component returning Hello World

```js
import React, { Component } from 'react';
import { Text, View } from 'react-native';

class App extends Component {
  render() {
    return (
      <View>
        <Text>Hello, world!</Text>
      </View>
    );
  }
}

export default App;
```

## Function Component returning Hello World

```js
import React from 'react';
import { Text, View } from 'react-native';

const App = () => {
  return (
    <View>
      <Text>Hello, world!</Text>
    </View>
  );
}

export default App;
```

In the above two examples the View and Text are imported from react-native. These are not HTML elements, but in React we are using HTML elements like div and p. HTML elements are rendered in a browser. But These React Native elements we are using with in Mobile development. On Android we are using <ViewGroup> and on IOS <UIView>. While generating APK or AAB for android and IPA for IOS, View will generate ViewGroup in case of android and UIView in case of IOS (How? we will discuss in later sessions).
  
  
No need to remember, but have a look at the below table for better understanding.

| REACT NATIVE UI COMPONENT |     ANDROID VIEW	|    IOS VIEW |    WEB  
|--|--|--|--|
| View	|  ViewGroup	|  UIView		| div (without scrolling)		|
| Text  |  TextView |	UITextView |	p |
| Image |	ImageView |	UIImageView |	img |
| ScrollView |	ScrollView |	UIScrollView |	div (with scrolling) |
| TextInput |	EditText |	UITextField |	input type="text" |
  
  
## Styling in React Native
  
All the react native core components accepts a prop named `style`. The value that is assigned to this prop is a JavaScript object of key value pairs. The key value pair is similar to property and value of CSS rule with one exception that CSS properties are written in camel case. For example, `background-color` is written as `backgroundColor`.

We can style in three different ways.
  
### Example of inline styling  

```js
import React from "react";
import { View, Text } from "react-native";

const App = () => {
  return (
    <View style={{backgroundColor:'#333300', padding:10}}>
      <Text style={{color:'#fff'}}>Hello World!</Text>
    </View>
  );
};

export default App;  
```  
  
### Example of internal styling    

```js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World!</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#333300', 
    padding:10
  },
  text : {
    color:'#fff'
  }
})
```  

### Example of external styling
  
We can also place the styles object in another JS file and import it to use in this file.
  
## Display Flex Property
  
By default the View of React Native is assigned `display:flex` and `flexDirection: 'column'`, But we can change the flexDirection to `row`, `row-reverse` or `column-reverse`
  
```js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World!</Text>
      <View style={rowContainer}>
        <Text style={styles.text}>Text 1</Text><Text style={styles.text}>Text 2</Text>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#333300', 
    padding:10
  },
  text : {
    color:'#fff'
  }
})

const styles1 = StyleSheet.create({
  rowSpaceBetween : {
    flexDirection:'row',
    justifyContent: 'space-between'
  }
})

const rowContainer = StyleSheet.compose(styles.container, styles1.rowSpaceBetween)  
```  

From the above example we also came to know about `StyleSheet.compose()` which can be used to combine two styles. We can use `...` (spread operator) for this as used in next example.
  
```js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World!</Text>
      <View style={{...styles.container, ...styles1.rowSpaceBetween}}>
        <Text style={{...styles.text1, flex:1}}>Text 1</Text><Text style={{...styles.text1, flex:2}}>Text 2</Text>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#333300', 
    padding:10
  },
  text : {
    color:'#fff',
  },
  text1 : {
    backgroundColor: '#fff',
    borderRadius:5,
    paddingHorizontal:5,
    marginHorizontal:10,
  }
})

const styles1 = StyleSheet.create({
  rowSpaceBetween : {
    flexDirection:'row',
    justifyContent: 'space-between'
  }
})
  
```  

In the above example we have used `flex` to set the width. The flex of text1 is set to 1 and of text2 is set to 2. So the available width will be divided in to 3 equal parts out of which 2 parts will be assigned to text2 and 1 part will be assigned to text1. Instead of this, we can use percentage also for width.
  
## Platform specific code
  
Generally we write Hybrid app to take the benefit of using it on both platforms. But some times we may need some code to be different on different platforms. This can be achieved on two different ways.
  
1. Using Platform module
2. Using Platform-specific file extension

### Example of using Platform module  
  
```js
import React from "react";
import { SafeAreaView, View, Text, StyleSheet, Platform } from "react-native";

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Hello World!</Text>
      <View style={{...styles.container, ...styles1.rowSpaceBetween}}>
        <Text style={{...styles.text1, flex:1}}>Text 1</Text><Text style={{...styles.text1, flex:2}}>Text 2</Text>
      </View>
    </SafeAreaView>
  );
};

export default App;


const styles = StyleSheet.create({
  
  container: {
    backgroundColor: Platform.select({
      ios: '#333399',
      android:'#333300',
      web:'#669999'
    }), 
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    paddingBottom:10,
    paddingHorizontal:10,
  },
  text : {
    color:'#fff',
  },
  text1 : {
    overflow:'hidden', // required for IOS
    backgroundColor: '#fff',
  	borderRadius: 10,
    padding:5,
    marginHorizontal:10,
  }
})

const styles1 = StyleSheet.create({
  rowSpaceBetween : {
    flexDirection:'row',
    justifyContent: 'space-between'
  }
})  
```  

### Using platform specific file extension  
  
```js
// File App.android.js
import React from "react";
import { SafeAreaView, Text } from "react-native";

const App = () => {
  return (
    <SafeAreaView>
      <Text>Hello World! This is android platform.</Text>
    </SafeAreaView>
  );
};

export default App;
```
  
```js
  // File App.js
import React from "react";
import { SafeAreaView, Text } from "react-native";

const App = () => {
  return (
    <SafeAreaView>
      <Text>Hello World! This is default platform other then android may be web or ios.</Text>
    </SafeAreaView>
  );
};

export default App;
  
```  

## Button
  
A nice basic button component which renders nicely on any platform. It covers the whole width of screen if it's parent element's `alignItems` not set to `center` . We can set the color and disable property. The color property sets the background color in android and text color in IOS. It don't have a style property. To set the width we have to wrap it with in a View.
  
```js
<View style={{width:100}}>
  <Button title="click me" color="green" onPress={()=>alert("Clicked")}/>
</View>  
```  
  
Most of the times due to this limited customisation developers use Pressable or TouchableOpacity to create button. We will discuss this in later sessions.  
  
## Task for the day
  
- Create a Counter App
- Use different button colors different platforms using platform module  
- The counter and two buttons, all three should be with in a card. Try to apply shadow to the card.  
  

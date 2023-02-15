# Image in React Native

A React component for displaying different types of images, including network images, static resources, temporary local images, and images from local disk, such as the camera roll.

```js
import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import snackIcon from './assets/snack-icon.png'

const App = () => {
  return(<View>
    <Image source={{uri:"https://cdn.pixabay.com/photo/2021/11/22/05/02/dalmatian-6815838_960_720.jpg"}} style={styles.roundImage}/>
    <Image source={require('./assets/snack-icon.png')} style={styles.squareImage}/>
    <Image source={snackIcon} style={styles.squareImage}/>
  </View>)
}

export default App;

const styles = StyleSheet.create({
  squareImage : {
    width:100,
    height:100,
    borderRadius:10  
  },
  roundImage: {
    width:100,
    height:100,
    borderRadius:'50%'  
  }
})

```

### Image Props

- source: specifies source of the image
- resizeMode: Determines how to resize the image when the frame doesn't match the raw image dimensions.
    Value of this prop can be any one of the following. The default is `cover`
  - cover: Scale the image uniformly (maintain the image's aspect ratio) so that both dimensions (width and height) of the image will be equal to or larger than the corresponding dimension of the view (minus padding). at least one dimension of the scaled image will be equal to the corresponding dimension of the view (minus padding). 
  - contain: Scale the image uniformly (maintain the image's aspect ratio) so that both dimensions (width and height) of the image will be equal to or less than the corresponding dimension of the view (minus padding).
  - stretch: Fit the width and height of image to mentioned width and height, This may change the aspect ratio.
  - repeat: Repeat the image to cover the frame of the view. The image will keep its size and aspect ratio, unless it is larger than the view, in which case it will be scaled down uniformly so that it is contained in the view.
  - center: Center the image in the view along both dimensions. If the image is larger than the view, scale it down uniformly so that it is contained in the view.

# Showing list of items

Let us write a program which will display a list of items from an array on the screen. If we click on add item. It will add an item to the array.

```js
import React, {useState} from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'
import  Constants  from 'expo-constants'


const App = () => {
  const [data, setData] = useState([])

  const addItem = () => {
    setData(prev => [...prev, 'item '+Math.ceil(Math.random()*100)]);
  }
  return(<View style={styles.container}
  >
    <Button title="Add Item" onPress={addItem}/>
    <Text style={styles.heading}>List of Items</Text>
    {data.map(item => (<Text style={styles.item}>{item}</Text>))}
    {data.length == 0 && <Text style={{textAlign:'center'}}>No Items in list</Text>}
  </View>)
}

export default App;

const styles = StyleSheet.create({
  container : {
    marginTop: Constants.statusBarHeight
  },
  item : {
    borderRadius:10,
    borderWidth:1,
    padding:5,
    margin:5,
  },
  heading : {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign:'center'
  }
})
```

Can you tell me what is the drawback of this program ? 

Ans: When the list of item is large, some items are going out of screen. 

The list should be scrollable. To make a large list scrollable, we can use ScrollView or FlatList.

## ScrollView

The ScrollView is a generic scrolling container that can contain multiple components and views. By default it is a vertical scrollable container but you can make it horizontal by specifying horizontal property.

Let us modify our previous program and wrap our list of items with in a scrollview.

### Example of vertical list of items

```js
    <ScrollView>
    {data.map(item => (<Text style={styles.item}>{item}</Text>))}
    {data.length == 0 && <Text style={{textAlign:'center'}}>No Items in list</Text>}
    </ScrollView>
```

### Example of horizntal list of items

```js
    <ScrollView horizontal>
    {data.map(item => (<Text style={styles.item}>{item}</Text>))}
    {data.length == 0 && <Text style={{textAlign:'center'}}>No Items in list</Text>}
    </ScrollView>
```

Note : The ScrollView works best to present a small number of things of a limited size. All the elements and views of a ScrollView are rendered, even if they are not currently shown on the screen. If you have a long list of items which cannot fit on the screen, you should use a FlatList instead.

Before moving to FlatList let us find out, How to attach a pull to refresh to our ScrollView.

## Pull to Refresh

`RefreshControl` component is used inside a ScrollView to provide pull to refresh functionality.

most used props
- onRefresh: Function to be executed when the ScrollView is pulled down.
- refreshing : when true displays spinner. So at the beginning of `onRefresh` method set it true then at the end set it false.
- colors: on Android sets the spinner color
- tintColor: on IOS sets the spinner color

```js
import React, {useState} from 'react'
import {View, Text, StyleSheet, RefreshControl, ScrollView} from 'react-native'
import  Constants  from 'expo-constants'

const App = () => {
  const [data, setData] = useState([])
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = () => {
    setRefreshing(true) ;
    setData(prev => [...prev, 'item '+Math.ceil(Math.random()*100)]);
    setRefreshing(false);
  }
  return(
    <View style={styles.container}>
      <Text style={styles.heading}>List of Items</Text>
      <ScrollView
    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['red']} tintColor='green' />}
  >
    {data.map(item => (<Text style={styles.item}>{item}</Text>))}
    {data.length == 0 && <Text style={{textAlign:'center'}}>No Items in list</Text>}
    </ScrollView>
  </View>)
}

export default App;

const styles = StyleSheet.create({
  container :{
    marginTop: Constants.statusBarHeight
  },
  item : {
    borderRadius:10,
    borderWidth:1,
    padding:5,
    margin:5,
  },
  heading : {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign:'center'
  }
})
```

As this task ends quickly so you may not see the spinner properly. While getting data from server you may see it properly. To test it now letus create a function which intentionaly delay the process, so that we can see the spinner.

```js
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = () => {
    setRefreshing(true) ;
    setData(prev => [...prev, 'item '+Math.ceil(Math.random()*100)]);
    wait(2000).then(() => setRefreshing(false));
  }
```

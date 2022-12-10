# FlatList in React Native

In React Native, you can use the FlatList component to render a long list of data. It renders only the items shown on the screen in a scrolling list and not all the data at once. To render a scrollable list of items using FlatList , you need to pass the required data prop to the component. The other props are self explanatory.

- data: array of items
- renderItem: a function that returns a JSX for a single item.
- keyExtractor: extracts key from data. But remember that it should be a string.
- numColumns: number of columns
- horizontal: show horizontal list
- itemSeparatorComponent:
- listHeaderComponent:
- listFooterComponent:
- listEmptyComponent: 

```js
import React, {useState} from 'react'
import {View, Text, StyleSheet, RefreshControl, FlatList} from 'react-native'
import  Constants  from 'expo-constants'

const App = () => {
  const [data, setData] = useState([])
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = () => {
    setRefreshing(true) ;
    setData(prev => [...prev, 'Task no: '+Math.ceil(Math.random()*100)]);
    setRefreshing(false);
  }
  return(
    <View style={styles.container}>
      <Text style={styles.heading}>List of Tasks</Text>
      <FlatList
      refreshControl={<RefreshControl 
          refreshing={refreshing} 
          onRefresh={onRefresh} 
          colors={['red']} 
          tintColor='green' />}
      data={data}
      renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
      keyExtractor={(_, index) => index.toString() }
      numColumns={2}
      ItemSeparatorComponent={() => <View style={styles.separator}></View>}
      ListHeaderComponent={() => <Text style={{textAlign:'center'}}>This is header of FlatList</Text>}
      ListFooterComponent={() => <Text  style={{textAlign:'center'}}>This is footer of FlatList</Text>}
      ListEmptyComponent={() => <Text style={{textAlign:'center'}}>No Items in list</Text>}

      />
  </View>)
}

export default App;

const styles = StyleSheet.create({
  container :{
    marginTop: Constants.statusBarHeight
  },
  item : {
    flex:1,
    borderRadius:10,
    borderWidth:1,
    borderColor:'#006666',
    padding:5,
    margin:5,
  },
  heading : {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign:'center'
  },
  separator:{
    flex:1,
    borderColor:'#006666',
    borderBottomWidth:2,
    margin:10
  }
})
```

## Section List in React Native

```js
import React from "react";
import { StyleSheet, Text, View, SafeAreaView, SectionList, StatusBar } from "react-native";

const DATA = [
  {
    category: "Mobile Phones",
    data: ["Galaxy s22", "Xiomi 12 Pro", "I-Phone 15"]
  },
  {
    category: "Refrigerators",
    data: ["Haier Single Door", "LG Double Door", "Godrej Single Door"]
  },
  {
    category: "Dresses",
    data: ["Lymio Multi Color", "Toplot Black Dress", "Keri Perry"]
  },
];

const App = () => (
  <SafeAreaView style={styles.container}>
    <SectionList
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => <View style={styles.item}>
                                  <Text style={styles.title}>{item}</Text>
                                </View>}
      renderSectionHeader={({ section: { category } }) => (
        <Text style={styles.header}>{category}</Text>
      )}
    />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16
  },
  item: {
    backgroundColor: "#006666",
    padding: 20,
    marginVertical: 8,
    flexDirection:'row'
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 24
  }
});

export default App;
```

## SectionList with Columns

```js
import React from "react";
import { StyleSheet, Text, View, SafeAreaView, SectionList, StatusBar, FlatList } from "react-native";

const DATA = [
  {
    category: "Mobile Phones",
    data: [{list:["Galaxy s22", "Xiomi 12 Pro", "I-Phone 15"]}]
  },
  {
    category: "Refrigerators",
    data: [{list:["Haier Single Door", "LG Double Door", "Godrej Single Door"]}]
  },
  {
    category: "Dresses",
    data: [{list:["Lymio Multi Color", "Toplot Black Dress", "Keri Perry"]}]
  },
];

const App = () => (
  <SafeAreaView style={styles.container}>
    <SectionList
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => < FlatList horizontal data={item.list} renderItem={({item})=><Text style={styles.item}>{item}</Text>}/>}
      renderSectionHeader={({ section: { category } }) => (
        <Text style={styles.header}>{category}</Text>
      )}
    />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16
  },
  item: {
    backgroundColor: "#006666",
    padding: 20,
    marginVertical: 8,
    flexDirection:'row',
    margin:10
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff"
  }
});

export default App;
```

Note: Remember FlatList and SectionList both are PureComponents which means that it will not re-render if props remain shallow-equal.

## Icons

`@expo/vector-icons` or `react-native-vector-icons` can be used to include popular icon sets in our app. `@expo/vector-icons`  is built on top of `react-native-vector-icons` and uses similar API.

`https://oblador.github.io/react-native-vector-icons/` can be used to search for any icon. The icon sets are `AntDesign`, `Entypo`,
`EvilIcons`,`Feather`, `FontAwesome`, `FontAwesome5`, `FontAwesome5Brands`, `Fontisto`, `Foundation`, `Ionicons`, `MaterialCommunityIcons`, `MaterialIcons`, `Octicons`, `SimpleLineIcons`, `Zocial`.

```js
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function App() {
  return (
    <View style={styles.container}>
      <Ionicons name="md-checkmark-circle" size={32} color="green" />
      <Ionicons name="eye-off" size={32} color="green" />
      <Ionicons name="fast-food" size={32} color="green" />
      <Ionicons name="finger-print" size={32} color="green" />                  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```



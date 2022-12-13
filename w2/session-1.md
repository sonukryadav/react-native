# Async Storage

- unencrypted, Asynchronous, Persistent, key-value storage system
- Global Local Storage
- Offline Local Storage
- can only store string data
- To store object use `JSON.stringify()` while storing and `JSON.parse()` after reading.
- Don't use it to store secrets
- AsyncStorage is not shared between multiple apps. Every app runs it it's own sandbox environment and has no access to other apps
- core component is deprecated, use npm package: @react-native-async-storage/async-storage

```js
// Counter APP using AsyncStorage
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log("Successfully stored data to async storage", value);
  } catch (e) {
    // saving error
    console.log("Error saving data to async storage.");
  }
};

const App = () => {
  const [counter, setCounter] = useState(null);

  const inc = () => {
    setCounter((prev) => prev + 1);
  };

  const dec = () => {
    setCounter((prev) => prev - 1);
  };

  useEffect(() => {
    if(counter !== null)
      storeData("counter", counter);
  }, [counter, setCounter]);

  useEffect(() => {
    AsyncStorage.getItem("counter")
      .then((data) => {
        console.log(typeof data, data);
        setCounter(parseInt(data));
      })
      .catch((e) => console.log("Error receiving data"));
  }, []);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItem: "center",
        justifyContent: "center"
      }}
    >
      <TouchableOpacity onPress={dec}>
        <Text>-</Text>
      </TouchableOpacity>
      <Text style={{ marginHorizontal: 20 }}>{counter}</Text>
      <TouchableOpacity onPress={inc}>
        <Text>+</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={()=>{
        AsyncStorage.getItem('counter').then(d => {
          console.log("Counter data:",d)
          setCounter(d);
        })
      }}>
        <Text>Get Data</Text>
      </TouchableOpacity> */}
      <TouchableOpacity onPress={()=>{
        storeData('counter',0);
        setCounter(0);
      }}>
        <Text>Reset Data</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
```

```js
import React, {useState, useEffect} from "react";
import { SafeAreaView, StyleSheet, TextInput, Platform,TouchableOpacity, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key,value) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (e) {
    // saving error
  }
}


const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key)
    return value;
  } catch(e) {
    // error reading value
    return null;
  }
}

const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key)
    return true;
  } catch(e) {
    // error reading value
    return false;
  }
}


const App = () => {
  const [no, setNo] = useState();

useEffect(()=>{
  getData("app-opened").then(prevNo => {
    storeData("app-opened",prevNo ? parseInt(prevNo)+1 : 0) ;
    getData("app-opened").then(v => setNo(v))
  })
  
},[])

  return(<SafeAreaView style={styles.container}>
    <Text style={{textAlign:'center', fontSize:18}}>Track Number of Times App Opened</Text>
    <Text style={{textAlign:'center', fontSize:25}}>{no}</Text>
    <TouchableOpacity onPress={async()=> {await removeData('app-opened'); setNo(0);}} style={styles.btn}>
      <Text style={{color:'#FFF'}}>Reset Data</Text>
    </TouchableOpacity>
  </SafeAreaView>)
}

export default App;

const styles = StyleSheet.create({
  container : {
    marginTop: Platform.OS === "android" ? 24 : 0
  },
  btn:{
    backgroundColor:'#993300',
    borderRadius:5,
    padding:5,
    margin:10,
    alignItems:'center'
  }
});
```

## Modal

The Modal component is a basic way to present content above an enclosing view.

### Props

- inherits `View` Props
- visible: `true or false` : determines the visibility of modal
- onRequestClose: `function` : It is called when the user taps hardware back button on android or the menu button on IOS. 
- animationType: `none, slide, fade` : controls modal animation, default is none
- onShow: `function` : The passed function will be called once the modal is shown
- transparent: `true or false` : If true renders the modal over a transparent background and fill the entire view.

```js
import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from "react-native";

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
      <TouchableOpacity 
        style={{backgroundColor:'rgba(153, 153, 102,0.5)', flex:1}} 
        onPress={() => setModalVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
        </TouchableOpacity>
      </Modal>
      <Text style={{marginBottom:180, fontSize:22}}>Modal Example</Text>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default App;
```

## Alert

Launches an alert dialog with the specified title and message. By default an `Ok` button will be displayed, If we need we can provide a list of buttons with onPress callback.

```js
import React, { useState } from "react";
import { View, StyleSheet, Button, Alert } from "react-native";

const App = () => {
  const createTwoButtonAlert = () =>
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

  const createThreeButtonAlert = () =>
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Ask me later",
          onPress: () => console.log("Ask me later pressed")
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

  return (
    <View style={styles.container}>
      <Button title={"2-Button Alert"} onPress={createTwoButtonAlert} />
      <Button title={"3-Button Alert"} onPress={createThreeButtonAlert} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  }
});

export default App
```

## Networking

In mobile applications we may need to load resources from a backend server and may need to save something to backend server.

For this purpose we can use inbuilt `fetch` or third party networking library `axios`.

## GET Request

```js
    axios.get('https://jsonplaceholder.typicode.com/postss')
      .then(response => {
        console.log(response.data);
      }).catch(error => {
        console.log("Unable to access data");
      });
    },[]);

// fetch()
fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())    // one extra step
  .then(data => {
    console.log(data) 
  })
  .catch(error => console.error(error));
```

## POST Request with Custom Header

```js
// axios

const url = 'https://jsonplaceholder.typicode.com/posts'
const data = {
  title: 'This is title',
  body: 'This is body',
  userId: 1,
};
axios
  .post(url, data, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  })
  .then(({data}) => {
    console.log(data);
});

// fetch()

    const url = "https://jsonplaceholder.typicode.com/posts";
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        title: 'This is title',
        body: 'This is body',
        userId: 1,
      }),
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
```

Notice that:

- To send data, fetch() uses the body property for a post request to send data to the endpoint, while Axios uses the data property
- The data in fetch() is transformed to a string using the JSON.stringify method
- Axios automatically transforms the data returned from the server, but with fetch() you have to call the response.json method to parse the data to a JavaScript object. More info on what the response.json method does can be found [here](https://developer.mozilla.org/en-US/docs/Web/API/Response/json).
- With Axios, the data response provided by the server can be accessed with in the [data object](https://github.com/axios/axios#response-schema), while for the fetch() method, the final data can be named any variable.

[Json Placeholder Typicode Guide](https://jsonplaceholder.typicode.com/guide/)





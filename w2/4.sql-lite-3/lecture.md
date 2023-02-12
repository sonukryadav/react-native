# SQLite Project Part 2 and Create APK and AAB for distribution

Implementation of

- Update data of Table
- Delete data from table


## Project : Task List Part 2

    - long press on the task to complete it. Display completed tasks in different color
    - press on completed task to delete it. ask confirmation before deleting task
    - press on uncompleted task to edit it.

```js
import React,{useState, useEffect} from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import {openDatabase} from 'expo-sqlite'
import AntDesign from 'react-native-vector-icons/AntDesign'

const db = openDatabase("mydatabase1.db");
const tblName = 'todotable';

// long press on the task to complete it
// press on completed task to delete it
//    - ask confirmation before deleting task
// press on uncompleted task to edit it

export default function App() {
  const [todos, setTodos] = useState([]);
  const [val, setVal] = useState('');

    // Create Table
  const CreateTodoTable =  async() => {
    ExecuteSql(
            db,
            `CREATE TABLE IF NOT EXISTS todotable(id INTEGER PRIMARY KEY AUTOINCREMENT, task VARCHAR(20), status INTEGER(1))`,
          ).then(t => console.log(t))
          .catch(e => console.log("Error creating table"))
  }

  // Add Task
  const addTask = () => {
    ExecuteSql(db, 'INSERT INTO todotable (task, status) VALUES (?,?)', [
      val,
      0,
    ])
    .then(async res => {
      console.log(res, `Inserted :${res.insertId}`);
      let data = await ExecuteSql(
        db,
        `SELECT * FROM ${tblName} WHERE id=${res.insertId}`,
      );
      setTodos(prev => [...prev, data.rows.item(0)]);
      setVal('');
    })
    .catch(e => {
      console.log("Error:", e)
    });
  }



  // Pull Data From Table
  const pullDataFromTable = () => {
    ExecuteSql(db, 'SELECT * FROM todotable').then(res => {
      console.log(res);
      const {rows:{_array}} = res;
      console.log("rows:", _array)
      setTodos(_array);
    })
  }

  useEffect(()=>{
    console.log("Creating Table");
    CreateTodoTable();
    pullDataFromTable();
  },[])

  return (
    <View style={{marginTop:25}}>
    <View style={styles.inputContainer}>
      <TextInput style={styles.input} 
        value={val} 
        onChangeText={(t)=>setVal(t)}
        placeholder="Ener Your Task"
        />
      <TouchableOpacity style={styles.caret} onPress={addTask}>
      <AntDesign 
        name="caretright" 
        size={32} 
        color={'rgb(20,20,20)'} />      
      </TouchableOpacity>
      </View>
      <View style={styles.taskListContainer}>
      <View style={styles.taskListTitleContainer}>
      <Text style={styles.taskListTitle}>List of Tasks</Text>
      </View>
      <ScrollView>
      {todos.map(todo => <SingleTask todo={todo} key={todo.id} setTodos={setTodos}/>      )}
      </ScrollView>
    </View>
  </View>);
}

const styles = StyleSheet.create({
  item : {
    flex:1,
    textAlign:'center',
    padding:10,
    margin:5,
    borderWidth:1,
    borderRadius:5,
    borderColor: 'rgb(20,20,20)'
  },
  completedItem:{
    backgroundColor: 'green',
    color:'#fff'
  },
  inputContainer : {
    flexDirection:'row',
    alignItems:'center'
  },
  input : {
    flex:1,
    borderWidth:1,
    borderColor: 'rgb(20,20,20)',
    margin:5,
    padding:5,
    borderRadius: 5
  },
  caret:{
    padding: 2,
    borderWidth:1,
    borderRadius:5,
    BorderColor:'rgb(20,20,20)',
    marginRight:5
  },
  taskListContainer:{
    borderWidth:1,
    borderRadius:5,
    marginHorizontal:5,
    marginVertical:20,
    paddingTop:20,
  },
  taskListTitle :{
    textAlign:'center',
    position:'relative',
    marginTop: -35,
    backgroundColor:'#fff',
    paddingHorizontal:10,
    fontSize: 20
  },
  taskListTitleContainer:{
    alignItems:'center'
  }
})

export function ExecuteSql(db, query, params = []) {
  return new Promise((resolve, reject) => {
    db.transaction(txn => {
      txn.executeSql(
        query,
        params,
        (tx, res) => resolve(res),
        e => reject(e),
      );
    });
  });
}

export const SingleTask = ({todo, setTodos}) => {
  const [isEditable, setIsEditable] = useState(false);
  const [task, setTask] = useState(todo.task);

  const editTask = () => {
    setIsEditable(true);
  }

  const deleteTask = () => {
    Alert.alert("Are you sure!",
      "You want to delete this task",
      [{text:'Ok',
        onPress:() => {
          ExecuteSql(db,`DELETE FROM todotable WHERE id=?`,[todo.id])
          .then(()=>{
            Alert.alert("Deleted Successfully.");
            setTodos(prev => prev.filter(p => p.id !== todo.id));
          })
          .catch(() =>{
            Alert.alert("Unable to Delete!","Please try again later.")
          })
        },
        
      },{text:'Cancel'}])
  }

  // Update a single Task

  const updateTask = () => {
    ExecuteSql(db, `UPDATE ${tblName} SET task= ? WHERE id=?`, [
      task,
      todo.id,
    ]).then(()=>{
      setTodos(prev => prev.map(p => p.id === todo.id ? {...p, task} : p));
      setIsEditable(false);
    }).catch(()=>{
      console.log('Unable to update please try later.')
    });    
  }

  // Mark Task Completed
  const markTaskComplete = (id, status) => {
    //console.log('task completed', id, status);
    ExecuteSql(db, `UPDATE ${tblName} SET status= ? WHERE id=?`, [(status === 0 ? 1 : 0),id,
    ]).then(()=>{
      setTodos(prev => prev.map(p => p.id === id ? {...p, status:status === 0 ? 1 : 0} : p))
    }).catch(()=>{
      console.log('Unable to update please try later.')
    });
  }  

  return(<TouchableOpacity  
    key={todo.id} 
    onLongPress={() => markTaskComplete(todo.id, todo.status)}
    onPress={() => {todo.status === 0 ? editTask() : deleteTask()}}
    >
      {isEditable ?
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} 
            value={task}
            onChangeText={(t) => setTask(t)}/>
          <TouchableOpacity style={styles.caret} onPress={updateTask}>
            <AntDesign 
              name="caretright" 
              size={32} 
              color={'rgb(20,20,20)'} />      
          </TouchableOpacity>          
        </View>      
          :
        <View>
          <Text style={[styles.item, todo.status ? styles.completedItem : {} ]}>{todo.task}</Text>
        </View>
      }
  </TouchableOpacity>)}
```

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

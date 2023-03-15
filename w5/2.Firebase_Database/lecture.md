Firebase has two types of databases, 1. Realtime Database and 2. Firestore Database. Firestore is the newest database used for mobile app development. Cloud Firestore has richer features, faster queries, and scale further than the real-time database. Cloud Firestore is a flexible as well as scalable NoSQL cloud database. It is used to store and sync data for client and server-side development.


## Realtime Database

First install firebase app module. Then install realtime database module.

```js
npm install --save @react-native-firebase/database
```

### Usage

#### Create a Reference

```js
import database from '@react-native-firebase/database';

const reference = database().ref('/users/123');
```

### In case of Expo

In case of Expo, instead of importing database from the package, use the below method.

```js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2rf0tWVDRAKzgrfKnoyjqV-oqkVPGHMk",
  authDomain: "signal-clone-subrata.firebaseapp.com",
  projectId: "signal-clone-subrata",
  storageBucket: "signal-clone-subrata.appspot.com",
  messagingSenderId: "1028334267171",
  appId: "1:1028334267171:web:6e1dd9486624815e523a96",
  databaseURL: "https://signal-clone-subrata-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
```

### Reading Data

#### One-time read

```js
reference.once('value')
.then(datasnapshot => {
  console.log("Data : ", datasnapshot.val());
});  
```

#### Realtime Changes

This sets up an active listener to the reference node and it's children.

- Subscribe to realtime changes

```js
reference.on('value', datasnapshot => {
  console.log("Data : ", snapshot.val());
});
```

- unSubscribe to realtime changes

```js
  useEffect(() => {
    const onValueChange = database()
      .ref(`/users/${userId}`)
      .on('value', snapshot => {
        console.log('User data: ', snapshot.val());
      });

    // Stop listening for updates when no longer required
    return () => database().ref(`/users/${userId}`).off('value', onValueChange);
  }, [userId]);
```

### Writing Data

#### set

The `set` method on a reference node, overwrites all the existing data on that node. The value can be anything; a string, number, object etc. If you set the value to `null` firebase will delete that node.

```js
reference.set({
    name: 'Subrata Das',
    age: 46,
  })
  .then(() => console.log('Data set.'))
  .catch((e)=>{ console.log("Unable to set data : ", e)})
```

#### update

Firebase will update or merge the data depending on what currently exists.

```js
reference.update({
    name: "Subrata Kumar Das",
  })
  .then(() => console.log('Data updated.'));
```

### Removing Data

```js
await database().ref('/users/123').remove();
```

```js
await database().ref('/users/123').remove();
```

## Cloud Firestore

Cloud Firestore stores data within "documents", which are contained within "collections", and documents can also contain collections.

```js
# Install the firestore module
yarn add @react-native-firebase/firestore
```

`collection` method returns a `CollectionReference` and `doc` method returns a `DocumentReference`.

## Read Data

### One-time read

```js
import firestore from '@react-native-firebase/firestore';

const users = await firestore().collection('Users').get(); // CollectionReference
const user = await firestore().collection('Users').doc('ABC').get();  // DocumentReference
```

### Realtime Changes

```js
import firestore from '@react-native-firebase/firestore';

function onResult(QuerySnapshot) {
  console.log('Got Users collection result.');
}

function onError(error) {
  console.error(error);
}

firestore().collection('Users').onSnapshot(onResult, onError);
```

```js
import React, { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

function User({ userId }) {
  useEffect(() => {
    // Subscribe to firestore realtime changes
    const subscriber = firestore()
      .collection('Users')
      .doc(userId)
      .onSnapshot(documentSnapshot => {
        console.log('User data: ', documentSnapshot.data());
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [userId]);
}
```

### get all documentsnapshots from querysnapshot

```js
import firestore from '@react-native-firebase/firestore';

firestore()
  .collection('Users')
  .get()
  .then(querySnapshot => {
    console.log('Total users: ', querySnapshot.size);

    querySnapshot.forEach(documentSnapshot => {
      console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
    });
  });
```

- A snapshot also provides a helper function to easily access deeply nested data within a document.

```js
documentSnapshot.get('info.address.zipcode');
```

#### Advanced Querying

```js
firestore()
  .collection('Users')
  // Filter results
  .where('age', '>=', 18)
  // Limit results
  .limit(20)  
  .get()
  .then(querySnapshot => {
    /* ... */
  });
```

```js
firestore()
  .collection('Users')
  // Filter results
  .where('languages', 'in', ['en', 'fr'])
  .startAt(18)
  .endAt(30)  
  .get()
  .then(querySnapshot => {
    /* ... */
  });
```

### Writing Data

#### add

```js
// adds a new document to the collection with a random unique ID
import firestore from '@react-native-firebase/firestore';

firestore()
  .collection('Users')
  .add({
    name: 'Ada Lovelace',
    age: 30,
  })
  .then(() => {
    console.log('User added!');
  });
```
#### set

```js
// adds a new document to the collection with given document ID. It replaces existing data, if any.
firestore()
  .collection('Users')
  .doc('ABC') // given document ID
  .set({
    name: 'Ada Lovelace',
    age: 30,
  })
  .then(() => {
    console.log('User added!');
  });
```

#### update

```js
firestore()
  .collection('Users')
  .doc('ABC')
  .update({
    age: 31,
  })
  .then(() => {
    console.log('User updated!');
  });
```

- updating deeply nested values

```js
firestore()
  .collection('Users')
  .doc('ABC')
  .update({
    'info.address.zipcode': 94040,
  })
  .then(() => {
    console.log('User updated!');
  });
```

### Removing Data

```js
firestore()
  .collection('Users')
  .doc('ABC')
  .delete()
  .then(() => {
    console.log('User deleted!');
  });
```

If a document contains any sub-collections, these will not be deleted from database. You must delete any sub-collections yourself or use `Firebase Admin SDK`.

- remove a specific property with a document

```js
firestore().collection('Users').doc('ABC').update({
  fcmTokens: firestore.FieldValue.delete(),
});
```

# Secure Your Data

You have to write firebase rules to secure your data.

[Realtime Database Rules](https://firebasetutorials.com/firebase-realtime-database-rules/)

[FireStore Rules](https://fireship.io/snippets/firestore-rules-recipes/)



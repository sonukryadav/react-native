
- Users list should display individual users and groups
- Self name should not be visible in users list
- On right hand side of the tile there should be a delete button or icon for self created groups
- In chat room received messages should be on left side and sent messages should be on right hand side
- If the room is a group chat room then Name and sent data and time should be visible at the top of single chat message.
- Show a reaction count with reactions at the bottom of single chat.

```js
Note: The below code is only for reference purpose.
```

## Users Node Structure

```js
myusers
    |---groupid
    |      |-- adminId : 'admin uid'
    |      |-- createdAt : timestamp
    |      |-- email: null
    |      |-- isGroup: true
    |      |-- members: Array of members (name, email, uid, profile picture)
    |
    |--- uid
          |-- email
          |-- name
          |-- uid
          |-- profile picture
          |-- createdAt
```

## Display a list of users from Firebase Realtime Database

To display the list of users stored in firebase realtime database we can set the following rule.

```js
myusers:{
  ".read" : "auth.uid!=null",
  ".write" : "auth.uid!=null", // to create groups with group id
  "$uid" : {
    ".read" : "auth.uid != null",
    ".write" : "auth.uid != null && auth.uid==$uid"
  }
}
```

It means, any one can read the data from myusers node but can't write on specific user id node. You may concern about security as anyone can read your data. There are two ways for this as below :

- 1) Store encrypted data in database instead of raw data. We can use `@dhairyasharma/react-native-encryption` npm package or any other similar package to encrypt our data.
- 2) Use appcheck so that only calls from your android device can access your data.

## Chat Message Security Rule

We are storing chat messages on firestore database. We can set such a rule so that only authenticated users can write the chat messages.

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
    
    match /Messages/{document=**}{
    	allow read, write: if request.auth.uid != null;
    } 
       
  }
}
```

## Firebase Storage Rule

Let us set a firebase storage rule, so that only authenticated users can store files to it.

```js
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Use of Redux-Toolkit for State Management

In the below example user data is also stored in firestore database. You will store in realtime database so your database code will be different. The flow will remain same.

```js
// userSlice.tsx
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Constants} from '../../settings/config';

type signUpDataType = {
  email: string;
  password: string;
  displayName: string;
};

type signInDataType = {
  email: string;
  password: string;
};

export const signIn = createAsyncThunk(
  'user/signin',
  async (data: signInDataType) => {
    const userData = await auth().signInWithEmailAndPassword(
      data.email,
      data.password,
    );
  },
);

export const signUp = createAsyncThunk(
  'user/signup',
  async (data: signUpDataType) => {
    const userData = await auth().createUserWithEmailAndPassword(
      data.email,
      data.password,
    );
    const user = auth().currentUser;
    await user?.updateProfile({
      displayName: data.displayName,
    });

    await firestore()
      .collection('Users')
      .doc('' + user?.uid)
      .set({
        name: data.displayName,
        email: data.email,
        uid: user?.uid,
        isgroup: false,
        members: null,
      });

    return true;
  },
);

export const signOut = createAsyncThunk('user/signout', async () => {
  await auth().signOut();
  return null;
});

const getInitialUser = () => {
  const u = auth().currentUser;
  if (u === null) return null;
  return {displayName: u.displayName, uid: u.uid, email: u.email};
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: getInitialUser(),
    userStatus: Constants.IDLE,
    userError: 'Unknown Error Occured!',
    signOutStatus: Constants.IDLE,
    signOutError: 'Unknown Error Occured!',
  },
  reducers: {
    resetUserState: state => {
      state.userStatus = Constants.IDLE;
      state.signOutStatus = Constants.IDLE;
      state.userError = 'Unknown Error Occured!';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signIn.pending, (state, action) => {
        state.userStatus = Constants.LOADING;
      })
      .addCase(signIn.fulfilled, state => {
        state.userStatus = Constants.FULFILLED;
        state.user = getInitialUser();
      })
      .addCase(signIn.rejected, (state, action) => {
        state.userStatus = Constants.REJECTED;
        if (action.error.code === 'auth/user-not-found') {
          state.userError = 'No user found for the given credentials.';
        } else {
          action?.error?.message && (state.userError = action.error.message);
        }
      })
      .addCase(signUp.pending, (state, action) => {
        state.userStatus = Constants.LOADING;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.userStatus = Constants.FULFILLED;
        state.user = getInitialUser();
      })
      .addCase(signUp.rejected, (state, action) => {
        state.userStatus = Constants.REJECTED;
        if (action.error.code === 'auth/email-already-in-use') {
          state.userError = 'The email address is already in use.';
        } else {
          action?.error?.message && (state.userError = action.error.message);
        }
      })
      .addCase(signOut.pending, state => {
        state.signOutStatus = Constants.LOADING;
      })
      .addCase(signOut.fulfilled, state => {
        state.signOutStatus = Constants.FULFILLED;
        state.user = null;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.signOutStatus = Constants.REJECTED;
        action?.error?.message && (state.signOutError = action.error.message);
      });
  },
});

export const {resetUserState} = userSlice.actions;
export default userSlice.reducer;
```

```js
// chatMessageSlice.tsx
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Constants} from '../../settings/config';
import firestore from '@react-native-firebase/firestore';
import {
  SingleChatMessageType,
  FireStoreSingleChatMessageType,
} from '../../settings/types';

export const writeMessage = createAsyncThunk(
  'chatmessage/write',
  async (data: FireStoreSingleChatMessageType) => {
    await firestore().collection('Messages').add(data);
    return true;
  },
);

export const increaseLike = createAsyncThunk(
  'chatmessage/increaselike',
  async data => {
    firestore()
      .collection('Messages')
      .doc(data.item.docId)
      .update({
        likes: [...data.item.likes, data.uid],
      });
  },
);

const chatMessageSlice = createSlice({
  name: 'chatMessage',
  initialState: {
    writeMessageStatus: Constants.IDLE,
    chatMessages: [] as SingleChatMessageType[],
    writeMessageError: 'Something went wrong!',
  },
  reducers: {
    setChatMessages: (state, action) => {
      state.chatMessages = [...action.payload];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(writeMessage.pending, state => {
        state.writeMessageStatus = Constants.LOADING;
      })
      .addCase(writeMessage.fulfilled, state => {
        state.writeMessageStatus = Constants.FULFILLED;
      })
      .addCase(writeMessage.rejected, (state, action) => {
        state.writeMessageStatus = Constants.REJECTED;
        action?.error?.message &&
          (state.writeMessageError = action?.error?.message);
      });
  },
});

export const {setChatMessages} = chatMessageSlice.actions;
export default chatMessageSlice.reducer;
```

```js
// store.ts
import {configureStore, EnhancedStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import modalReducer from './slices/modalSlice';
import userReducer from './slices/userSlice';
import usersReducer from './slices/usersSlice';
import chatMessageReducer from './slices/chatMessageSlice';
import groupReducer from './slices/groupSlice';
import flashReducer from './slices/flashSlice';

import {signIn, signUp, signOut, resetUserState} from './slices/userSlice';
import {showModal, hideModal} from './slices/modalSlice';
import {
  writeMessage,
  setChatMessages,
  increaseLike,
} from './slices/chatMessageSlice';
import {
  createGroup,
  deleteGroup,
  resetGroupStatus,
  resetGroupDeletionStatus,
} from './slices/groupSlice';
import {showFlash, hideFlash} from './slices/flashSlice';

import {
  getAllUsers,
  resetUsersStatus,
  resetUsersData,
} from './slices/usersSlice';

const store = configureStore({
  reducer: {
    modalReducer,
    userReducer,
    usersReducer,
    chatMessageReducer,
    groupReducer,
    flashReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

const useAppDispatch = () => useDispatch<AppDispatch>();

export {
  signIn,
  signUp,
  signOut,
  resetUserState,
  showModal,
  hideModal,
  getAllUsers,
  resetUsersStatus,
  resetUsersData,
  writeMessage,
  setChatMessages,
  createGroup,
  deleteGroup,
  resetGroupStatus,
  resetGroupDeletionStatus,
  showFlash,
  hideFlash,
  increaseLike,
  useAppDispatch,
};

export default store;
```

```js
//GroupChatRoom.screen.tsx
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState, useRef} from 'react';
import {View, Image, Text, FlatList, TouchableOpacity} from 'react-native';
import CustomButton from '../components/CustomButton';
import people from '../assets/img/people.png';
import {Screens, ThemeColors} from '../settings/config';
import {shadows} from '../styles/shadows';
import LikeButton from '../components/LikeButton';
import {globalStyle} from '../styles/global';
import CustomTextInput from '../components/CustomTextInput';
import {
  increaseLike,
  setChatMessages,
  useAppDispatch,
  writeMessage,
} from '../redux/store';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {SingleChatMessageType} from '../settings/types';
import style from './ChatRoom.style';
import dateString from '../helpers/dateString';
import findMessageSentDetails from '../helpers/findMessageSentDetails';

const GroupChatRoom = () => {
  const [message, setMessage] = useState('');

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const {u} = useRoute().params;
  const {user} = useSelector((state: any) => state.userReducer);
  const {chatMessages} = useSelector((state: any) => state.chatMessageReducer);

  const ImageHeader = (props: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(Screens.VIEWGROUPMEMBERS, {
            members: u.members,
            uid: user.uid,
          });
        }}>
        <View style={globalStyle.headerTitleContainer}>
          <Image source={people} style={{width: 40, height: 40}} />
          <Text style={globalStyle.headerTitle}>{u.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: props => <ImageHeader {...props} />,
      headerTitleStyle: {flex: 1, textAlign: 'center'},
    });
  }, [u]);

  useEffect(() => {
    const firestoremessagecollection = firestore()
      .collection('Messages')
      .where('groupId', 'in', [u.uid]);

    return firestoremessagecollection.onSnapshot(querySnapshot => {
      if (querySnapshot !== null) {
        let result: SingleChatMessageType[] = [];
        querySnapshot.forEach(documentSnapshot => {
          const data = documentSnapshot.data();
          result.push({
            docId: documentSnapshot.id,
            ...data,
          });
        });
        result.sort((a, b) => a.createdAt - b.createdAt);
        dispatch(setChatMessages(result));
      }
    });
  }, []);

  const sendMessage = () => {
    if (message !== '') {
      dispatch(
        writeMessage({
          text: message,
          receivedId: u.uid,
          sentId: user.uid,
          createdAt: Date.now(),
          groupId: u.uid,
          likes: [],
        }),
      );
      setMessage('');
    }
  };

  const SingleChatMessage = ({item}) => {
    const increaseLikeByOne = () => {
      if (!(item.likes?.includes(user.uid) || item.sentId === user.uid)) {
        dispatch(increaseLike({item, uid: user.uid}));
      }
    };
    return item.sentId === user.uid ? (
      <View style={style.sentMessage}>
        <Text>{item.text}</Text>
        <LikeButton
          disabled={true}
          position={'right'}
          item={item}
          uid={user.uid}
          setValue={increaseLikeByOne}
        />
        <View style={style.rightTriangle}></View>
      </View>
    ) : (
      <View style={style.receivedMessage}>
        <Text style={{fontSize: 10, marginTop: -10, textAlign: 'right'}}>
          {findMessageSentDetails(JSON.parse(u.members), item.sentId) +
            ' on ' +
            dateString(item.createdAt)}
        </Text>
        <Text>{item.text}</Text>
        <LikeButton item={item} uid={user.uid} setValue={increaseLikeByOne} />
        <View style={style.leftTriangle}></View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, margin: 15}}>
        <FlatList
          data={chatMessages}
          inverted
          contentContainerStyle={{flexDirection: 'column-reverse'}}
          renderItem={item => <SingleChatMessage item={item.item} />}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          padding: 2,
          margin: 5,
          backgroundColor: '#fff',
          borderRadius: 20,
          ...shadows,
        }}>
        <View style={{flex: 1}}>
          <CustomTextInput
            value={message}
            setValue={setMessage}
            placeholder="Write Message Here"
            hideTitle={true}
            style={{borderRadius: 20}}
            w={'100%'}
          />
        </View>
        <View style={{marginLeft: 10}}>
          <CustomButton
            onPressFn={sendMessage}
            bgc={ThemeColors.primary}
            rightIcon="send"
          />
        </View>
      </View>
    </View>
  );
};

export default GroupChatRoom;
```

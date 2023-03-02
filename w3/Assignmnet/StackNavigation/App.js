import 'react-native-gesture-handler';
import React, {useState, useEffect } from 'react';
import { StyleSheet, Text, View,Button, TextInput,Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

function HomeScreen({ navigation, route }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen { route.params?.itemId}</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details', { itemId: 86, otherParam: 'anything you want here', name:"Details - Using params in the title" })}
      />
      <Button
        title="PostHomeScreen"
        onPress={() => navigation.navigate('PostHomeScreen', { itemId: 86, otherParam: 'anything you want here', })}
      />
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  const { itemId, otherParam } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push('Details', {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function PostHomeScreen({ navigation, route }) {
  console.log(route.params?.post);
  React.useEffect(() => {
    if (route.params?.post) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.post]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Go to CreatePostScreen"
        onPress={() => navigation.navigate('CreatePostScreen')}
      />
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
      <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
    </View>
  );
}

function CreatePostScreen({ navigation, route }) {
  const [postText, setPostText] = React.useState('');

  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: 'white' }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Done"
        onPress={() => {
          // Pass and merge params back to home screen
          navigation.navigate({
            name: 'PostHomeScreen',
            params: { post: postText },
            merge: true,
          });
        }}
      />
    </>
  );
}

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50, borderRadius:25 }}
      source={{ uri: `https://sonukr.in/assests/sonu-tree-bg-blur-color.png`}}
    />
  );
}


const MyStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'teal',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Overview" }} initialParams={{itemId:100}} />
      <Stack.Screen name="Details" component={DetailsScreen} options={({ route }) => ({ title: route.params.name })} />
      <Stack.Screen name="PostHomeScreen" component={PostHomeScreen} options={{
        title: 'PostHomeScreen',
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }} />
      <Stack.Screen name="CreatePostScreen" component={CreatePostScreen} options={{
        headerTitle: (props) => <LogoTitle {...props} />,
        headerRight: () => (
          <Button
            onPress={() => alert('This is a button!')}
            title="Info"
            color="black"
          />
        ),
      }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
});

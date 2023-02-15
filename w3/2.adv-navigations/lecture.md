
# Bottom Tabs Navigator

A simple tab bar on the bottom of the screen that lets you switch between different routes. Routes are lazily initialized -- their screen components are not mounted until they are first focused.

[Installation Guide](https://reactnavigation.org/docs/bottom-tab-navigator#installation)

## Example

```js
import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Import required screens

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

```

# Tab With Stack Navigation

```js
import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Import required screens

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createNativeStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="Details" component={DetailsScreen} />
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Settings" component={SettingsStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```

# Drawer Navigation

```js
import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
// Import required screens

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Notifications" component={Notifications} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}
```

# Bottom Tabs with Drawer Navigation

```js
import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Import required screens

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator >
      <Tab.Screen options={{headerShown: false}} name="Home" component={Feed} />
      <Tab.Screen options={{headerShown: false}} name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
    >
      <Drawer.Screen name="Home" component={MyTabs} />
      <Drawer.Screen name="Notifications" component={Notifications} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}
```

# Drawer with Bottom Tab and Stack Navigator


- App.js

```js
import React from 'react';
import {
  SafeAreaView,
  useColorScheme,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MyDrawer from './mydrawer/MyDrawer';

const App = () => {

  return (
    <SafeAreaView style={{flex:1}}>
      <NavigationContainer>
        <MyDrawer />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;

```

- MyDrawer.js

```js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import About from '../screens/About';
import BottomTab from '../bottomtab/BottomTab';
import Screen4 from '../screens/Screen4';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={BottomTab} />
      <Drawer.Screen name="About" component={About} />
      <Drawer.Screen name="Screen4" component={Screen4} />
    </Drawer.Navigator>
  );
}

export default MyDrawer;
```

- BottomTab.js

```js
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import About from '../screens/About';
import Screen3 from '../screens/Screen3';
import HomeStack from '../homestack/HomeStack';

const Tab = createBottomTabNavigator();
const BottomTab = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown:false, tabBarShowLabel: false, tabBarStyle:{backgroundColor:'green'} }}>
            <Tab.Screen name="Home2" component={HomeStack} options={{ tabBarIcon : () => <Feather name="home" size={32} color={'white'}/>}} />
            <Tab.Screen name="About" component={About}  options={{ tabBarIcon : () => <Feather name="airplay" size={32} color={'white'}/>}} />
            <Tab.Screen name="Screen" component={Screen3}  options={{ tabBarIcon : () => <Feather name="heart" size={32} color={'white'}/>}} />
        </Tab.Navigator>
    );
};
export default BottomTab;
```

- HomeStack.js

```js
import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import Screen3 from '../screens/Screen3';
import Home from '../screens/Home';

const Stack = createStackNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false}}>
      <Stack.Screen name="Home3" component={Home} />
      <Stack.Screen name="Screen3" component={Screen3} />
    </Stack.Navigator>
  );
};

export default HomeStack;
```





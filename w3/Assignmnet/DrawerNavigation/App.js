import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button,Image, Linking, Alert} from 'react-native';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem,  } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Feed Screen</Text>
        <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
        <Button title="Toggle drawer" onPress={() => navigation.toggleDrawer()} />
      </View>
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}



function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem label={() => (<Image source={{ uri: "https://sonukr.in/assests/sonu-tree-bg-blur-color.png" }} style={{ height: 100, width: 100, borderRadius: 50}} />
      )} onPress={() => Alert.alert("Profile pic")} />
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      />
      <DrawerItem
        label="Help"
        onPress={() => Linking.openURL('https://sonukr.in')}
      />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
  <>
      <Drawer.Navigator initialRouteName="Home"
        useLegacyImplementation
        screenOptions={{
          drawerStyle: {
            drawerType:"slide",
            backgroundColor: 'skyblue',
            width: 240,
          },
        }}
        drawerContent={(props) => <CustomDrawerContent {...props}
        />}
      >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
    </Drawer.Navigator>
  </>);
}

export default function App() {
  return (
    <NavigationContainer>
      <MyDrawer/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

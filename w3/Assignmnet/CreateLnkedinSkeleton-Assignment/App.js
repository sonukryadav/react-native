import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './Screens/Home';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from './Components/Header';
import MyNetwork from './Screens/MyNetwork';
import Posts from './Screens/Posts';
import Jobs from './Screens/Jobs';
import Notifications from './Screens/Notifications';




const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();


const MyTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'My Network') {
            iconName = focused ? 'people-sharp' : 'people-outline';
          } else if (route.name === 'Post') {
            iconName = focused ? 'md-add-circle-sharp' : 'md-add-circle-outline';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'ios-notifications-sharp' : 'ios-notifications-outline';
          } else if (route.name === 'Jobs') {
            iconName = focused ? 'md-briefcase' : 'md-briefcase-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        headerShown: false
      })
      }
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="My Network" component={MyNetwork} />
      <Tab.Screen name="Post" component={Posts} />
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="Jobs" component={Jobs} />
    </Tab.Navigator>
  );
}

// -----------------------------Drawer---------------------

function CustomDrawerContent({ ...props }) {
  const { navigation } = props;
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, justifyContent: 'flex-end' }}>
      <View style={{ flex: 1 }}>
        <DrawerItem
          label={() => (
            <View>
              <Image source={{ uri: `https://sonukr.in/assests/sonu-tree-bg-blur-color.png` }} style={{ height: 60, width: 60, borderRadius: 30 }} />
              <Text style={{ fontSize: 18, fontWeight: "800" }}>Sonu Kumar Yadav</Text>
              <Text style={{ marginTop: 7 }}>View profile</Text>
              <Text style={{ fontSize: 15, marginTop: 22 }}><Text style={{ fontWeight: 700 }}>120</Text> profile views</Text>
            </View>
          )}
          onPress={() => navigation.navigate("Home")}
        />
        <View style={{ borderBottomWidth: 0.5, borderColor: "gray", marginBottom: 30 }}></View>

        <DrawerItemList {...props} />
        <DrawerItem {...props}
          label={() => (<Text>Groups</Text>)}
          onPress={() => navigation.navigate("Home")}
        />
        <DrawerItem
          label={() => (
            <View>
              <Text>Events</Text>
            </View>
          )}
          onPress={() => navigation.navigate("Home")}
        />
      </View>

      <View style={{ borderBottomWidth: 0.5, borderColor: "gray", marginBottom: 15 }}></View>

      <View style={{}}>
        <DrawerItem
          icon={({ focused, color, size }) => <Ionicons style={{ marginRight: -25 }} color={color} size={25} name={focused ? 'heart' : 'heart-outline'} />}
          label={() => (
            <Text>Try premium for free</Text>
          )}
          onPress={() => navigation.navigate("Home")}
        />
        <DrawerItem
          icon={({ focused, color, size }) => <Ionicons style={{ marginRight: -25 }} color={color} size={25} name={focused ? 'settings' : 'settings-outline'} />}
          label={() => (
            <Text>Setting</Text>
          )}
          onPress={() => navigation.navigate("Home")}
        />
      </View>
    </DrawerContentScrollView>
  );
}


const MyDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: "left",
        drawerType: "back",
      }}
      defaultStatus={"closed"}
      drawerContent={(props) => (<CustomDrawerContent {...props} />)}
    >
      <Drawer.Screen name="Home" component={MyTab} options={{ headerShown: false }} />
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

const styles = StyleSheet.create({
});

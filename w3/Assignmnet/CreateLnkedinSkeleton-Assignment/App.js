import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinkedinHome from './LinkedinHome';
import { Head } from './LinkedinHome';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();


// -------------------------------Tab-----------------
const Home = ({ navigation}) => {
  return (<><LinkedinHome navigation={ navigation } /></>)
}

const MyNetwork = ({navigation}) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <Head navigation={navigation} />
      </ScrollView>
    </SafeAreaView>

  );
}

const Post = ({navigation}) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <Head navigation={navigation} />
      </ScrollView>
    </SafeAreaView>

  );
}

const Notification = ({ navigation }) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <Head navigation={navigation} />
      </ScrollView>
    </SafeAreaView>

  );
}

const Jobs = ({ navigation }) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <Head navigation={navigation} />
      </ScrollView>
    </SafeAreaView>

  );
}

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
        headerShown:false
      })
      }
    >
      <Tab.Screen name="Home" component={MyDrawer} />
      <Tab.Screen name="My Network" component={MyDrawer } />
      <Tab.Screen name="Post" component={Post} />
      <Tab.Screen name="Notifications" component={ MyDrawer } />
        <Tab.Screen name="Jobs" component={MyDrawer} />
    </Tab.Navigator>
  );
}

// -----------------------------Drawer---------------------

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label={() => (
          <View>
            <Image source={{ uri: `https://sonukr.in/assests/sonu-tree-bg-blur-color.png` }} style={{ height: 60, width: 60, borderRadius: 30 }} />
            <Text style={{fontSize:18, fontWeight:"800"}}>Sonu Kumar Yadav</Text>
          </View>
        )}
        onPress={()=>navigation.navigate("Home")}
      />
      <DrawerItemList {...props} />
      <DrawerItem
        label="Help"
        onPress={() => Linking.openURL('https://mywebsite.com/help')}
      />
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
      <Drawer.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Drawer.Screen name="My Network" component={MyNetwork} options={{ headerShown: false }} />
      <Drawer.Screen name="Post" component={Post} options={{ headerShown: false }} />
      <Drawer.Screen name="Notifications" component={Notification} options={{ headerShown: false }} />
      <Drawer.Screen name="Jobs" component={Jobs} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTab />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
});

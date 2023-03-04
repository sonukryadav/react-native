import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinkedinHome from './LinkedinHome';
import { createDrawerNavigator} from '@react-navigation/drawer';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const Home = () => {
  return(<><LinkedinHome /></>)
}

const MyNetwork = () => {
  
}

const Post = () => {
  
}

const Notification = () => {
  
}

const Jobs = () => {
  
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
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="My Network" component={MyNetwork} />
      <Tab.Screen name="Post" component={Post} />
      <Tab.Screen name="Notifications" component={Notification} />
      <Tab.Screen name="Jobs" component={Jobs} />
    </Tab.Navigator>
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

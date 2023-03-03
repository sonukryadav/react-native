import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator} from '@react-navigation/native-stack'

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function HomeScreen({ navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Settings')}
      >
        <Text style={styles.btn1}>Go to Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Notifications')}
      >
        <Text style={styles.btn1}>Go to Notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Details')}
      >
        <Text style={styles.btn1}>Go to Details</Text>
      </TouchableOpacity>
    </View>
  );
}

function SettingsScreen({ navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.btn1}>Go to Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Notifications')}
      >
        <Text style={styles.btn1}>Go to Notifications</Text>
      </TouchableOpacity>
    </View>
  );
}

function NotificationsScreen({ navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications!</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.btn1}>Go to Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Settings')}
      >
        <Text style={styles.btn1}>Go to Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

// Stack in Tab components

function DetailsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Details!</Text>
    </View>
  );
}

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createNativeStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="Details" component={DetailsScreen} />
    </SettingsStack.Navigator>
  );
}

const MyTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'ios-list' : 'ios-list-outline';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'notifications-circle' : 'notifications-circle-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name='Notifications' component={NotificationsScreen} options={{ tabBarBadge: 3 }} />
      <Tab.Screen name='StackInTab1' component={HomeStackScreen} />
      <Tab.Screen name='StackInTab2' component={SettingsStackScreen} />
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn1: {
    padding: 10,
    backgroundColor: "skyblue",
    borderRadius: 5,
    margin:10
  }
});

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import Home from './Home';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Settings Screen' }}
      />
    </Stack.Navigator>
  );
}

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Home Screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
        <Text>Go To Notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Text>Go To Profile</Text>
      </TouchableOpacity>
    </View>
  );
};
const NotificationsScreen = ({ navigation }) => {
  return (<View><Text>NotificationsScreen</Text>
    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
      <Text>Go To Home</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
      <Text>Go To Profile</Text>
    </TouchableOpacity>
  </View>);
};
const ProfileScreen = () => {
  return <Text>ProfileScreen</Text>;
};
const SettingsScreen = () => {
  return <Text>Home Screen</Text>;
};

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
      <SafeAreaView style={styles.container}>
        {/* <Home /> */}
        <StatusBar style="auto" />
      </SafeAreaView>
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

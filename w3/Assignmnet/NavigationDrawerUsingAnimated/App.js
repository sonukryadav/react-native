import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Animated, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import img1 from "./assets/rsz_me_bg_blur_tree.png";
import { AntDesign} from 'react-native-vector-icons';

// home, user, notification, download

const Nav = ({ title, iconName, fun}) => {
  return (
    <TouchableOpacity onPress={(p)=>fun(title)}>
      <View style={{flexDirection:"row", marginVertical:10, alignItems:"center"}}>
        <AntDesign name={iconName} color="white" size={25} style={{marginRight:10}}></AntDesign>
        <Text style={{color:"white", fontSize:22}}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function App() {
  const [n, setN] = React.useState('Home');
  const [y, setY] = React.useState(false);
  const s = React.useRef(new Animated.Value(0)).current;

  const ca = () => {
    if (s._value == 0) {
      Animated.spring(s, { toValue: 180 }).start();
      setY(!y);
    } else if(s._value==180) {
      Animated.spring(s, { toValue: 0 }).start();
      setY(!y);
    }
  }

  return (
    <SafeAreaView style={styles.view1}>
      <ScrollView style={styles.view2}>

        <View style={styles.view3}>
          <Image source={img1} style={{ width: 100, height: 100 }} />
          <Text style={{ fontSize: 25, color: "white" }}>Sonu kr.</Text>
          <Text style={{ color: "white" }}>View profile</Text>
          <Nav title="Home" iconName="home" fun={setN} />
          <Nav title="User" iconName="user" fun={setN} />
          <Nav title="Notification" iconName="notification" fun={setN} />
          <Nav title="Download" iconName="download" fun={setN} />
        </View>

        <Animated.View style={[styles.view4, { marginTop: s, marginLeft: s }]}>

          <TouchableOpacity onPress={() => ca()}>
            {!y ? < AntDesign name="bars" size={40} /> : <AntDesign name="close" size={40} /> }
          </TouchableOpacity>
            <Text style={{ fontSize: 25 }}>{n}</Text>
            <Text style={{ fontSize: 15 }}>
              In the provided code, the View components view3 and view4 have flex: 1 style applied to them. This means they will take up all the available space within their parent component. However, the ScrollView and SafeAreaView components, which are the parent components, do not have a fixed height specified.
              {'\n'}{'\n'}
              If a parent component does not have a fixed height specified, then the height of the child components with flex: 1 style will be calculated based on their content. In other words, the child components will only take up the necessary height needed to display their content.
            </Text>

        </Animated.View>

      </ScrollView>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  view1: {
    flex:1,
    backgroundColor: "red",
    padding:1,
    marginTop:30
  },
  view2: {
    flex:1,
    backgroundColor: "blue",
    padding: 1,
    zIndex: 5
  },
  view3: {
    flex:1,
    backgroundColor: "orange",
    padding: 4,
    zIndex: 1,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  view4: {
    flex:1,
    backgroundColor: "teal",
    padding: 14,
    zIndex: 1,
    position: "absolute",
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    borderWidth:5
  }
});

import * as React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, Platform, ScrollView, Button, Alert } from 'react-native';
import Constants from 'expo-constants';

// or any pure javascript modules available in npm
let interest = [
  {
    interest: "Traveling",
    selected: false
  },
  {
    interest: "Hiking",
    selected: false
  },
  {
    interest: "Music",
    selected: false
  },
  {
    interest: "concerts",
    selected: false
  },
  {
    interest: "Movies and TV shows",
    selected: false
  },
  {
    interest: "Reading",
    selected: false
  },
  {
    interest: "Photography",
    selected: false
  },
  {
    interest: "Food and cooking",
    selected: false
  },
  {
    interest: "Fitness",
    selected: false
  },
  {
    interest: "sports",
    selected: false
  },
  {
    interest: "Art",
    selected: false
  },
  {
    interest: "culture",
    selected: false
  },
  {
    interest: "Fashion",
    selected: false
  },
  {
    interest: "Technology",
    selected: false
  },
  {
    interest: "gadgets",
    selected: false
  },
  {
    interest: "Animals and pets",
    selected: false
  },
  {
    interest: "Video games",
    selected: false
  },
  {
    interest: "Dancing",
    selected: false
  },
  {
    interest: "nightlife",
    selected: false
  },
  {
    interest: "Meditation",
    selected: false,
  },
  {
    interest: "mindfulness",
    selected: false,
  },
  {
    interest: "Volunteering",
    selected: false,
  },
];

export default function App() {
  const [count, setCount] = useState(0);


  const countfun = (int) => {
    if (count < 5) {
      if (interest[int].selected) {
        interest[int].selected = false;
        setCount(count - 1);
      } else {
        interest[int].selected = true;
        setCount(count + 1);
      }

    }
  }

  const zero = () => {
    interest.map(val => {
      val.selected = false;
    })
    setCount(0);
  }

  return (
    <View style={styles.container1}>
      <ScrollView>
        <Text style={styles.text1}>Interests</Text>
        <Text style={styles.text2}>Let everyone know what you're passionate about by adding to your profile. </Text>
        <View style={styles.container2}>
          {
            interest.map((val, ind, array) => {
              return (
                <View style={[{ ...styles.text3 }, {}]}><Button title={val.interest} color={val.selected ? "teal" : "black"} onPress={() => countfun(ind)} /></View>
              );
            })
          }
        </View>
        <View style={count === 5 ? (styles.text5) : (styles.text4)}><Button title={count == 5 ? ("CONTINUE") : (`CONTINUE ${count}/5`)} color="black" onPress={() => { count === 5 ? Alert.alert("DONE!!!") : (Alert.alert("Select the 5 interest first")) }} /></View>

        <View style={[styles.text4, { borderColor: "red" }]}><Button title="Set count to 0" color="black" onPress={zero} /></View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    // justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'black',
    padding: 8,
    borderWidth: 1,
    borderColor: 'teal',
    marginTop: Platform.select({ android: 25, ios: 47, web: 10 }),
    borderRadius: 10,
  },
  container2: {
    // flex:1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'orange',
    margin: 15,
    marginTop: 30,
    padding: 5,
    borderRadius: 10,
  },
  text1: {
    color: 'white',
    fontSize: 40,
    borderWidth: 1,
    borderColor: 'orange',
    margin: 25,
    textAlign: 'center',
    borderRadius: 10,
  },
  text2: {
    color: 'white',
    textAlign: "center"
  },
  text3: {
    // flex:0.1,
    color: 'white',
    borderWidth: 1,
    borderColor: 'teal',
    borderRadius: 10,
    padding: 2,
    fontSize: 12,
    margin: 6,
    backgroundColor: "black"
  },
  text4: {
    fontSize: 30,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'white',
    backgroundColor: "grey",
    fontWeight: 8,
    margin: 30
  },
  text5: {
    fontSize: 40,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'red',
    backgroundColor: "powderblue",
    fontWeight: "bold",
    padding: 10,
    margin: 30,
  }
});

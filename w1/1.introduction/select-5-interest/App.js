import * as React from 'react';
import {useState} from 'react';
import { Text, View, StyleSheet, Platform, ScrollView, Button } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default function App() {
  const [count , setCount] = useState(0);
  const[color, setColor] = useState("");

  let interest = ["Traveling","Hiking","Music","concerts","Movies and TV shows",
"Reading","writing",
"Photography",
"Food and cooking",
"Fitness","sports",
"Art","culture",
"Fashion",
"Technology", "gadgets",
"Animals and pets",
"Video games",
"Dancing","nightlife",
"Meditation","mindfulness",
"Volunteering", "social causes",
"Wine","craft beer"
  ];

  const countfun = (int)=>{
    if(count<5){
      setCount(count+1);
      // setColor("teal")
    }
    // alert(`count : ${int}`)
  }

  return (
    <View style={styles.container1}>
      <ScrollView>
        <Text style={styles.text1}>Interests</Text>
        <Text style={styles.text2}>Let everyone know what you're passionate about by adding to your profile. </Text>
        <View style={styles.container2}>
        {
          interest.map((val, ind)=>{
            return(
              <View style={{...styles.text3, backgroundColor:color}}><Button title={val} color="white" onPress={(ind)=>countfun(ind)}/></View>
              );
          })
        }
        </View>
        <View style={count===5 ?(styles.text5):(styles.text4)}><Button title={count ==5 ?("CONTINUE"):(`CONTNUE ${count}/5`)} color="black" onPress={()=>{alert("DONE!!!")}} /></View>
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
    borderColor: 'orange',
    marginTop: Platform.select({android:25, ios:47, web:10}),
    borderRadius: 10,
  },
  container2: {
    // flex:1,
    flexDirection:'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'orange',
    margin: 15,
    marginTop:30,
    padding:5,
    borderRadius: 10,
  },
  text1: {
    color: 'white',
    fontSize: 40,
    borderWidth: 1,
    borderColor: 'orange',
    margin: 25,
    textAlign:'center',
    borderRadius: 10,
  },
  text2:{
    color:'white',
  },
  text3:{
    // flex:0.1,
    color:'white',
    borderWidth: 1,
    borderColor: 'teal',
    borderRadius: 10,
    padding:2,
    fontSize:12,
    margin:6,
  },
  text4:{
    fontSize:30,
    borderWidth:1,
    borderRadius:10,
    borderColor: 'white',
    backgroundColor:"grey",
    fontWeight:8
  },
  text5:{
    fontSize:40,
    borderWidth:1,
    borderRadius:10,
    borderColor: 'red',
    backgroundColor:"powderblue",
    fontWeight:"bold",
    padding:10
  }
});

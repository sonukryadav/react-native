import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import { storeData } from './storageHelper/storeData';
import { getData } from './storageHelper/getData';

export default function App(){
  const [count, setCount] = useState(0);
  const [st, setSt] = useState(-1);
  const [refreshing, setRefreshing] = useState(false);

  const counter = async ()=>{
    setCount(count + 1);
    storeData("counter", JSON.stringify(count));
  }

  const counterM = () => {
    setCount(count - 1);
    storeData("counter", JSON.stringify(count));
  }

  useEffect(() => {
    getData('counter').then(dt => {
      setSt(JSON.parse(dt));
    })
  }, [count])

  useEffect(() => {
    storeData("counter", JSON.stringify(0));
  },[0])


  const fresh1 = () => {
    console.log("Refreshing...");
    setRefreshing(true);
    setCount(0);
    setRefreshing(false);
    console.log("Refreshing finished.")
  }

  return (
    <>
      <SafeAreaView style={styles.view1}>
      <ScrollView refreshControl={
          <RefreshControl refreshing={ refreshing } onRefresh={fresh1} />
        }
      >
            <Text style={styles.text0}>Counter App</Text>
            <View style={styles.view2}>
              <TouchableOpacity style={styles.button1} onPress={counterM}>
                <Text style={{ ...styles.text2, textAlign: "center" }}>-1</Text>
              </TouchableOpacity>
              <Text style={styles.text1}>{count}</Text>
              <TouchableOpacity style={styles.button1} onPress={counter}>
                <Text style={{ ...styles.text2, textAlign:"center"}}>+1</Text>
              </TouchableOpacity>
            </View>
            <View>
            <Text style={{fontSize:20,padding:10, textAlign:"center", fontWeight:"800"}}> Data retrieving from local storage - previous value : { st}</Text>
            </View>
      </ScrollView>
      </SafeAreaView>
    </>
  );
}


const styles = StyleSheet.create({
  view1: {
    flex:1,
    backgroundColor:"teal",
    borderWidth:1,
    borderColorBottom:"black",
    textAlign:"center",
    marginTop:30
  },
  view2 : {
    borderWidth:2,
    borderColor:"white",
    padding:50,
  },
  text0: {
    textAlign:"center",
    fontSize:30,
    fontWeigth:'900',
  },
  text1:{
    fontSize:40,
    fontWeigth: 800,
    textAlign: "center",
    marginVertical:10
  },
  text2:{
    fontSize:20,
    color:"white"
  },
  button1:{
    borderWidth:2,
    padding:10,
    backgroundColor:"black",
    marginTop:30,
    borderRadius:20
  }

});
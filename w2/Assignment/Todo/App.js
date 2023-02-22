import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TextInput, TouchableOpacity, FlatList} from 'react-native';
import setData from './AsyncStorage/setData';
import getData from './AsyncStorage/getData';

export default function App() {
  const [todo, setTodo] = React.useState("");
  const [ss, setSs] = React.useState([]);

  let ar = ["jb", "ugub", "igyc"];

  const storeData = async () => {
    let ss1 = await getData("todo");
    setSs(ss1);
    console.log(ss1)
  }
  
  React.useEffect(async() => {
    storeData();
  }, []);

  const add = async() => {
    setData("todo", todo);
    
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

        <View>
          <Text style={{color:"black", fontSize:25, fontWeight:"800", textAlign:"center"}}>TODO APP</Text>
        </View>

        <View style={{flex:1, marginVertical:35}}>
          <TextInput
            placeholderTextColor="black"
            placeholder='Type...'
            value={todo}
            onChangeText={(val)=>setTodo(val)}
            style={{ flex: 1, height: 45, borderWidth: 1, padding: 5, fontSize: 20, paddingLeft: 10 }} />
        </View>

        <TouchableOpacity
          style={{ borderWidth: 1, backgroundColor: "black", borderRadius: 10, padding: 8 }}
          onPress={add}
        >
          <Text style={{ textAlign:"center", fontSize:20, fontWeight:"700", color:"white"}}>ADD</Text>
        </TouchableOpacity>

        <FlatList
          data={ss}
          renderItem={({ item }) => (<Text>{item}</Text>)}
          keyExtractor={(item) => item}
          style={{marginVertical:30}}
        />

        {/* <Text>{ ss[0]}</Text> */}

      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    paddingTop: 50,
    padding:30
  },
});

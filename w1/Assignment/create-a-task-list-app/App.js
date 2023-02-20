import * as React from 'react';
import { Text,TextInput, View, StyleSheet, SafeAreaView,ScrollView, TouchableOpacity, FlatList, RefreshControl, Alert} from 'react-native';

// On pulling down it should display a card on top having 2 buttons: add & delete.
//Pressing Add will add a task to the list and Pressing Delete will delete the first task from list.

const Button = ({title, fun})=>{
  return(
    <TouchableOpacity onPress={fun} >
    <Text style={styles.button1}>{title}</Text>
    </TouchableOpacity>
  );
}

var render = 1;
export default function App() {
  const [st, setSt] = React.useState(false);
  const [text, setText] = React.useState("");
  const [ar, setAr] = React.useState([]);
  let [count, setCount] = React.useState(1);
  const [refreshing, setRefreshing] = React.useState(false);
  let ad = "✏️ Click ADD button to add the task.";
  let de = "❌ Click DELETE button to delete the task.";

 React.useEffect(()=>{
   if(ar.length>0){
     setSt(true);
   }else{
     setSt(false);
   }
 },[ar.length])

  const add =()=>{
    ar.push(text);
    setAr(ar);
    setText("");
  }

  const delete1 =()=>{ 
    if(ar.length >0){
      ar.pop(text);
      setAr(ar);
      setCount(count+=1);
    }else{
      Alert.alert("Nothing to delete.");
    }
    
  }

  const onRefresh =()=>{
    setRefreshing(true);
    setText("");
    setAr([]);
    setSt(false);
    setCount(0);
    setTimeout(()=>{
      setRefreshing(false);
    },2000);
  }

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
    <View style={styles.view1}>
    </View>



    <View style={{backgroundColor:"black",margin:20,padding:10}}>
    <TextInput onChangeText={(txt)=>setText(txt)}
    style={{height:50, borderWidth:1, borderColor:"white",margin:30, fontSize:20,padding:10, color:"white", borderRadius:5}} 
    placeholder={"Type your task..."}
    placeholderTextColor="red"
    value={text}
    />
    <View style={styles.view2}>
    <Button title={"ADD"} fun={add}/>
    <Button title={"DELETE"} fun={delete1}/>
    </View>
    
    </View>
    <Text style={{fontSize:20, margin:20}}>{st ? de : ad }</Text>
    <FlatList 
    data={ar}
    renderItem={({item})=>(<Text>🔍 {item}</Text>)}
    keyExtractor={(item)=>item}
    style={{borderWidth:0.5, margin:15, borderColor:"black", backgroundColor:"teal", padding:10}}
    />
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 0,
    backgroundColor: '#ecf0f1',
    // padding: 8,
    borderWidth:1,
    borderColor:"black",
    borderRadius:10
  },
  view1:{
    borderwidth:1,
    backgroundColor:"teal",
    height:30
  },
  view2:{
    flex:1,
    flexDirection:"row",
    borderwidth:1,
    backgroundColor:"black",
    height:120,
    justifyContent:"space-around"
    
  },
  button1:{
    color:"white",
    fontSize:20,
    borderWidth:0.5,
    borderColor:"white",
    textAlign:"center",
    paddingVertical:5,
    width:120
  }
});

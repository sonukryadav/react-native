import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TextInput, TouchableOpacity, FlatList, Alert,Modal} from 'react-native';
import setData from './AsyncStorage/setData';
import getData from './AsyncStorage/getData';
import removeAllTask from './AsyncStorage/removeAllTask';


const EditModal = ({ modalState, closeModal, children }) => {

  return (
    <>
      <SafeAreaView>
        <Modal
          animationType={'slide'}
          transparent={true}
          visible={modalState}
          onRequestClose={closeModal}
        >
          <View style={{flex:1, borderWidth: 2, borderColor: "black", backgroundColor:"rgba(100,200,200,0.9)", paddingVertical:30, padding:30}}>
            <Text style={{textAlign:"center", fontSize:30, fontWeight:"800"}}>Edit your task</Text>
            { children}
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
}




export default function App() {
  const [todo, setTodo] = React.useState("");
  const [ss, setSs] = React.useState([]);
  const [modalState, setModalState] = React.useState(false);
  const [index, setIndex] = React.useState({});

  const storeData = async () => {
    let ss1 = await getData("todo");
    setSs(p=>ss1);
  }

  React.useEffect(() => {
    storeData();
  },[]);


  const add = React.useCallback(() => {
    if (!todo.trim()) {
      Alert.alert('Error', 'Please enter a todo');
      return;
    }
    let updatedArray = [...ss, {id: Date.now(), task:todo.trim(), completed:false}]
    setTodo('');
    setSs(updatedArray);
    setData("todo", updatedArray);
  }, [todo])

  const closeModal = () => {
    setModalState((modalState)=>!modalState);
  }

  const state =  {
    modalState,
    closeModal
  }


  const edit = ({ item }) => {
    setIndex(item);
    setTodo(item.task);
    setModalState(modalState => !modalState);
  }

  const save = () => {
    closeModal();
    const uTask = todo;
    let uItem = ss.map((item) => {
      if (item.id === index.id) {
        return { ...index, task: uTask };
      } else {
        return item;
      }
    });
    setSs(pre=>uItem);
    setData("todo", uItem);
    setTodo("");
  }


  const comp = ({item}) => {
    let uItem = ss.map((i) => {
      if (i.id === item.id) {
        return { ...i, completed: !item.completed };
      } else {
        return i;
      }
    });
    setSs(pre => uItem);
    setData("todo", uItem);
    setTodo("");
  }



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        nestedScrollEnabled={true}
        style={{
        padding: 30
      }}>

        <View>
          <Text style={{color:"black", fontSize:25, fontWeight:"800", textAlign:"center"}}>TODO APP</Text>
        </View>

        <View style={{ flex: 1, marginVertical: 35}}>
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
          <Text style={{ textAlign:"center", fontSize:20,  fontWeight:"700", color:"white"}}>ADD</Text>
        </TouchableOpacity>

        

        {ss.length == 0 ? (
          <TouchableOpacity onPress={() => { Alert.alert("Hey,", "No item in the task box.") }}>
          <Text
              style={{ ...styles.todoText, marginVertical: 30 }}>No task added</Text>
        </TouchableOpacity>
        ) : (
            <FlatList
          data={ss}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onLongPress={() => { edit({ item }) }}
              onPress={() => { comp({item}) }}
            >
                <Text
                style={[styles.todoText, !item.completed ? {} : { textDecorationLine: "line-through", backgroundColor:"rgba(11,11,11,0.6)"}]}>{item.task}</Text>
              </TouchableOpacity>
            )}
              keyExtractor={(item) => item.id.toString() }
          style={styles.flatList1}
        />
        )}

        <EditModal {...state} >
          <View style={{ borderWidth: 1, marginTop: 100, padding:30, backgroundColor:"white" }}>
            <TextInput
              placeholderTextColor="black"
              placeholder='Type...'
              value={todo}
              onChangeText={(val) => setTodo(val)}
              style={{ height: 45, borderWidth: 1, padding: 5, fontSize: 20, paddingLeft: 10, marginBottom:30 }}></TextInput>
            <TouchableOpacity
              style={{ borderWidth: 1, backgroundColor: "black", borderRadius: 10, padding: 8 }}
              onPress={save}
            >
              <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "700", color: "white" }}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </EditModal>

        <TouchableOpacity
          style={{ borderWidth: 1, backgroundColor: "black", borderRadius: 10, padding: 8 }}
          onPress={() => { removeAllTask("todo"); storeData(); }}
          disabled={ss.length == 0}
        >
        <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "700", color: "white" }}>Empty Storage</Text>
        </TouchableOpacity>

        <View style={{marginVertical:20}}>
          <Text>
            * To toggle for task status - onPress.{`\n`}
            * To edit any task - onLongPress</Text>
        </View>

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
    // padding:30
  },
  todoText: {
    borderWidth: 1,
    padding: 5,
    marginVertical: 5,
    textAlign: "center",
    fontWeight: "700",
    fontSize: 15,
  },
  flatList1: {
    marginVertical: 30,
    maxHeight: 300
  }
});

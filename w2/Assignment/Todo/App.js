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
            {/* <TouchableOpacity>
              <Text onPress={closeModal} style={{textAlign:"center"}}>Save</Text>
            </TouchableOpacity> */}
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

  const storeData = async () => {
    let ss1 = await getData("todo");
    setSs(ss1);
  }

  React.useEffect(() => {
    storeData();
  }, [ss, todo]);

  const add = React.useCallback(() => {
    setData("todo", todo);
    storeData();
    setTodo("");
  }, [todo])

  const closeModal = () => {
    setModalState((modalState)=>!modalState);
  }

  const state =  {
    modalState,
    closeModal
  }


  const edit = () => {
    setModalState(modalState=>!modalState);
  }

  const update = () => {
    closeModal();
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
          disabled={ todo.length==0}
        >
          <Text style={{ textAlign:"center", fontSize:20,  fontWeight:"700", color:"white"}}>ADD</Text>
        </TouchableOpacity>


          <FlatList
          data={ss.length==0 ? ["No task added"] : ss}
          renderItem={({ item }) => (
              <TouchableOpacity onLongPress={edit}>
                <Text
                  style={styles.todoText}>{item}</Text>
              </TouchableOpacity>
            )}
          keyExtractor={(item) => item.toString()}
          style={styles.flatList1}
        />

        <EditModal {...state}>
          <View style={{ borderWidth: 1, marginTop: 100, padding:30, backgroundColor:"white" }}>
            <TextInput
              placeholderTextColor="black"
              placeholder='Type...'
              value={todo}
              onChangeText={(val) => setTodo(val)}
              style={{ height: 45, borderWidth: 1, padding: 5, fontSize: 20, paddingLeft: 10, marginBottom:30 }}></TextInput>
            <TouchableOpacity
              style={{ borderWidth: 1, backgroundColor: "black", borderRadius: 10, padding: 8 }}
              onPress={update}
              disabled={todo.length == 0}
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

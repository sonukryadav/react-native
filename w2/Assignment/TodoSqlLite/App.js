import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TextInput, TouchableOpacity, FlatList, Alert, Modal } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Octicons, MaterialCommunityIcons } from 'react-native-vector-icons';
import Dialog from 'react-native-dialog';

const db = SQLite.openDatabase('sonuTodos.db');
const tbl = 'todoListTable1';


const generalExecuteSql = (db, query, params = []) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        query,
        params,
        (tx, result) => resolve(result),
        (e) => reject(e));
    });
  });
}


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
  const [dialogVisible, setDialogVisible] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');



  React.useEffect(() => {
    generalExecuteSql(db, `CREATE TABLE IF NOT EXISTS ${tbl} (id INTEGER PRIMARY KEY AUTOINCREMENT, task VARCHAR(100), completed BOOLEAN)`)
      .then((result) => console.log("Success :-->", result) )
      .catch((e) => console.log("Failure :-->", e));
  },[])

  React.useEffect(() => {
    generalExecuteSql(db, `SELECT * FROM ${tbl}`)
      .then((data) => {
        console.log("Table data :----> ", data?.rows?._array);
        setSs(data?.rows?._array);
      })
      .catch((err) => console.log("Failed in retrieving table data", data));
  },[]);


  const add = React.useCallback(() => {
    if (!todo.trim()) {
      Alert.alert('Hey', '📝 Please enter your task.');
      return;
    }
    let updatedArray = [...ss, { id: ss.length+1, task: todo.trim(), completed: false }]
    setTodo('');
    setSs(updatedArray);
    addTaskSql();
  }, [todo]);


  const addTaskSql = () => {
    let todoT = todo.trim();
    generalExecuteSql(db, `INSERT INTO ${tbl} (task, completed) VALUES (?, ?)`, [todoT , 0])
      .then((tx) => {
        console.log("Successfully inserted data to table :---->", tx);

        generalExecuteSql(db, `SELECT * FROM ${tbl}`)
          .then((data) => {
            console.log("Table data :----> ", data?.rows?._array);
          })
          .catch((err) => console.log("Failed in retrieving table data", data));
      })
      .catch((err) => console.log("Failure while inserting data to table :--->", err));
  }



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
    generalExecuteSql(db, `UPDATE ${tbl} SET task=? WHERE id=?;`, [uTask, index.id])
      .then(() => console.log("Updated the task."))
    .catch((err)=>console.log("Failed in update ", err))
    setTodo("");
  }



  const comp = ({item}) => {
    let uItem = ss
    ?.map((i) => {
      if (i.id === item.id) {
        return { ...i, completed: !item.completed };
      } else {
        return i;
      }
    });
    setSs(pre => uItem);
    generalExecuteSql(db, `UPDATE ${tbl} SET completed = ? WHERE id = ?`, [!item.completed, item.id])
      .then((data) => {
        console.log("status Updated");
      })
      .catch((err) => console.log("Failed in updating table data :---> ", data));
    setTodo("");
  }


  const dropTable = () => {
    generalExecuteSql(db, `DROP TABLE IF EXISTS ${tbl};`, [])
      .then((result) => {
        console.log("Table dropped successfully.");
        setSs([]);
        setTodo('');
      })
    .catch((err) => console.log("Failed to drop table", err));
  }

  const singleDelete = () => {
    setDialogVisible((prev) => true);
  }



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        nestedScrollEnabled={true}
        style={{
        padding: 30
      }}>

        <View style={{flex:1, flexDirection:"row", justifyContent:"center", alignItems:"center", }}>
          <Octicons name="tasklist" size={30} color="green" />
          <Text style={{ color: "black", fontSize: 25, fontWeight: "800", marginLeft:10}}>
            TODO APP
          </Text>
        </View>

        <View style={{ flex: 1, marginVertical: 35}}>
          <TextInput
            placeholderTextColor="black"
            placeholder='Type...🖊️ '
            value={todo}
            onChangeText={(val)=>setTodo(val)}
            style={{ flex: 1, height: 45, borderWidth: 1, padding: 5, fontSize: 20, paddingLeft: 10 }} >
            </TextInput>
        </View>

        <TouchableOpacity
          style={{ borderWidth: 1, backgroundColor: "black", borderRadius: 10, padding: 8 }}
          onPress={add}
        >
          <Text style={{ textAlign:"center", fontSize:20,  fontWeight:"700", color:"white"}}>ADD</Text>
        </TouchableOpacity>



        {ss.length == 0 ? (
          <TouchableOpacity onPress={() => { Alert.alert("Hey,", "🗑️ No task in the task box.") }}>
          <Text
              style={{ ...styles.todoText, marginVertical: 30 }}>No task added</Text>
        </TouchableOpacity>
        ) : (
            <FlatList
          data={ss}
          renderItem={({ item, index }) => (
            <View style={{flex:1, flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
              <TouchableOpacity style={{flex:1}}
              onLongPress={() => { edit({ item }) }}
              onPress={() => { comp({item}) }}
            >
                <Text
                style={[styles.todoText, !item.completed ? {} : { textDecorationLine: "line-through", backgroundColor:"rgba(11,11,11,0.6)"}]}>{item.task}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>singleDelete()}>
                <MaterialCommunityIcons name="delete" size={40} color="red" />
              </TouchableOpacity>
              </View>
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


        <Dialog.Container visible={dialogVisible}>
          <Dialog.Title>Enter a value</Dialog.Title>
          <Dialog.Button label="Cancel" onPress={() => setDialogVisible((p) => !p)} />
          <Dialog.Button label="Ok" onPress={()=>setDialogVisible((p)=>!p)} />
        </Dialog.Container>

        <TouchableOpacity
          style={{ borderWidth: 1, backgroundColor: "black", borderRadius: 10 }}
          onPress={() => { dropTable(); }}
          disabled={ss.length == 0}
        >
          <View style={{flex:1, flexDirection:"row", justifyContent:"center", alignItems:"center", padding:8}}>
            <MaterialCommunityIcons name="delete-circle" size={32} color="white" />
            <Text style={{fontSize: 20,textAlign: "center",  fontWeight: "700", color: "white", marginLeft:7}}>Delete all tasks</Text>
          </View>
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

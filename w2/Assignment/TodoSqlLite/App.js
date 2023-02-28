import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { RefreshControl,Linking, Image,StyleSheet, Text, View, SafeAreaView, ScrollView, TextInput, TouchableOpacity, FlatList, Alert, Modal, Vibration } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Octicons, MaterialCommunityIcons } from 'react-native-vector-icons';
import Dialog from 'react-native-dialog';
import sonu1 from './assets/sonu1.png';

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
          <View style={{flex:1, borderWidth: 2, borderColor: "black", backgroundColor:"rgba(0,0,0,0.9)",  paddingHorizontal:30, justifyContent:"center"}}>
            <Text style={{textAlign:"center", fontSize:30, fontWeight:"800"}}>Edit your task</Text>
            { children}
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
}


const DialogCompo = ({status3, title3, noLabel, noFun, ysLabel, ysFun}) => {
  return (
    <>
      <Dialog.Container visible={status3}>
        <Dialog.Title><Text style={{color:"black"}}>{title3}</Text></Dialog.Title>
        <Dialog.Button label={noLabel} onPress={noFun} />
        <Dialog.Button label={ysLabel} onPress={ysFun} />
      </Dialog.Container>
    </>
  );
}


export default function App() {
  const [todo, setTodo] = React.useState("");
  const [ss, setSs] = React.useState([]);
  const [modalState, setModalState] = React.useState(false);
  const [index, setIndex] = React.useState({});
  const [dialogVisible, setDialogVisible] = React.useState({
    show: false,
    delete1: false
  });
  const [toDelete, setToDelete] = React.useState({});
  const [deleteTable, setDeleteTable] = React.useState({
    show: false,
    delete1: false
  });
  const [refreshing, setRefreshing] = React.useState(false);



  React.useEffect(() => {
    generalExecuteSql(db, `CREATE TABLE IF NOT EXISTS ${tbl} (id INTEGER PRIMARY KEY AUTOINCREMENT, task VARCHAR(100), completed BOOLEAN)`)
      .then((result) => console.log("Success :-->", result))
      .catch((e) => console.log("Failure :-->", e));
  }, [])

  React.useEffect(() => {
    generalExecuteSql(db, `SELECT * FROM ${tbl}`)
      .then((data) => {
        console.log("Table data :----> ", data?.rows?._array);
        setSs(data?.rows?._array);
      })
      .catch((err) => console.log("Failed in retrieving table data", data));
  }, []);


  const add = React.useCallback(() => {
    Vibration.vibrate(100)
    if (!todo.trim()) {
      Alert.alert('Hey', '📝 Please enter your task.');
      return;
    }
    let updatedArray = [...ss, { id: ss.length + 1, task: todo.trim(), completed: false }]
    setTodo('');
    setSs(updatedArray);
    addTaskSql();
  }, [todo]);


  const addTaskSql = () => {
    let todoT = todo.trim();
    generalExecuteSql(db, `INSERT INTO ${tbl} (task, completed) VALUES (?, ?)`, [todoT, 0])
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
    setModalState((modalState) => !modalState);
    setTodo("");
  }

  const state = {
    modalState,
    closeModal
  }


  const edit = ({ item }) => {
    setIndex(item);
    setTodo(item.task);
    setModalState(modalState => !modalState);
  }

  const save = () => {
    Vibration.vibrate(100)
    closeModal();
    const uTask = todo;
    let uItem = ss.map((item) => {
      if (item.id === index.id) {
        return { ...index, task: uTask };
      } else {
        return item;
      }
    });
    setSs(pre => uItem);
    generalExecuteSql(db, `UPDATE ${tbl} SET task=? WHERE id=?;`, [uTask, index.id])
      .then(() => console.log("Updated the task."))
      .catch((err) => console.log("Failed in update ", err))
    setTodo("");
  }



  const comp = ({ item }) => {
    Vibration.vibrate(150);
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


  const deleteCancel = () => {
    setDeleteTable({ delete1: false, show: false });
  }

  const deleteOkay = () => {
    generalExecuteSql(db, `DROP TABLE IF EXISTS ${tbl};`, [])
      .then((result) => {
        console.log("Table dropped successfully.");
        setSs([]);
        setTodo('');
      })
      .catch((err) => console.log("Failed to drop table", err));
    setDeleteTable({ delete1: false, show: false });
  }


  const dropTable = () => {
    Vibration.vibrate(500)
    setDeleteTable((prev) => ({ ...prev, show: true }));
  }

  const singleDelete = ({ item }) => {
    Vibration.vibrate(200)
    setToDelete((p) => item);
    setDialogVisible((prev) => ({ ...prev, show: true }));
  }

  const cancel = () => {
    setDialogVisible({ delete1: false, show: false });
    setToDelete((p) => { });
  }

  const okay = () => {
    setDialogVisible({ delete1: true, show: false });
    let ar = ss.filter((it, ind) => it.id !== toDelete.id);
    updateDb(toDelete);
    setSs((p) => ar);
    setToDelete((p) => { });
    setDialogVisible({ delete1: false, show: false });
    console.log("f");
  }

  const updateDb = async (del) => {
    generalExecuteSql(db, `DELETE FROM ${tbl} WHERE id=?;`, [`${del.id}`])
      .then(() => console.log(`Row ${del.id} deleted successfully.`))
      .catch((err) => console.log(`Row ${del.id} deletion failed.`))
  }


  const sonuTouch =React.useCallback(async() => {
    let url = `https://sonukr.in/`;
    let supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
    else {
      Alert.alert("Hey,", "It seems that there is some issue with server. \n Please try again later.")
    }

  },[])

  const onRefresh = React.useCallback(async () => {
    Vibration.vibrate(150);
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  },[]);


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        nestedScrollEnabled={true}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            title="sonu"
            // size={"30"}
            colors={["green", "red", "black"]}
            progressBackgroundColor={"white"}
            progressViewOffset={50}
          />
        }
        style={{
          padding: 30,
          flex:1,
      }}>

        <View style={{flex:1, flexDirection:"row", justifyContent:"center", alignItems:"center", }}>
          <Octicons name="tasklist" size={35} color="green" style={{ marginRight: 10 }} />
          <Text style={styles.topHeading}>
            TODO APP
          </Text>
          <Octicons name="tasklist" size={35} color="green" style={{marginLeft:10}} />
        </View>

        <View style={{ flex: 1, marginVertical: 35}}>
          <TextInput
            placeholderTextColor="black"
            placeholder='Type...🖊️ '
            value={todo}
            onChangeText={(val)=>setTodo(val)}
            style={{ flex: 1, height: 45, borderWidth: 1, padding: 5, fontSize: 20, paddingLeft: 10, borderRadius:5 }} >
            </TextInput>
        </View>

        <TouchableOpacity
          style={{ borderWidth: 1, backgroundColor: "black", borderRadius: 10 }}
          onPress={add}
        >
          <View style={styles.addAndDeleteAllButtonView}>
            <Octicons name="diff-added" size={25} color="white" />
            <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "700", color: "white", marginLeft: 7 }}>ADD</Text>
          </View>
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
            <View style={styles.flatListView1}>
              <TouchableOpacity style={{flex:1}}
              onLongPress={() => { edit({ item }) }}
              onPress={() => { comp({item}) }}
            >
                <Text
                style={[styles.todoText, !item.completed ? {} : { textDecorationLine: "line-through", backgroundColor:"rgba(11,11,11,0.5)", borderColor:"red"}]}>{item.task}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>singleDelete({item})}>
                <MaterialCommunityIcons name="delete" size={40} color="red" />
              </TouchableOpacity>
              </View>
            )}
              keyExtractor={(item) => item.id.toString()}
              nestedScrollEnabled={true}
          style={styles.flatList1}
        />
        )}

        <EditModal {...state} >
          <View style={{ borderWidth: 1, padding:30, backgroundColor:"white" }}>
            <TextInput
              placeholderTextColor="black"
              placeholder='Type...'
              value={todo}
              onChangeText={(val) => setTodo(val)}
              style={{ height: 70, borderWidth: 1, padding: 4, fontSize: 20, paddingLeft: 10, marginBottom:30, borderRadius:10 }}></TextInput>
            <TouchableOpacity
              style={{ borderWidth: 1, backgroundColor: "black", borderRadius: 10, padding: 8 }}
              onPress={save}
            >
              <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "700", color: "white" }}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </EditModal>

        <DialogCompo
        status3={dialogVisible.show}
        title3={"Do you want to delete?"}
        noLabel={"No"}
        noFun={cancel}
        ysLabel={"Yes"}
        ysFun={okay}  />

        <TouchableOpacity
          style={{ borderWidth: 1, backgroundColor: "black", borderRadius: 10 }}
          onPress={() => { dropTable(); }}
          disabled={ss.length == 0}
        >
          <View style={styles.addAndDeleteAllButtonView}>
            <MaterialCommunityIcons name="delete-circle" size={32} color="white" />
            <Text style={{fontSize: 20,textAlign: "center",  fontWeight: "700", color: "white", marginLeft:7}}>Delete all tasks</Text>
          </View>
        </TouchableOpacity>

        <DialogCompo
          status3={deleteTable.show}
          title3={"Do you want to delete all the task?"}
          noLabel={"No"}
          noFun={deleteCancel}
          ysLabel={"Yes"}
          ysFun={deleteOkay} />

        <View style={{marginVertical:35}}>
          <Text>
            * To toggle for task status - onPress.{`\n`}
            * To edit any task - onLongPress</Text>
        </View>

      </ScrollView>

        <View style={{flex:0, padding:5}}>
        <TouchableOpacity onPress={sonuTouch}>
          <Image source={sonu1} style={{ width: 50, height: 50, borderRadius: 50, alignSelf:"center" }} />
          <Text style={{ fontWeight: "600", textAlign: "center", fontSize:10 }}>Sonu kr.</Text>
          <Text style={{textAlign:"center", fontSize:8}}>React Native Developer</Text>
        </TouchableOpacity>
        </View>

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
  topHeading: {
    color: "black",
    fontSize: 30,
    fontWeight: "800",
    textShadowOffset: { width: 2, height: 5 },
    textShadowRadius: 5,
    textShadowColor: 'grey'
  },
  todoText: {
    borderWidth: 0.5,
    padding: 5,
    marginVertical: 5,
    textAlign: "center",
    fontWeight: "800",
    fontSize: 17,
    borderRadius: 10,
    backgroundColor:"rgba(101,255,255,0.3)",
  },
  flatList1: {
    marginVertical: 30,
    maxHeight:331,
  },
  addAndDeleteAllButtonView:{
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  flatListView1: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  }

});

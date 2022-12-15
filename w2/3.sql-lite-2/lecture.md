import { openDatabase } from 'expo-sqlite';
import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const color = 'rgb(20,20,20)';

const db = openDatabase("subrat.db");

// db.transaction(txn => {
//   txn.executeSql(query, params, successfully(), error())
// })



export function ExecuteSql(db, query, params=[]) {
  return new Promise((resolve, reject) => {
    db.transaction(txn => {
      txn.executeSql(
        query,
        params,
        (tx, res) => resolve(res),
        e => reject(e),
      );
    });
  });
}

export default function App() {
  const [todos, setTodos] = useState([])
  const [val, setVal] = useState('');

  const pullDataFromTable = () => {
    ExecuteSql(db, 'SELECT * FROM todotable').then(res => {
      console.log(res);
      const {rows:{_array}} = res;
      console.log("rows:", _array)
      setTodos(_array);
    })
  }

  useEffect(()=>{
    ExecuteSql(
      db,
      `CREATE TABLE IF NOT EXISTS todotable(id INTEGER PRIMARY KEY AUTOINCREMENT, task VARCHAR(20), status INTEGER(1))`,
    ).then(t => console.log(t))
    .catch(e => console.log("Error creating table"))  
    pullDataFromTable();
  },[])

  const addTask = () => {
    ExecuteSql(db, 'INSERT INTO todotable (task, status) VALUES (?,?)', [val, 0,])
    .then(async res => {
      console.log(res, `Inserted :${res.insertId}`);
      let data = await ExecuteSql(
        db,
        `SELECT * FROM todotable WHERE id=${res.insertId}`,
      );
      setTodos(prev => [...prev, data.rows.item(0)]);
      setVal('');
    })
    .catch(e => {
      console.log("Error:", e)
    });    
    //setTodos(prev => [...prev,{id: Math.random() , task:val, status:0}])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SQLite Task List</Text>
      <View style={styles.inputContainer}>
        <TextInput style={[styles.input, styles.border]} 
          value={val}
          onChangeText={(t) => setVal(t)}
        />
        <TouchableOpacity style={[styles.caret, styles.border]}
          onPress={addTask}
        >
        <AntDesign 
          name='caretright' 
          color={color} 
          size={32} 
          />
        </TouchableOpacity>
      </View>
      {
        todos.map(todo => <SingleTask todo={todo} key={todo.id}/>)
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 25,
  },
  title : {
    fontSize: 25,
    textAlign:'center'
  },
  border:{
    borderWidth: 1,
    borderColor: color,
    borderRadius: 5
  },
  todo:{   
    padding:5,
    margin:5,
  },
  input:{
    flex:1,
    margin:5,
    padding:3,
  },
  inputContainer: {
    flexDirection:'row',
    alignItems:'center'
  },
  caret:{
    marginRight:5
  }
});

const SingleTask = ({todo}) => {
  return(<View>
    <Text style={[styles.todo, styles.border]}>{todo.task}</Text>
  </View>)
}

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {
  const [resultText, setResultText] = useState("");
  const [calculationText, setCalculationText] = useState("");
  const operations = ['+M', '-M', 'DEL', '+', '-', '*', '/', 'Mc'];
  const [storage, setStorage] = useState([]);
  const [index, setIndex] = useState(storage.length-1);

  let storage_key = "res";

  function calculateResult() {
    const text = resultText;
    setCalculationText(eval(text));
    // setResultText("");
  }


  const ds = async () => {
    try {
    let data = await AsyncStorage.getItem(storage_key) || "[]";
    let data1 = data == [] ? [] : JSON.parse(data);
    setIndex(data1.length-1);
    setStorage(data1);
    } catch (err) {
      console.log(err.message);
    }
  }



  // console.log(storage);
  // console.log("index : " + index);


  useEffect( () => {
    ds();
  }, []);

  function validate() {
    const text = resultText;
    switch (text.slice(-1)) {
      case '+':
      case '-':
      case '*':
      case '/':
        return false;
    }
    return true;
  }

  function buttonPressed(text) {
    if (text == '=') {
      if (validate()) {
        if (resultText == '') {
          return;
        }
        calculateResult();
        setIndex(storage.length-1);
        set();
        return;
      }
    }
    setResultText(resultText + text);
  }

  async function set() {
    let st1 = {};
    st1.cal = resultText;
    st1.res = eval(resultText);
    setResultText("");
    // console.log(st1)
    setStorage(p => [...p, st1]);
    // console.log(storage);
    await AsyncStorage.setItem(storage_key, JSON.stringify([...storage,st1]));

  }

  // console.log(storage);

  function operate(operation) {
    switch (operation) {
      case 'DEL':
        let text = resultText.split('');
        text.pop();
        setResultText(text.join(''));
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        const lastChar = resultText.split('').pop();
        if (operations.indexOf(lastChar) > 0) return;
        if (resultText == "") return;
        setResultText(resultText + operation);
        break;
      case '+M': {
        if (index == storage.length-1) break;
        if (index < storage.length) {
          let obj = storage[index+1];
          // console.log(obj);
          setResultText(obj.cal);
          setCalculationText(obj.res);
          if (index + 1 != storage.length) {
            setIndex(i => i + 1);
            // console.log("+M");
          }
        }
       
        break;
      }
      case '-M': {
        // console.log("-M");
        if (index == -1) break;
        if (index >= 0) {
          let obj = storage[index];
          setResultText(obj.cal);
          setCalculationText(obj.res);
          console.log(obj);
          if (index-1 != -1) {
            setIndex(i => i - 1);
          }
        }
        console.log("-M");
        break;
      }
      case 'Mc': {
        del();
        console.log("Mc");
        break;
        
        }
    }
  }
  const del = async () => {
    try {
      let de = await AsyncStorage.removeItem(storage_key);
      setStorage([]);
      setResultText("");
      setCalculationText("");
      setIndex(-1);
    } catch (err) {
      console.log(err);
    }

  }

  let rows = [];
  let nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [".", 0, "=",]];

  for (let i = 0; i < 4; i++) {
    let row = [];
    for (let j = 0; j < 3; j++) {
      row.push(
        <TouchableOpacity key={nums[i][j]} onPress={() => buttonPressed(nums[i][j])} style={styles.btn}>
          <Text style={styles.btnText}>{nums[i][j]}</Text>
        </TouchableOpacity>
      );
    }
    rows.push(<View key={i} style={styles.row}>{row}</View>);
  }

  let ops = [];
  for (let i = 0; i < operations.length; i++) {
    ops.push(
      <TouchableOpacity key={operations[i]} onPress={() => operate(operations[i])} style={styles.btn}>
        <Text style={[styles.btnText, styles.white]}>{operations[i]}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>

      <View style={styles.result}>
        <Text style={styles.resultText}>{resultText}</Text>
      </View>

      <View style={styles.calculation}>
        <Text style={styles.calculationText}>{calculationText}</Text>
      </View>

      <View style={styles.buttons}>
        <View style={styles.numbers}>{rows}</View>
        <View style={styles.operations}>{ops}</View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0E0E0",
  },
  row: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  resultText: {
    fontSize: 50,
    color: "black",
  },
  calculationText: {
    fontSize: 35,
    color: "black",
  },
  btn: {
    flex: 1,
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "center",
  },
  btnText: {
    fontSize: 30,
    color: "white",
  },
  white: {
    color: "white",
  },
  result: {
    flex: 2,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 20,
  },
  calculation: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 20,
  },
  buttons: {
    flex: 7,
    flexDirection: "row",
  },
  numbers: {
    flex: 3,
    backgroundColor: "#434343",
  },
  operations: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#636363",
  },
});


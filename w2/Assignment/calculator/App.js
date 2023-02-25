import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  const [resultText, setResultText] = useState("");
  const [calculationText, setCalculationText] = useState("");
  const operations = ['DEL', '+', '-', '*', '/'];

  function calculateResult() {
    const text = resultText;
    setCalculationText(eval(text));
    setResultText("");
  }

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
      return validate() && calculateResult();
    }
    setResultText(resultText + text);
  }

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


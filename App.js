/*
Extend your Calculator app from the assignment 1:

    Add FlatList component that shows the calculation history. 

Note! Data is not saved persistently. When the app is restarted the history is cleared.
*/
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function App() {
  const [resultText, setResultText] = useState("Insert two numbers");
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [operation, setOperation] = useState("");
  const [data, setData] = useState([]);

  const handleOperation = (operationSign) => {
    let firstNum = parseFloat(first);
    let secondNum = parseFloat(second);
    let operation;

    if (isNaN(firstNum) || isNaN(secondNum)) {
      setResultText(
        "One or both inputs are not numbers. Please insert two numbers."
      );
    } else {
      if (operationSign === "+") {
        // setState is asynchronous
        // so rest of the code is exectued before operation state has changed
        // either use let firstNum = parseFloat(first) ecc...
        // or check the default react page with the incremental clicker
        operation = firstNum + secondNum;
      } else {
        operation = firstNum - secondNum;
      }

      setResultText(`Result is: ${operation}`);
      setData([
        ...data,
        { key: `${first} ${operationSign} ${second} = ${operation}` },
      ]);
      resetFields();
    }
  };

  const resetFields = () => {
    setFirst("");
    setSecond("");
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>{resultText}</Text>
        <StatusBar style="auto" />
      </View>
      <View>
        <TextInput
          inputMode="numeric"
          value={first}
          style={{ width: 200, borderColor: "gray", borderWidth: 1 }}
          onChangeText={(text) => setFirst(text)}
        />
      </View>
      <View>
        <TextInput
          value={second}
          inputMode="numeric"
          style={{ width: 200, borderColor: "gray", borderWidth: 1 }}
          onChangeText={(text) => setSecond(text)}
        />
      </View>
      <View style={styles.buttons}>
        <Button onPress={() => handleOperation("+")} title="+"></Button>
        <Button onPress={() => handleOperation("-")} title="-"></Button>
        <Button onPress={() => setData([])} title="CLEAR"></Button>
      </View>
      <View style={{ flex: 7 }}>
        <Text>History:</Text>
        <FlatList
          // defines where data comes from. must be array
          data={data}
          // defines how data items are rendered
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text>{item.key}</Text>
            </View>
          )}
          // extract a unique key for each item
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "15%",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  listItem: {
    padding: 5,
    backgroundColor: "lightblue",
    justifyContent: "center",
    width: 300,
    // margin: 5,
    flexDirection: "row",
  },
});

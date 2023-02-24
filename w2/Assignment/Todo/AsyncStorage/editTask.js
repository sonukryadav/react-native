import AsyncStorage from "@react-native-async-storage/async-storage";
import getData from "./getData";

const editTask = async ({ key, value, index }) => {
    try {
    console.log(key, value, index);
    // let Key = JSON.stringify(key);
    // const Value = await getData(key);
    //     Value[index] = value;
    //     console.log(Value)

    // let Value1 = JSON.stringify(Value);
    // await AsyncStorage.setItem(Key, Value1);
    } catch (err) {
        console.log(err);
    }
}

export default editTask;
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const getData = async (key) => {
    try {
        let Key = JSON.stringify(key);
        const Value = await AsyncStorage.getItem(Key);
        return (JSON.parse(Value) || []);
    } catch (err) {
        console.log(err);
        Alert.alert("Error","Unable to load getData function");
    }
}
export default getData;
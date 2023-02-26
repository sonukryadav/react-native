import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const removeAllTask = async(key) => {
    let Key = JSON.stringify(key);
    await AsyncStorage.removeItem(Key);
    Alert.alert(` All ${key} removed from local storage.`);
}

export default removeAllTask;
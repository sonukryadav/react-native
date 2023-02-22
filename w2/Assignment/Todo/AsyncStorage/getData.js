import AsyncStorage from "@react-native-async-storage/async-storage";

const getData = async (key) => {
    try {
        const Value = await AsyncStorage.getItem(key);
        return Value != null ? (JSON.parse(Value)): (null);
    } catch (err) {
        console.log(err);
    }
}
export default getData;
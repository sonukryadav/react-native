import AsyncStorage from "@react-native-async-storage/async-storage";

const getData = async (key) => {
    try {
        let Key = JSON.stringify(key);
        const Value = await AsyncStorage.getItem(Key);
        return Value != null ? (JSON.parse(Value)): (null);
    } catch (err) {
        console.log(err);
    }
}
export default getData;
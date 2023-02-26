import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
const setData = async (key, value) => {
    try {
        let Key = JSON.stringify(key);
        let Value = JSON.stringify(value);
        await AsyncStorage.setItem(Key, Value);
        console.log(key, value ,"stored.");
    } catch (err) {
        console.log(err);
        Alert.alert("Error","unable to execute the setData()");
    }
}
export default setData;

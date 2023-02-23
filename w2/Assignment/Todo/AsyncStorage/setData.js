import AsyncStorage from '@react-native-async-storage/async-storage';
import getData from './getData';
const setData = async (key, value) => {
    try {
        let Key = JSON.stringify(key);

        let stored = await getData(key);
        stored.push(value);

        // console.log(stored);

        let Value = JSON.stringify(stored);
        await AsyncStorage.setItem(Key, Value);
        // console.log(`${key, Value} stored.`);
    } catch (err) {
        console.log(err);
    }
}

export default setData;

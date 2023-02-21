import AsyncStorage from '@react-native-async-storage/async-storage';
const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value) {
            // value previously stored
            return value;
        } else {
            return null;
        }
    } catch (err) {
        console.log(err.message + "readData");
    }
}

export { getData };
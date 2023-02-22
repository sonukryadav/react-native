import AsyncStorage from '@react-native-async-storage/async-storage';
const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value) {
            console.log(`Retrieved data from local storage ${value} `);
            return value;
        } else {
            return null;
        }
    } catch (err) {
        console.log(err.message + "readData");
    }
}

export { getData };
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (err) {
        console.log(e.message + "storeData");
    }
}
export { storeData };
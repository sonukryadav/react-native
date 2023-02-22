import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
    try {
      console.log(`storing data ${value}....`)
        await AsyncStorage.setItem(key, value);
        console.log("data stored!");
    } catch (err) {
        console.log(e.message + "storeData");
    }
}
export { storeData };
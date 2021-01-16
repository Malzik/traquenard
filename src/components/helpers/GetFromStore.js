import AsyncStorage from "@react-native-async-storage/async-storage";

export const getStorageData = async (key) => {
    return await AsyncStorage.getItem(key)
}
export const setStorageData = async (key, value) => {
    await AsyncStorage.setItem(key, value);
}
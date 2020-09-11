import AsyncStorage from '@react-native-community/async-storage';
const key = 'employeeData';

export const saveEmployeeData = async (value) => {
  try {
    const stringifiedData = JSON.stringify(value);
    console.log('data saved to async storage, ', value);
    await AsyncStorage.setItem(key, stringifiedData);
  } catch (error) {
    console.log('AsyncStorage Error: ' + error.message);
  }
};

export const retrieveEmployeeData = async () => {
  try {
    const retrievedItem = await AsyncStorage.getItem(key);
    const parsedData = JSON.parse(retrievedItem);
    console.log('data retrieved from async storage ', parsedData);
    return parsedData;
  } catch (error) {
    console.log(error.message);
  }
  return null;
};

export const isArrayValid = (arr) => {
  return Array.isArray(arr) && arr.length > 0;
};

export const isObjectValid = (obj) => {
  if (Object.keys(obj).length > 0) {
    return true;
  }
  return false;
};

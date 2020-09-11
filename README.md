# EmployeeDB
The inspiration behind the Swipeable component can be found on https://github.com/software-mansion/react-native-gesture-handler/blob/master/Example/swipeable/index.js
It is based on react-native-gesture-handler, which is a common dependency of react-navigation

The project implements basic CRUD using the context API and useReducer, the data is fetched from github's open api, and is stored in AsyncStorage after every operation performed

It also implements the multi select flatlist which can be used to delete multiple items in a single action


App can be tested on iOS and Android

To run on iOS-
yarn && yarn ios

To run on Android-
yarn && yarn android

import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import {isObjectValid} from '../utils';
import {withEmployeeData} from './GlobalContext';
import {CommonActions} from '@react-navigation/native';

const LandingScreen = ({route, setEmployeeData, navigation}) => {
  const employeeData = route.params?.empData ?? {};
  const [empName, setEmpName] = useState(employeeData.login);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: isObjectValid(employeeData)
        ? 'Employee Details'
        : 'Add Employee',
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            if (empName.length > 0) {
              /* BASIC VALIDATION */
              navigation.goBack();
            } else {
              setShowError(true);
            }
          }}
          onPressIn={() => {
            if (isObjectValid(employeeData)) {
              /* EDITING THE EMPLOYEE DETAILS */
              setEmployeeData({
                type: 'edit',
                payload: {...employeeData, login: empName},
              });
            } else {
              /* ADDING NEW EMPLOYEE WITH STATIC IMAGE URL CUSTOM NAME AND UNIQUE TIMESTAMP */
              setEmployeeData({
                type: 'add',
                payload: {
                  avatar_url:
                    'https://repository-images.githubusercontent.com/15949540/b0a70b80-cb15-11e9-8338-661f601406a1',
                  login: empName,
                  id: Math.floor(+new Date() / 1000),
                },
              });
            }
          }}>
          <Icon name="check" size={25} color="grey" />
        </TouchableOpacity>
      ),
    });
  });

  return (
    <View style={{flex: 1}}>
      <View style={styles.section}>
        <Text>Employee Name</Text>
        <TextInput
          style={styles.input}
          value={empName}
          onChangeText={(value) => setEmpName(value)}
        />
        {showError ? (
          <Text style={styles.error}>Name can't be empty</Text>
        ) : null}
      </View>
    </View>
  );
};

export default withEmployeeData(LandingScreen);

const styles = StyleSheet.create({
  section: {width: '90%', alignSelf: 'center', marginTop: 20},
  input: {
    backgroundColor: 'lightgrey',
    padding: 10,
    fontSize: 18,
    marginTop: 10,
    borderRadius: 8,
  },
  error: {fontSize: 10, color: 'red'},
});

import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';

const loginAction = CommonActions.reset({
  index: 0,
  routes: [{name: 'DashboardScreen'}],
});

const LoginScreen = ({navigation}) => {
  const [empName, setEmpName] = useState('');
  const [showNameError, setShowNameError] = useState(false);
  const [password, setPassword] = useState('');
  const [showPwdError, setShowPwdError] = useState(false);

  return (
    <View style={{flex: 1}}>
      <View style={styles.section}>
        <Text>Name</Text>
        <TextInput
          style={styles.input}
          value={empName}
          placeholder="Name"
          onChangeText={(value) => setEmpName(value)}
        />
        <Text style={styles.error}>
          {showNameError ? "Name can't be empty" : ''}
        </Text>
      </View>
      <View style={styles.section}>
        <Text>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          placeholder="Password"
          onChangeText={(value) => setPassword(value)}
        />
        <Text style={styles.error}>
          {showPwdError ? "Password can't be empty" : ''}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (empName.length === 0) {
            setShowNameError(true);
          } else if (password.length === 0) {
            setShowPwdError(true);
          } else {
            navigation.dispatch(loginAction);
          }
        }}>
        <Text>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

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
  button: {
    width: '50%',
    paddingVertical: 10,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    borderRadius: 8,
    marginTop: 20,
  },
});

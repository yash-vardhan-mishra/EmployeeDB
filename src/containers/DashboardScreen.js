import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList} from 'react-native-gesture-handler';
import {
  View,
  Text,
  Image,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';

import {isArrayValid} from '../utils';
import {getEmployeeList} from '../api';
import {withEmployeeData} from './GlobalContext';
import SwipeableRow from '../components/SwipeableRow';
import {CommonActions} from '@react-navigation/native';

const logOutAction = CommonActions.reset({
  index: 0,
  routes: [{name: 'LoginScreen'}],
});

const DashboardScreen = ({employeeData, setEmployeeData, navigation}) => {
  const listData = isArrayValid(employeeData) ? employeeData : [];
  const [selectedData, setSelectedData] = useState([]);

  /* used it inside useEffect hook because of https://github.com/react-navigation/react-navigation/issues/8621#issuecomment-668012061 */
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        if (!isArrayValid(listData)) {
          return (
            <TouchableOpacity onPress={() => refreshList()}>
              <Icon name="reload1" size={25} color="grey" />
            </TouchableOpacity>
          );
        } else if (isArrayValid(selectedData)) {
          return (
            <TouchableOpacity onPress={() => setSelectedData([])}>
              <Icon name="close" size={25} color="grey" />
            </TouchableOpacity>
          );
        } else {
          return (
            <TouchableOpacity onPress={() => navigation.dispatch(logOutAction)}>
              <Icon name="logout" size={25} color="grey" />
            </TouchableOpacity>
          );
        }
      },
      headerRight: () => {
        if (isArrayValid(listData) && isArrayValid(selectedData)) {
          return (
            <TouchableOpacity
              onPress={() => {
                setEmployeeData({type: 'delete', payload: selectedData});
                setSelectedData([]);
              }}>
              <Icon name="delete" size={25} color="grey" />
            </TouchableOpacity>
          );
        } else {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('LandingScreen')}>
              <Icon name="pluscircleo" size={25} color="grey" />
            </TouchableOpacity>
          );
        }
      },
    });
  });

  /* function to select/deselect the items and to toggle style on the basis of multi select */
  const itemSelected = (item) => selectedData.some((e) => e.id === item.id);

  const onPressHandler = (item) => {
    if (!itemSelected(item)) {
      setSelectedData((data) => [...data, item]);
    } else {
      setSelectedData((data) => data.filter((emp) => emp.id !== item.id));
    }
  };

  const Row = ({item}) => (
    <TouchableOpacity
      style={[
        styles.listItem,
        {backgroundColor: itemSelected(item) ? 'grey' : 'white'},
      ]}
      onPress={() => {
        isArrayValid(selectedData)
          ? onPressHandler(item)
          : navigation.navigate('LandingScreen', {empData: item});
      }}
      onLongPress={() => onPressHandler(item)}>
      <Text>{item.login}</Text>
      <Image source={{uri: item.avatar_url}} style={styles.imageStyle} />
    </TouchableOpacity>
  );

  const renderItem = ({item, index}) => (
    <SwipeableRow
      disabled={isArrayValid(selectedData)}
      onDeletePress={() =>
        setEmployeeData({type: 'delete', payload: [{...item}]})
      }
      key={index}>
      <Row item={item} />
    </SwipeableRow>
  );

  const refreshList = async () => {
    try {
      setSelectedData([]);
      const employeeList = await getEmployeeList();
      if (isArrayValid(employeeList)) {
        setEmployeeData({type: 'fetch', payload: employeeList});
      }
    } catch (error) {
      console.log('error is, ', error);
    }
  };

  return (
    <SafeAreaView>
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            onRefresh={refreshList}
            refreshing={!isArrayValid(listData)}
          />
        }
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={styles.separatorStyle} />}
        data={listData}
        extraData={selectedData}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default withEmployeeData(DashboardScreen);

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: '100%',
    alignSelf: 'center',
  },
  separatorStyle: {
    backgroundColor: 'rgb(200, 199, 204)',
    height: StyleSheet.hairlineWidth,
  },
  rectButton: {
    flex: 1,
    height: 80,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  imageStyle: {width: 45, aspectRatio: 1},
});

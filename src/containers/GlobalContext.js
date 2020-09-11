import React, {createContext, useEffect, useReducer, useContext} from 'react';

import {getEmployeeList} from '../api';
import {retrieveEmployeeData, isArrayValid, saveEmployeeData} from '../utils';

export const GlobalContext = createContext();

const initialData = [];

function reducer(state, action) {
  switch (action.type) {
    case 'fetch':
      return [...action.payload];
    case 'add':
      return [...state, action.payload];
    case 'delete':
      return [
        ...state.filter(
          (emp) => !action.payload.some((del) => del.id === emp.id),
        ),
      ];
    case 'edit':
      return state.map((emp) => {
        if (emp.id === action.payload.id) {
          return {...emp, login: action.payload.login};
        }
        return emp;
      });
    default:
      return state;
  }
}

export const GlobalProvider = ({children}) => {
  const [employeeData, setEmployeeData] = useReducer(reducer, initialData);

  /* FETCHING THE DATA WHEN THE CONTEXT MOUNTS */
  useEffect(() => {
    fetchEmployeeData();
  }, []);

  /* SAVING THE EMPLOYEE DATA IN ASYNC STORAGE AFTER EVERY CHANGE */
  useEffect(() => {
    saveEmployeeData(employeeData);
  }, [employeeData]);

  const fetchEmployeeData = async () => {
    try {
      const storedData = await retrieveEmployeeData();
      if (!isArrayValid(storedData)) {
        const employeeList = await getEmployeeList();
        if (isArrayValid(employeeList)) {
          setEmployeeData({type: 'fetch', payload: employeeList});
        }
      } else {
        setEmployeeData({type: 'fetch', payload: storedData});
      }
    } catch (error) {
      console.log('catched error is, ', error);
    }
  };

  return (
    <GlobalContext.Provider value={{employeeData, setEmployeeData}}>
      {children}
    </GlobalContext.Provider>
  );
};

/* withEmployeeData HOC */
export const withEmployeeData = (Component) => (props) => {
  const {employeeData, setEmployeeData} = useContext(GlobalContext);
  return (
    <Component
      {...props}
      employeeData={employeeData}
      setEmployeeData={setEmployeeData}
    />
  );
};

import axios from 'axios';

export const getEmployeeList = () =>
  axios
    .get('https://api.github.com/users')
    .then((res) => res.data)
    .catch((err) => err.response.data);

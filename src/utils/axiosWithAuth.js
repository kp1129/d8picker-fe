import axios from 'axios';

export const axiosWithAuth = () => {
  const code = localStorage.getItem('code');

  return axios.create({
    baseURL: process.env.REACT_APP_ENDPOINT_URL,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: code
    }
  });
};

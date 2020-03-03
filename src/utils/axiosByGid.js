import axios from 'axios';

export const axiosByGid = () => {
  const googleId = localStorage.getItem('googleId:');
  //console.log('AxiosByGid googleId',googleId)
  return axios.create({
    baseURL: process.env.REACT_APP_ENDPOINT_URL,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      googleId: googleId
    }
  });
};

import axios from 'axios';
// import { useAuth } from '../contexts/auth';



export const axiosWithAuth = (token) => {
    console.log(token);
    // const context = useAuth();
  return axios.create({
    baseURL: process.env.REACT_APP_ENDPOINT_URL,
    headers: {
        Authorization: `Bearer ${token}`,
      },
  });
};

export default axiosWithAuth;
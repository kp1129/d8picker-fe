import axios from "axios";

export const axiosWithAuth = () => {
  const code = localStorage.getItem("code");

  return axios.create({
    baseURL: "http://localhost:4000",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: code
    }
  });
};

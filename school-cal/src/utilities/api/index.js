/* eslint-disable */

import axios from "axios"

import { loadState } from "../localStorage"

export const client = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_PRODUCTION_BASE_URL
      : process.env.REACT_APP_DEVELOPMENT_BASE_URL,
  header: {
    "Content-Type": "application/json",
  },
})

export const clientWithAuth = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_PRODUCTION_BASE_URL
      : process.env.REACT_APP_DEVELOPMENT_BASE_URL,
})
clientWithAuth.interceptors.request.use(
  config => {
    const state = loadState("auth")
    const token = state.accessToken
    if (token) {
      config.headers["Authorization"] = "Bearer " + token
    }
    config.headers["Content-type"] = "application/json"

    return config
  },
  error => {
    Promise.reject(error)
  },
)

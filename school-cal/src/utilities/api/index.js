import axios from "axios"

import { loadState } from "../localStorage"

const state = loadState() || ""

const liveURL = "http://school-calendar-makata.herokuapp.com"
export const client = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? liveURL
      : process.env.REACT_APP_BASE_URL,
  header: {
    "Content-Type": "application/json",
  },
})

export const clientWithAuth = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? liveURL
      : process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${state.accessToken}`,
  },
})

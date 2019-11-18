/* eslint-disable */

import axios from "axios"

import { loadState } from "../localStorage"

const state = loadState("auth") || ""

const liveURL = "https://school-calendar-makata.herokuapp.com" //in the env folder for local host

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

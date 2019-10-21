import React, { createContext, useReducer, useEffect } from "react";
import * as firebase from "firebase/app";
import { app, db, googleProvider } from "../../firebase";
//import GoogleAPI from "../../services/googleAPI";
import {
  IS_LOADING,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNOUT_SUCCESS,
  SET_CURRENT_USER,
  SIGNOUT_FAILURE
} from "./types";
import authReducer from "./authReducer";

export const AuthContext = createContext();

export const AuthState = props => {
  const initialState = {
    isLoading: false,
    signInError: null,
    signUpError: null,
    signOutError: null,
    currentUser: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);
  // Google API CLient Library
  // let gapi = window.gapi;

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      dispatch({ type: SET_CURRENT_USER, payload: user });
    });
  }, []);

  const signUpUser = async values => {
    dispatch({ type: IS_LOADING, payload: true });
    try {
      const data = await app
        .auth()
        .createUserWithEmailAndPassword(values.email, values.password);

      await db
        .collection("users")
        .doc(data.user.uid)
        .set({
          firstName: values.firstName,
          lastName: values.lastName
        });

      dispatch({ type: SIGNUP_SUCCESS, payload: true });
    } catch (error) {
      dispatch({ type: SIGNUP_FAILURE, payload: error });
    }
  };
  const signInWithEmailAndPassword = async credential => {
    dispatch({ type: IS_LOADING, payload: true });
    try {
      await app
        .auth()
        .signInWithEmailAndPassword(credential.email, credential.password);
      dispatch({ type: SIGNIN_SUCCESS, payload: true });
    } catch (error) {
      dispatch({ type: SIGNIN_FAILURE, payload: error });
    }
  };

  const signInWithGoogle = async () => {
    try {
      let data = await firebase.auth().signInWithPopup(googleProvider);

      dispatch({ type: SIGNIN_SUCCESS, payload: true });
    } catch (error) {
      dispatch({ type: SIGNIN_FAILURE, payload: error });
    }
  };
  const signOut = async () => {
    try {
      await app.auth().signOut();
      dispatch({ type: SIGNOUT_SUCCESS });
    } catch (error) {
      dispatch({ type: SIGNOUT_FAILURE, payload: error.message });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading: state.isLoading,
        signInError: state.signInError,
        signUpError: state.signUpError,
        currentUser: state.currentUser,
        signInWithEmailAndPassword,
        signInWithGoogle,
        signUpUser,
        signOut
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

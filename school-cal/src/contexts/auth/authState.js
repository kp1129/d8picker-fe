import React, { createContext, useReducer, useEffect } from "react";
import * as firebase from "firebase/app";
import { app, db } from "../../firebase";
//import GoogleAPI from "../../services/googleAPI";
import {
  IS_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
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
    loginError: null,
    signUpError: null,
    signOutError: null,
    currentUser: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);
  // not working
  //let gapi = window.gapi;

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
          lastName: values.lastName,
          phoneNumber: values.phoneNumber
        });

      dispatch({ type: SIGNUP_SUCCESS, payload: true });
    } catch (error) {
      dispatch({ type: SIGNUP_FAILURE, payload: error.message });
    }
  };
  const signInWithEmailAndPassword = async (email, password) => {
    dispatch({ type: IS_LOADING, payload: true });
    try {
      await app.auth().signInWithEmailAndPassword(email, password);
      dispatch({ type: LOGIN_SUCCESS, payload: true });
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
  };

  // Not working
  // const signInWithGoogle = async () => {

  //   try {
  //     const googleAuth = gapi.auth2.getAuthInstance();

  //     const googleUser = await googleAuth.signIn();

  //     const token = googleUser.getAuthResponse().id_token;

  //     const credential = firebase.auth.GoogleAuthProvider.credential(token);

  //     await app.auth().signInWithCredential(credential);
  //   } catch (error) {
  //     console.log(`Sign In with Google Error: ${error}`);
  //     dispatch({ type: LOGIN_FAILURE, payload: error.message });
  //   }
  // };
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
        loginError: state.loginError,
        signUpError: state.signUpError,
        currentUser: state.currentUser,
        signInWithEmailAndPassword,
        signUpUser,
        signOut
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

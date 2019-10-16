import React, { useEffect, createContext, useContext, useState } from 'react';

import firebase, { db } from '../firebase';

export const authContext = createContext({ isLoading: true });

export const useSession = () => useContext(authContext);


export const useAuth = () => {
    const [state, setstate] = useState({
      isLoading: true,
      auth: null,
    });

    useEffect(() => {
        console.log("IN THE USE EFFEXR")
        const unsubscribe = firebase.auth().onAuthStateChanged(auth => {
          if (auth) {
            setstate({ isLoading: false, auth: auth });
          } else {
            setstate({ isLoading: false, auth: null });
          }
        });
        return () => unsubscribe();
      }, []);
    
      return state;
};

export const emailLoginHandler = (email, password) => {
    console.log("WE LOGGING IN!");
    return firebase
    .auth()
    .signInWithEmailAndPassword(email, password).then(res=> {db.collection('users').doc(res.user.uid).set({email: res.user.email})}) 
    .catch(err => {
      console.log(err);
    })
    
    
}
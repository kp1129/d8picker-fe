import { useEffect, useState } from 'react';
import {axiosWithAuth} from '../utils/axiosWithAuth';

const handleSignIn = gapi => async () => {
  try {
    await gapi.auth2.getAuthInstance().signIn();
  } catch (error) {
    console.log(error);
    throw new Error('Google API not loaded', error);
  }
};
const handleSignOut = gapi => async () => {
  try {
    await gapi.auth2.getAuthInstance().signOut();
  } catch (error) {
    console.log(error);
    throw new Error('Google API not loaded', error);
  }
};
const getProfile = async (auth, setCurrentUser) => {
  const userInfo = auth.currentUser.get().getBasicProfile();
  let adminId;
  // send admin info to the database
  const adminInfo = {
    name: userInfo.getName(),
    email: userInfo.getEmail(),
    googleId: userInfo.getId(),
  }
  // console.log('admin info here', adminInfo, auth.currentUser.get().getAuthResponse().id_token);
  await axiosWithAuth(auth.currentUser.get().getAuthResponse().id_token).post('http://localhost:4000/api/admin/', adminInfo)
  .then(res => {
    console.log('admin posted', res.status, res.data.adminId)
    adminId = res.data.adminId;
  })
  .catch(err => console.log(err));
  return setCurrentUser(
    userInfo && {
      name: userInfo.getName(),
      email: userInfo.getEmail(),
      photoUrl: userInfo.getImageUrl(),
      googleId: userInfo.getId(),
      token: auth.currentUser.get().getAuthResponse().id_token,
      adminId: adminId
    }
  );
};
const gapiLoad = ({
  setGapi,
  setIsAuthenticated,
  setCurrentUser,
  setIsLoading,
  opts
}) =>
  //loads appended script on line 76 with above props to authenticate user.
  window.gapi.load('client:auth2', async () => {
    try {
      await window.gapi.client.init({
        apiKey: opts.apiKey,
        discoveryDocs: opts.discoveryDocs,
        clientId: opts.clientId,
        scope: opts.scope,
        ux_mode: opts.ux_mode,
        redirect_uri: opts.redirect_uri
      });
      const auth = window.gapi.auth2.getAuthInstance();
      auth.isSignedIn.listen(() => {
        setIsAuthenticated(auth.currentUser.get().hasGrantedScopes(opts.scope));
      });
      // Load an API (ex. Calendar API) when client is loaded to the DOM
      opts.onLoaded(window.gapi.client);
      setIsAuthenticated(auth.currentUser.get().hasGrantedScopes(opts.scope));
      await getProfile(auth, setCurrentUser);
      setGapi(window.gapi);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  });
// Custom hook to initialize and use the Google API
function useGapi(opts) {
  const [gapi, setGapi] = useState(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Create script tag, initialize gapi, append script to document
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () =>
      gapiLoad({
        setGapi,
        setIsAuthenticated,
        setCurrentUser,
        setIsLoading,
        opts
      });
    document.body.appendChild(script);
  }, [gapi]);
  return {
    isLoading,
    currentUser,
    isAuthenticated,
    handleSignIn: handleSignIn(gapi),
    handleSignOut: handleSignOut(gapi)
  };
}
export default useGapi;
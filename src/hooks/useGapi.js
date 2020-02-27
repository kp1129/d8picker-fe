import { useEffect, useState } from 'react';

function useGapi({
  apiKey,
  clientId,
  discoveryDocs,
  scope,
  ux_mode,
  redirect_uri,
  onLoaded
}) {
  const [gapi, setGapi] = useState(undefined);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => {
      window.gapi.load('client:auth2', async () => {
        try {
          await window.gapi.client.init({
            apiKey,
            discoveryDocs,
            clientId,
            scope,
            ux_mode,
            redirect_uri
          });
          const auth = window.gapi.auth2.getAuthInstance();
          auth.isSignedIn.listen(() => {
            setIsAuthorized(auth.currentUser.get().hasGrantedScopes(scope));
          });

          onLoaded(window.gapi.client);
          setIsAuthorized(auth.currentUser.get().hasGrantedScopes(scope));
          setCurrentUser(auth.currentUser.get().getBasicProfile());
          setGapi(window.gapi);
        } catch (error) {
          console.log(error);
        }
      });
    };

    document.body.appendChild(script);
  }, [apiKey, clientId, discoveryDocs, scope, ux_mode, redirect_uri, onLoaded]);

  useEffect(() => {
    !gapi ? setIsLoading(true) : setIsLoading(false);
  }, [isLoading, gapi]);

  const onSignOut = async () => {
    if (!gapi) {
      throw new Error('No Gapi');
    }
    await gapi.auth2.getAuthInstance().signOut();
  };

  const onSignIn = async () => {
    if (!gapi) {
      throw new Error('No Gapi');
    }
    await gapi.auth2.getAuthInstance().signIn();
  };

  return {
    isLoading,
    currentUser,
    isAuthorized,
    onSignIn,
    onSignOut
  };
}

export default useGapi;

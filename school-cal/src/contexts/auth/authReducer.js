import {
  IS_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNIN_WITH_GOOGLE_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNOUT_SUCCESS,
  SIGNOUT_FAILURE,
  SET_CURRENT_USER,
  SIGNIN_WITH_GOOGLE_FAILURE
} from "./types";

const setIsLoading = (state, action) => {
  return {
    ...state,
    isLoading: action.payload
  };
};
const setLoginSuccess = (state, action) => {
  return {
    ...state,
    isAuthenticated: true,
    isLoading: false
  };
};

const setLoginFailure = (state, action) => {
  return {
    ...state,
    isAuthenticated: false,
    loginError: action.payload,
    isLoading: false
  };
};
const setSignInWithGoogleSuccess = (state, action) => {
  return {
    ...state,
    isAuthenticated: true,
    gAccessToken: action.payload,
    isLoading: false
  };
};
const setSignUpSuccess = (state, action) => {
  return {
    ...state,
    isAuthenticated: true,
    isLoading: false
  };
};

const setSignUpFailure = (state, action) => {
  return {
    ...state,
    isAuthenticated: false,
    isLoading: false
  };
};

const setSignOutSuccess = (state, action) => {
  return {
    ...state,
    isAuthenticated: false
  };
};
const setSignOutFailure = (state, action) => {
  return {
    ...state,
    signOutError: action.payload
  };
};
const setCurrentUser = (state, action) => {
  return {
    ...state,
    currentUser: action.payload
  };
};
const authReducer = (state, action) => {
  switch (action.type) {
    case IS_LOADING:
      return setIsLoading(state, action);
    case LOGIN_SUCCESS:
      return setLoginSuccess(state, action);
    case LOGIN_FAILURE:
      return setLoginFailure(state, action);
    case SIGNIN_WITH_GOOGLE_SUCCESS:
      localStorage.setItem("state", JSON.stringify(action.payload));
      return setSignInWithGoogleSuccess(state, action);
    case SIGNUP_SUCCESS:
      return setSignUpSuccess(state, action);
    case SIGNUP_FAILURE:
      return setSignUpFailure(state, action);
    case SIGNOUT_SUCCESS:
      return setSignOutSuccess(state, action);
    case SIGNOUT_FAILURE:
      return setSignOutFailure(state, action);
    case SET_CURRENT_USER:
      return setCurrentUser(state, action);
    default:
      return state;
  }
};

export default authReducer;

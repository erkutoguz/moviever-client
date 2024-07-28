import {
  FETCH_CATEGORIES,
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGOUT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
} from "./actions";

export default (state, action) => {
  if (action.type === LOGIN_USER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      refreshToken: action.payload.refreshToken,
      accessToken: action.payload.accessToken,
      isAuthenticated: true,
      userProfilePicture: action.payload.userProfilePicture,
    };
  }
  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      errMessage: action.payload.errMessage,
    };
  }

  if (action.type === REGISTER_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      refreshToken: action.payload.refreshToken,
      accessToken: action.payload.accessToken,
      isAuthenticated: true,
      userProfilePicture: action.payload.userProfilePicture,
    };
  }
  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      errMessage: action.payload.errMessage,
    };
  }
  if (action.type === FETCH_CATEGORIES) {
    return {
      ...state,
      categories: action.payload.categories,
    };
  }

  if (action.type === LOGOUT) {
    return {
      ...action.payload,
    };
  }
  throw new Error(`No such action: ${action.type}`);
};

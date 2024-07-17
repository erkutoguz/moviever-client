/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";
import {
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_BEGIN,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
} from "./actions";
import axios from "axios";
const AppContext = createContext(null);

const authClient = axios.create({
  baseURL: "http://localhost:9991/",
});

const initialState = {
  isLoading: false,
  errMessage: "",
  isAuthenticated: localStorage.getItem("isAuthenticated"),
  refreshToken: localStorage.getItem("refreshToken"),
  accessToken: localStorage.getItem("accessToken"),
  user: localStorage.getItem("user"),
};

// eslint-disable-next-line react/prop-types
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    loadLocalStorage();
  }, []);

  const loadLocalStorage = () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const user = localStorage.getItem("user");
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    console.log("user  is =>", user);
    if (accessToken) {
      state.accessToken = accessToken;
    }
    if (refreshToken) {
      state.refreshToken = refreshToken;
    }
    if (user) {
      state.user = user;
    }
    if (isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    }
  };

  const login = async (username, password) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const response = await authClient.post("/auth/login", {
        username,
        password,
      });
      const data = response.data;
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("user", data.username);
      localStorage.setItem("isAuthenticated", true);
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: {
          user: data.username,
          refreshToken: data.refreshToken,
          accessToken: data.accessToken,
          errMessage: "",
        },
      });
    } catch (err) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { errMessage: "Invalid Credentials." },
      });
    }
  };
  const register = async (username, email, password, firstname, lastname) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await authClient.post("/auth/register", {
        username,
        email,
        password,
        firstname,
        lastname,
      });

      const data = response.data;

      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: {
          user: data.username,
          refreshToken: data.refreshToken,
          accessToken: data.accessToken,
          errMessage: "",
        },
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { errMessage: err.response.data.message },
      });
    }
  };
  const fetchNewMovies = async () => {
    return axios.get("mock-data.json");
  };
  return (
    <AppContext.Provider value={{ ...state, login, register, fetchNewMovies }}>
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  return useContext(AppContext);
};

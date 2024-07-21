/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";
import {
  FETCH_CATEGORIES,
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_BEGIN,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
} from "./actions";
import axios from "axios";
const AppContext = createContext(null);

const initialState = {
  isLoading: false,
  errMessage: "",
  isAuthenticated: localStorage.getItem("isAuthenticated"),
  refreshToken: localStorage.getItem("refreshToken"),
  accessToken: localStorage.getItem("accessToken"),
  user: localStorage.getItem("user"),
  categories: JSON.parse(localStorage.getItem("categories")),
};

// eslint-disable-next-line react/prop-types
export const AppProvider = ({ children }) => {
  const authClient = axios.create({
    baseURL: "http://localhost:9991/",
  });

  const appClient = axios.create({
    baseURL: "http://localhost:9991/",
    headers: {
      "Content-Type": "application/json",
    },
  });
  appClient.interceptors.request.use(
    (config) => {
      console.log(state.accessToken);
      if (state.accessToken) {
        config.headers.Authorization = `Bearer ${state.accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  appClient.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response && error.response.status === 401) {
        try {
          const refreshToken = localStorage.getItem("refreshToken");
          const response = await axios.post("/auth/refresh-token", {
            refreshToken: refreshToken,
          });
          localStorage.setItem("accessToken", response.data.accessToken);

          error.config.headers.Authorization = `Bearer ${response.data.accessToken}`;
          return axios(error.config);
        } catch (refreshError) {
          console.error("Token yenileme başarısız:", refreshError);
          // Örneğin, kullanıcıyı giriş sayfasına yönlendirin
        }
      }
      return Promise.reject(error);
    }
  );
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    loadLocalStorage();
  }, []);

  const loadLocalStorage = () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const user = localStorage.getItem("user");
    const isAuthenticated = localStorage.getItem("isAuthenticated");
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
      console.log("user is ", state.user);
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
    console.log(state.accessToken);
    const page = 0;
    const size = 12;
    return appClient.get(`/movies/new-movies?page=${page}&size=${size}`);
  };
  const fetchPopularMovies = async () => {
    const page = 0;
    const size = 12;
    return appClient.get(`/movies/most-liked-movies?page=${page}&size=${size}`);
  };
  const fetchMovieDetailsWithMovieId = async (movieId) => {
    return await appClient.get(`/movies/${movieId}?with-details=true`);
  };

  const fetchLikedReviews = async () => {
    return await appClient.get("/users/liked-reviews");
  };
  const likeReview = async (reviewId) => {
    return await appClient.post(`/reviews/${reviewId}/like`);
  };
  const unlikeReview = async (reviewId) => {
    return await appClient.delete(`/reviews/${reviewId}/like`);
  };
  const fetchCategories = async () => {
    const response = await appClient.get("/categories");
    await dispatch({
      type: FETCH_CATEGORIES,
      payload: { categories: response.data },
    });
    localStorage.setItem("categories", JSON.stringify(response.data));
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        login,
        register,
        fetchCategories,
        fetchNewMovies,
        fetchPopularMovies,
        fetchLikedReviews,
        likeReview,
        unlikeReview,
        fetchMovieDetailsWithMovieId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  return useContext(AppContext);
};

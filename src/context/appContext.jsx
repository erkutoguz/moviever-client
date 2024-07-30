/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";
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
import axios from "axios";
const AppContext = createContext(null);

const initialState = {
  isLoading: false,
  errMessage: "",
  isAuthenticated: localStorage.getItem("isAuthenticated"),
  refreshToken: localStorage.getItem("refreshToken"),
  accessToken: localStorage.getItem("accessToken"),
  user: localStorage.getItem("user"),
  userProfilePicture: localStorage.getItem("userProfilePicture"),
  categories: JSON.parse(localStorage.getItem("categories")),
  isEnabled: localStorage.getItem("isEnabled"),
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
      if (state.accessToken) {
        config.headers.Authorization = `Bearer ${state.accessToken}`;
      }
      return config;
    },
    (error) => {
      console.log(state.accessToken);
      return Promise.reject(error);
    }
  );
  appClient.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (
        (error.response && error.response.status === 401) ||
        error.response.status === 403
      ) {
        const refreshToken = localStorage.getItem("refreshToken");
        appClient
          .post("/auth/refresh-token", {
            refreshToken,
          })
          .then((response) => {
            state.accessToken = response.data.accessToken;
            localStorage.setItem("accessToken", response.data.accessToken);
            error.config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            return appClient(error.config);
          })
          .catch((e) => {
            resetLocalStroage();
            dispatch({ type: LOGOUT, payload: initialState });
            window.location = "/sign-in";
          });
      }
      return Promise.reject(error);
    }
  );

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    loadLocalStorage();
  }, []);

  const resetLocalStroage = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.removeItem("categories");
    localStorage.removeItem("isEnabled");
    localStorage.removeItem("userProfilePicture");
  };

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
      localStorage.setItem("userProfilePicture", data.pictureUrl);
      localStorage.setItem("isAuthenticated", true);

      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: {
          user: data.username,
          refreshToken: data.refreshToken,
          accessToken: data.accessToken,
          errMessage: "",
          userProfilePicture: data.pictureUrl,
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
  const logout = async () => {
    await dispatch({ type: LOGOUT, payload: initialState });
    await resetLocalStroage();
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

      // const data = response.data;
      // console.log(data);
      // dispatch({
      //   type: REGISTER_USER_SUCCESS,
      //   payload: {
      //     user: data.username,
      //     refreshToken: data.refreshToken,
      //     accessToken: data.accessToken,
      //     errMessage: "",
      //     userProfilePicture: data.pictureUrl,
      //     isEnabled: data.isEnabled,
      //   },
      // });
      // localStorage.setItem("accessToken", data.accessToken);
      // localStorage.setItem("refreshToken", data.refreshToken);
      // localStorage.setItem("user", data.username);
      // localStorage.setItem("userProfilePicture", data.pictureUrl);
      // localStorage.setItem("isAuthenticated", true);
      // localStorage.setItem("isEnabled", data.isEnabled);
    } catch (err) {
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { errMessage: err.response.data.message },
      });
    }
  };

  const fetchNewMovies = async (page, size) => {
    return await appClient.get(`/movies/new-movies?page=${page}&size=${size}`);
  };
  const fetchPopularMovies = async (page, size) => {
    return await appClient.get(
      `/movies/most-liked-movies?page=${page}&size=${size}`
    );
  };
  const fetchMovieDetailsWithMovieId = async (movieId) => {
    return await appClient.get(`/movies/${movieId}?with-details=true`);
  };
  const fetchMovieReviews = async (movieId) => {
    return await appClient.get(`/movies/${movieId}/reviews`);
  };

  const fetchLikedReviews = async (movieId) => {
    return await appClient.get(`/users/liked-reviews/${movieId}`);
  };
  const makeReview = async (movieId, review) => {
    await appClient.post(`/movies/${movieId}/reviews`, {
      comment: review,
    });
  };
  const deleteReview = async (movieId, reviewId) => {
    await appClient.delete(`/movies/${movieId}/reviews/${reviewId}`);
  };

  const likeReview = async (reviewId) => {
    return await appClient.post(`/reviews/${reviewId}/like`);
  };
  const unlikeReview = async (reviewId) => {
    return await appClient.delete(`/reviews/${reviewId}/like`);
  };
  const fetchUserWatchlists = async () => {
    return await appClient.get("/watchlist");
  };
  const fetchWatchlistDetails = async (watchlistId, page, size) => {
    return await appClient.get(
      `/watchlist/${watchlistId}/movies?page=${page}&size=${size}`
    );
  };
  const fetchUserWatchlistsPreview = async () => {
    return await appClient.get("/watchlist/preview");
  };
  const addMovieToWatchlist = async (watchlistIds, movieId) => {
    const requests = watchlistIds.map((watchlistId) =>
      appClient.post(`/watchlist/${watchlistId}`, { movieId })
    );
    Promise.all(requests)
      .then((responses) => {
        responses.forEach((response, index) => {
          console.log(`Response from Request ${index + 1}:`, response.data);
        });
      })
      .catch((errors) => {
        console.error("Error:", errors);
      });
  };
  const removeMovieFromWatchlist = async (watchlistId, movieId) => {
    await appClient.delete(`/watchlist/${watchlistId}/movies/${movieId}`);
  };
  const renameWatchlist = async (watchlistId, watchlistName) => {
    await appClient.patch(`/watchlist/${watchlistId}`, {
      watchlistName: watchlistName,
    });
  };
  const deleteWatchlist = async (watchlistId) => {
    await appClient.delete(`/watchlist/${watchlistId}`);
  };
  const likeMovie = async (movieId) => {
    return await appClient.post(`/movies/${movieId}/like`);
  };
  const unlikeMovie = async (movieId) => {
    return await appClient.delete(`/movies/${movieId}/like`);
  };
  const fetchAllMovies = async (categoryName, page, size) => {
    if (categoryName !== "ALL") {
      return await appClient.get(
        `/movies?category=${categoryName}&page=${page}&size=${size}`
      );
    } else {
      return await appClient.get(`/movies?page=${page}&size=${size}`);
    }
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
        fetchWatchlistDetails,
        fetchLikedReviews,
        likeReview,
        addMovieToWatchlist,
        deleteWatchlist,
        renameWatchlist,
        removeMovieFromWatchlist,
        unlikeReview,
        fetchMovieDetailsWithMovieId,
        likeMovie,
        unlikeMovie,
        fetchAllMovies,
        fetchUserWatchlists,
        fetchUserWatchlistsPreview,
        makeReview,
        deleteReview,
        fetchMovieReviews,
        logout,
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

/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import reducer from "./reducer";
import {
  CLEAR_ERROR,
  FETCH_CATEGORIES,
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGOUT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  REQUEST_ERROR,
  RESOURCE_NOT_FOUND_ERROR,
  TOGGLE_THEME,
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
  theme: localStorage.getItem("theme") === "dark" ? "dark" : "light",
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
      return Promise.reject(error);
    }
  );
  appClient.interceptors.response.use(
    (response) => {
      dispatch({ type: CLEAR_ERROR });
      return response;
    },
    async (error) => {
      if (error.response && error.response.status === 403) {
        const refreshToken = localStorage.getItem("refreshToken");
        appClient
          .post("/api/v1/auth/refresh-token", {
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
            logout();
            dispatch({ type: LOGOUT, payload: initialState });
            window.location = "/sign-in";
          });
      }
      if (error.response.status === 401) {
        dispatch({
          type: REQUEST_ERROR,
          payload: {
            errMessage: error.response.data.message,
          },
        });
      }
      if (error.response.status === 404) {
        dispatch({
          type: RESOURCE_NOT_FOUND_ERROR,
          payload: {
            errMessage: error.response.data.message,
          },
        });
      }

      return Promise.reject(error);
    }
  );

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      state.theme = "dark";
      document.body.classList.remove("light");
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      state.theme = "light";
      document.body.classList.remove("dark");
      document.body.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  }, [state.theme]);

  useEffect(() => {
    loadLocalStorage();
  }, []);

  const toggleTheme = () => {
    if (state.theme === "light") {
      localStorage.setItem("theme", "dark");
      state.theme = "dark";
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      state.theme = "light";
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }
  };

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
      const response = await authClient.post("/api/v1/auth/login", {
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
    } catch (err) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { errMessage: err.response.data.message },
      });
    }
  };
  const logout = () => {
    appClient.get("/api/v1/auth/logout").then((res) => {});
    dispatch({ type: LOGOUT, payload: initialState });
    resetLocalStroage();
  };
  const register = async (username, email, password, firstname, lastname) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await authClient.post("/api/v1/auth/register", {
        username,
        email,
        password,
        firstname,
        lastname,
      });
      dispatch({ type: REGISTER_USER_SUCCESS });
    } catch (err) {
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { errMessage: err.response.data.message },
      });
    }
  };

  const fetchProfile = async () => {
    const response = await appClient.get("/api/v1/users/me");
    localStorage.removeItem("userProfilePicture");
    localStorage.setItem("userProfilePicture", response.data.pictureUrl);
    state.userProfilePicture = response.data.pictureUrl;
    return response;
  };

  const updateProfile = async (data) => {
    return await appClient.put("/api/v1/users/me", data);
  };
  const changeProfilePicture = async (image) => {
    return await appClient.post("/api/v1/users/profile/avatar", image, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
  };

  const removeProfilePicture = async () => {
    return await appClient.delete("/api/v1/users/profile/avatar");
  };

  const fetchNewMovies = async (page, size) => {
    return await appClient.get(
      `/api/v1/movies/new-movies?page=${page}&size=${size}`
    );
  };
  const fetchMostLikedMovies = async (page, size) => {
    return await appClient.get(
      `/api/v1/movies/most-liked-movies?page=${page}&size=${size}`
    );
  };
  const fetchPopularMovies = async (page, size) => {
    return await appClient.get(
      `/api/v1/movies/most-viewed-movies?page=${page}&size=${size}`
    );
  };
  const fetchMovieDetailsWithMovieId = async (movieId) => {
    return await appClient.get(`/api/v1/movies/${movieId}?with-details=true`);
  };
  const fetchMovieReviews = async (movieId) => {
    return await appClient.get(`/api/v1/movies/${movieId}/reviews`);
  };

  const fetchLikedReviews = async (movieId) => {
    return await appClient.get(`/api/v1/users/liked-reviews/${movieId}`);
  };
  const makeReview = async (movieId, review) => {
    await appClient.post(`/api/v1/movies/${movieId}/reviews`, {
      comment: review,
    });
  };
  const deleteReview = async (movieId, reviewId) => {
    await appClient.delete(`/api/v1/movies/${movieId}/reviews/${reviewId}`);
  };

  const likeReview = async (reviewId) => {
    return await appClient.post(`/api/v1/reviews/${reviewId}/like`);
  };
  const unlikeReview = async (reviewId) => {
    return await appClient.delete(`/api/v1/reviews/${reviewId}/like`);
  };
  const fetchUserWatchlists = async () => {
    return await appClient.get("/api/v1/watchlist");
  };
  const fetchWatchlistDetails = async (watchlistId, page, size) => {
    return await appClient.get(
      `/api/v1/watchlist/${watchlistId}/movies?page=${page}&size=${size}`
    );
  };

  const fetchUserWatchlistsPreview = async () => {
    return await appClient.get("/api/v1/watchlist/preview");
  };
  const addMovieToWatchlist = async (watchlistIds, movieId) => {
    const requests = watchlistIds.map((watchlistId) =>
      appClient.post(`/api/v1/watchlist/${watchlistId}`, { movieId })
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
    await appClient.delete(
      `/api/v1/watchlist/${watchlistId}/movies/${movieId}`
    );
  };
  const renameWatchlist = async (watchlistId, watchlistName) => {
    await appClient.patch(`/api/v1/watchlist/${watchlistId}`, {
      watchlistName: watchlistName,
    });
  };
  const createWatchlist = async (watchlistName) => {
    await appClient.post("/api/v1/watchlist", { watchlistName: watchlistName });
  };
  const deleteWatchlist = async (watchlistId) => {
    await appClient.delete(`/api/v1/watchlist/${watchlistId}`);
  };
  const likeMovie = async (movieId) => {
    return await appClient.post(`/api/v1/movies/${movieId}/like`);
  };
  const unlikeMovie = async (movieId) => {
    return await appClient.delete(`/api/v1/movies/${movieId}/like`);
  };
  const fetchAllMovies = async (categoryName, page, size) => {
    if (categoryName !== "ALL") {
      return await appClient.get(
        `/api/v1/movies?category=${categoryName}&page=${page}&size=${size}`
      );
    } else {
      return await appClient.get(`/api/v1/movies?page=${page}&size=${size}`);
    }
  };
  const fetchCategories = async () => {
    const response = await appClient.get("/api/v1/categories");
    await dispatch({
      type: FETCH_CATEGORIES,
      payload: { categories: response.data },
    });
    localStorage.setItem("categories", JSON.stringify(response.data));
  };

  //admin ops
  const fetchUserCount = async () => {
    return await appClient.get("/api/v1/admin/users?page=0&size=1");
  };
  const fetchMovieCount = async () => {
    return await appClient.get("/api/v1/admin/movies?page=0&size=1");
  };
  const fetchReviewCount = async () => {
    return await appClient.get("/api/v1/admin/reviews?page=0&size=1");
  };
  const fetchWatchlistCount = async () => {
    return await appClient.get("/api/v1/admin/watchlists?page=0&size=1");
  };
  const fetchMovieCountForEachCategory = async () => {
    return await appClient.get("/api/v1/admin/category/distribution");
  };
  const fetchWatchlists = async (page) => {
    return await appClient.get(`/api/v1/admin/watchlists?page=${page}&size=6`);
  };
  const fetchReviews = async (page) => {
    return await appClient.get(`/api/v1/admin/reviews?page=${page}&size=6`);
  };
  const fetchUsers = async (page) => {
    return await appClient.get(`/api/v1/admin/users?page=${page}&size=6`);
  };
  const fetchUserLogs = async (page, type) => {
    return await appClient.get(
      `/api/v1/logs/show-logs?page=${page}&size=6&type=${type}`
    );
  };

  const downloadLog = async (logName) => {
    return await appClient
      .get(`/api/v1/logs/download/${logName}`)
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", logName);
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
  };
  const fetchAppHealth = async () => {
    return await axios.get("http://localhost:9991/actuator/health", {
      headers: {
        Authorization: `Bearer ${state.accessToken}`,
      },
    });
  };
  const searchUsers = async (query, page) => {
    return await appClient.get(
      `/api/v1/users/search/${query}?page=${page}&size=6`
    );
  };

  const searchMovies = async (query, categoryName, page) => {
    return await appClient.get(
      `/api/v1/movies/search/${query}?page=${page}&size=7${
        categoryName !== "ALL" ? "&category=" + categoryName : ""
      }`
    );
  };
  const searchReviews = async (query, page) => {
    return await appClient.get(
      `/api/v1/reviews/search/${query}?page=${page}&size=6`
    );
  };

  const deleteUserById = async (userId) => {
    await appClient.delete(`/api/v1/admin/users/${userId}`);
  };
  const updateUserStatus = async (userId, newStatus) => {
    await appClient.patch(`/api/v1/admin/users/${userId}`, {
      newStatus,
      userId,
    });
  };

  const createMovie = async (formData) => {
    await appClient.post("/api/v1/admin/movies", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
  const deleteMovieById = async (userId) => {
    await appClient.delete(`/api/v1/admin/movies/${userId}`);
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        fetchUserCount,
        fetchMovieCount,
        fetchReviewCount,
        fetchWatchlistCount,
        fetchMovieCountForEachCategory,
        fetchWatchlists,
        fetchAppHealth,
        fetchReviews,
        fetchUsers,
        fetchUserLogs,
        downloadLog,
        searchUsers,
        searchMovies,
        searchReviews,
        deleteUserById,
        updateUserStatus,
        createMovie,
        deleteMovieById,
        toggleTheme,
        login,
        register,
        fetchProfile,
        updateProfile,
        changeProfilePicture,
        removeProfilePicture,
        fetchCategories,
        appClient,
        fetchNewMovies,
        fetchPopularMovies,
        fetchMostLikedMovies,
        fetchWatchlistDetails,
        fetchLikedReviews,
        likeReview,
        addMovieToWatchlist,
        deleteWatchlist,
        createWatchlist,
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

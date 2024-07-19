import axios from "axios";

const appClient = axios.create({
  baseURL: "http://localhost:9991/",
});

const fetchNewMovies = async (page, size) => {
  return appClient.get(`/movies/new-movies?page=${page}&size=${size}`);
};
const fetchPopularMovies = async (page, size) => {
  return appClient.get(`/movies/most-liked-movies?page=${page}&size=${size}`);
};
const fetchMovieDetailsWithMovieId = async (movieId) => {
  return appClient.get(`/movies/${movieId}?with-details=true`);
};
const fetchAllMovies = async (category, page, size) => {
  const url =
    category === null
      ? `/movies?category=ALL&page=${page}&size=${size}`
      : `/movies?category=${category}&page=${page}&size=${size}`;
  return appClient.get(url);
};
export {
  fetchNewMovies,
  fetchPopularMovies,
  fetchMovieDetailsWithMovieId,
  fetchAllMovies,
};

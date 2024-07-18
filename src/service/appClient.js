import axios from "axios";

const appClient = axios.create({
  baseURL: "http://localhost:9991/",
});

const fetchNewMovies = async () => {
  return appClient.get("/movies/new-movies");
};
const fetchPopularMovies = async () => {
  return appClient.get("/movies/most-liked-movies");
};

const fetchMovieDetailsWithMovieId = async (movieId) => {
  return appClient.get(`/movies/${movieId}?with-details=true`);
};

export { fetchNewMovies, fetchPopularMovies, fetchMovieDetailsWithMovieId };

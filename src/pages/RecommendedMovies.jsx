/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import MovieList from "../components/movies/MovieList";
import { useAppContext } from "../context/appContext";

const RecommendedMovies = () => {
  const [movies, setMovies] = useState([]);
  const { fetchRecommendedMovies } = useAppContext();
  useEffect(() => {
    fetchRecommendedMovies().then((res) => {
      setMovies(res.data);
    });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Header />
      <div className="min-h-[calc(100vh-350px)] flex flex-col">
        <p className={`font-bold text-xl text-textColor my-8 `}>
          Recommended Movies
        </p>
        <MovieList movies={movies} />
      </div>
      <Footer />
    </div>
  );
};

export default RecommendedMovies;

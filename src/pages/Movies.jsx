/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useResolvedPath } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import MovieList from "../components/movies/MovieList";
import { Pagination } from "@nextui-org/react";
import { useAppContext } from "../context/appContext";

function Movies() {
  const [initialData, setInitialData] = useState([]);
  const url = useResolvedPath();
  const [page, setPage] = useState(0);
  const [pageName, setPageName] = useState("");
  const { fetchPopularMovies, fetchNewMovies } = useAppContext();

  useEffect(() => {
    switch (url.pathname) {
      case "/new-movies":
        setPageName("New Movies");
        break;
      case "/popular-movies":
        setPageName("Popular Movies");
        break;
      case "/all-movies":
        setPageName("All Movies");
        break;
    }
  }, []);

  useEffect(() => {
    if (url.pathname === "/new-movies" || url.pathname === "/all-movies") {
      fetchNewMovies(page, 6).then((res) => {
        setInitialData(res.data);
      });
    } else if (url.pathname === "/popular-movies") {
      fetchPopularMovies(page, 6).then((res) => {
        setInitialData(res.data);
      });
    }
  }, [page]);

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Header />
      <p className={`font-bold text-xl text-textColor my-8`}>{pageName}</p>
      <MovieList movies={initialData.movies} />

      <Pagination
        total={initialData.totalPages}
        initialPage={1}
        className="mt-8"
        onChange={(p) => {
          setPage(p - 1);
        }}
      />

      <Footer />
    </div>
  );
}

export default Movies;

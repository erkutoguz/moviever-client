/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { capitalizeText } from "../utils/textFormatter";
import MovieList from "../components/movies/MovieList";
import { Pagination } from "@nextui-org/react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { useAppContext } from "../context/appContext";

function Category() {
  const { categoryName } = useParams();
  const [movieData, setMovieData] = useState([]);
  const { fetchAllMovies } = useAppContext();
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchAllMovies(categoryName, page, 12).then((res) => {
      console.log(categoryName);
      console.log(res);
      setMovieData(res.data);
    });
  }, [page]);

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Header />
      <p className="font-bold text-xl text-darkBlue my-8">
        {capitalizeText(categoryName)} Movies
      </p>
      {movieData.totalItems !== 0 ? (
        <>
          <MovieList movies={movieData.movies} />
          <Pagination
            total={movieData.totalPages}
            initialPage={1}
            className="mt-8"
            onChange={(p) => {
              setPage(p - 1);
            }}
          />
        </>
      ) : (
        <>
          <p>no movies on this category yet</p>
        </>
      )}
      {movieData.totalItems === 0 && (
        <>
          <p>no {capitalizeText(categoryName)} movies yet</p>
        </>
      )}
      <Footer />
    </div>
  );
}

export default Category;

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
      setMovieData(res.data);
    });
  }, [page]);

  return (
    <div className="flex flex-col justify-center items-center w-full ">
      <Header />
      <div className="min-h-[calc(90vh-300px)]">
        <p className={`font-bold text-xl text-textColor my-8`}>
          {capitalizeText(categoryName)} Movies
        </p>
        {movieData.totalItems !== 0 ? (
          <>
            <MovieList movies={movieData.movies} />
            <Pagination
              total={movieData.totalPages}
              size="sm"
              initialPage={1}
              className="mt-8"
              onChange={(p) => {
                setPage(p - 1);
              }}
            />
          </>
        ) : (
          <>
            <p className="text-textColor">
              no {capitalizeText(categoryName)} movies yet
            </p>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Category;

import { useState } from "react";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import MovieList from "../components/movies/MovieList";
import { Pagination } from "@nextui-org/react";

const RecommendedMovies = () => {
  const [movies, setMovies] = useState([]);
  const [initialData, setInitialData] = useState({});
  const [page, setPage] = useState(0);
  return (
    <div className="flex flex-col items-center w-full h-screen">
      <Header />
      <div className="">
        <MovieList movies={movies} />
        <Pagination
          total={initialData.totalPages}
          initialPage={1}
          className="mt-8 self-center"
          onChange={(p) => {
            setPage(p - 1);
          }}
        />
      </div>
      <Footer />
    </div>
  );
};

export default RecommendedMovies;

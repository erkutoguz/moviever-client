/* eslint-disable react-hooks/exhaustive-deps */
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import MovieCarousel from "../components/movies/MovieCarousel";
import LayoutLink from "../components/common/LayoutLink";
import Categories from "../components/categories/Categories";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";

function Home() {
  const [newMovies, setNewMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const { fetchNewMovies, fetchPopularMovies } = useAppContext();
  useEffect(() => {
    fetchNewMovies(0, 12).then((res) => {
      setNewMovies(res.data.movies);
    });
    fetchPopularMovies(0, 12).then((res) => {
      setPopularMovies(res.data.movies);
    });
  }, []);
  return (
    <div className="flex flex-col justify-center items-center">
      <Header />
      <div className="new-movies">
        <LayoutLink to={"/new-movies"} text={"New Movies"} />
        {newMovies && <MovieCarousel slides={newMovies} />}
      </div>

      <div className="categories">
        <Categories />
      </div>

      <div className="popular-movies">
        <LayoutLink to={"/popular-movies"} text={"Popular Movies"} />
        <MovieCarousel slides={popularMovies} />
      </div>

      <div className="recommended-movies">
        <LayoutLink to={"/"} text={"Recomended Movies"} />
        <MovieCarousel slides={newMovies} />
      </div>

      <Footer />
    </div>
  );
}

export default Home;

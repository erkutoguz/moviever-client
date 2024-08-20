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
  const [mostLikedMovies, setMostLikedMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const { fetchNewMovies, fetchPopularMovies, fetchMostLikedMovies } =
    useAppContext();
  useEffect(() => {
    fetchNewMovies(0, 12).then((res) => {
      setNewMovies(res.data.movies);
    });
    fetchMostLikedMovies(0, 12).then((res) => {
      console.log(res.data);

      setMostLikedMovies(res.data.movies);
    });
    fetchPopularMovies(0, 12).then((res) => {
      console.log(res.data);

      setPopularMovies(res.data.movies);
    });
  }, []);
  return (
    <div className="flex flex-col justify-center items-center">
      <Header />
      <div className="new-movies mt-8 flex flex-col gap-2">
        <LayoutLink to={"/new-movies"} text={"New Movies"} />
        {newMovies && <MovieCarousel slides={newMovies} />}
      </div>

      <div className="categories">
        <Categories />
      </div>

      <div className="popular-movies mt-8 flex flex-col gap-2">
        <LayoutLink to={"/popular-movies"} text={"Popular Movies"} />
        <MovieCarousel slides={popularMovies} />
      </div>

      <div className="popular-movies mt-8 flex flex-col gap-2">
        <LayoutLink to={"/most-liked-movies"} text={"Most Liked Movies"} />
        <MovieCarousel slides={mostLikedMovies} />
      </div>

      <div className="recommended-movies mt-8 flex flex-col gap-2">
        <LayoutLink to={"/"} text={"Recomended Movies"} />
        <MovieCarousel slides={newMovies} />
      </div>

      <Footer />
    </div>
  );
}

export default Home;

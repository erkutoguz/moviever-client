/* eslint-disable react-hooks/exhaustive-deps */
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import MovieCarousel from "../components/movies/MovieCarousel";
import LayoutLink from "../components/common/LayoutLink";
import Categories from "../components/categories/Categories";
import { useLoaderData } from "react-router-dom";

function Home() {
  const { newMovies, popularMovies } = useLoaderData();

  return (
    <div className="flex flex-col justify-center items-center">
      <Header />
      <div className="new-movies">
        <LayoutLink to={"/"} text={"New Movies"} />
        {newMovies && <MovieCarousel slides={newMovies} />}
      </div>

      <div className="categories">
        <Categories />
      </div>

      <div className="popular-movies">
        <LayoutLink to={"/"} text={"Popular Movies"} />
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

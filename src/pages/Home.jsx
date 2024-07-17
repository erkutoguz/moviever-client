/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import MovieCarousel from "../components/movies/MovieCarousel";
import { useAppContext } from "../context/appContext";

function Home() {
  const { fetchNewMovies } = useAppContext();
  const [newMovies, setNewMovies] = useState([]);

  useEffect(() => {
    fetchNewMovies().then((res) => {
      setNewMovies(res.data);
    });
  }, []);
  return (
    <div className="flex flex-col">
      <Header />
      <MovieCarousel slides={newMovies} />
      HOME
      <Footer />
    </div>
  );
}

export default Home;

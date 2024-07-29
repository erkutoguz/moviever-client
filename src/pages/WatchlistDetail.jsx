/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import { useParams } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import MovieList from "../components/movies/MovieList";

const WatchlistDetail = () => {
  const { fetchWatchlistDetails } = useAppContext();
  const [details, setDetails] = useState(null);
  const { watchlistId } = useParams();
  useEffect(() => {
    fetchWatchlistDetails(watchlistId).then((res) => {
      setDetails(res.data);
      console.log(res.data);
    });
  }, []);
  return (
    <div className="flex flex-col justify-center items-center">
      <Header />
      {details && (
        <>
          <p className="font-bold text-xl text-darkBlue my-8">
            {details.watchlistName}
          </p>
          <MovieList movies={details.movieList} />
        </>
      )}
      <Footer />
    </div>
  );
};

export default WatchlistDetail;

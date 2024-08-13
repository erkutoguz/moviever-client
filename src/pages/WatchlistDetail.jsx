/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";
import { useAppContext } from "../context/appContext";
import { useParams } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import MovieCard from "../components/movies/MovieCard";
import RemoveMovieFromWatchlistModal from "../components/common/RemoveMovieFromWatchlistModal";

const WatchlistDetail = () => {
  const { fetchWatchlistDetails } = useAppContext();
  const [details, setDetails] = useState(null);
  const { watchlistId } = useParams();
  const [page, setPage] = useState(0);
  const observer = useRef();
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  const updateMovies = (movieId) => {
    setLoading(true);
    fetchWatchlistDetails(watchlistId, page, 12).then((res) => {
      const prevList = movies.filter((m) => m.id !== movieId);
      // eslint-disable-next-line no-unused-vars
      setMovies((prev) => {
        return [...res.data.movieList, ...prevList];
      });
      setDetails(res.data);
      setHasMore(res.data.movieList.length > 0);
      setLoading(false);
    });
  };

  useEffect(() => {
    setLoading(true);
    fetchWatchlistDetails(watchlistId, page, 12).then((res) => {
      setMovies((prev) => {
        return [...res.data.movieList, ...prev];
      });
      setDetails(res.data);
      setHasMore(res.data.movieList.length > 0);
      setLoading(false);
    });
  }, [page]);

  return (
    <div className="flex flex-col justify-center items-center ">
      <Header />
      {details && !loading && (
        <>
          <p className="font-bold text-xl text-textColor my-8">
            {details.watchlistName}
          </p>
          <div className="flex flex-wrap max-w-[1000px] justify-center gap-2 h-[calc(100vh-408px)]">
            {movies.map((m, i) => {
              if (i === movies.length - 1) {
                return (
                  <div key={i} ref={lastElementRef} className="relative">
                    <MovieCard movie={m} />
                    <RemoveMovieFromWatchlistModal
                      movieId={m.id}
                      watchlistId={details.id}
                      updateMovies={updateMovies}
                    />
                  </div>
                );
              } else {
                return (
                  <div key={i} className="relative">
                    <MovieCard movie={m} />
                    <RemoveMovieFromWatchlistModal
                      movieId={m.id}
                      updateMovies={updateMovies}
                      watchlistId={details.id}
                    />
                  </div>
                );
              }
            })}
          </div>
        </>
      )}
      <Footer />
    </div>
  );
};

export default WatchlistDetail;

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { useAppContext } from "../context/appContext";
import LayoutLink from "../components/common/LayoutLink";
import WatchlistPrevCarousel from "../components/watchlist/WatchlistPrevCarousel";

const MyWatchlists = () => {
  const [watchlists, setWatchlists] = useState([]);
  const { fetchUserWatchlistsPreview } = useAppContext();
  useEffect(() => {
    fetchUserWatchlistsPreview().then((res) => {
      setWatchlists(res.data);
    });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <Header />
      {watchlists.length > 0 && (
        <div className="">
          {watchlists.map((w, i) => {
            return (
              <div key={i}>
                <LayoutLink to={`/watchlists/${w.id}`} text={w.watchlistName} />
                <WatchlistPrevCarousel slides={w.movieList} />
              </div>
            );
          })}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default MyWatchlists;

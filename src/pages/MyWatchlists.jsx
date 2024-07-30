/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { useAppContext } from "../context/appContext";
import LayoutLink from "../components/common/LayoutLink";
import WatchlistPrevCarousel from "../components/watchlist/WatchlistPrevCarousel";
import RenameWatchlistModal from "../components/common/RenameWatchlistModal";
import DeleteWatchlistModal from "../components/common/DeleteWatchlistModal";

const MyWatchlists = () => {
  const [watchlists, setWatchlists] = useState([]);
  const { fetchUserWatchlistsPreview } = useAppContext();
  useEffect(() => {
    fetchUserWatchlistsPreview().then((res) => {
      setWatchlists(res.data);
    });
  }, []);

  const updateWatchlists = () => {
    fetchUserWatchlistsPreview().then((res) => {
      setWatchlists(res.data);
    });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <Header />
      {watchlists.length > 0 && (
        <div className="">
          {watchlists.map((w, i) => {
            return (
              <div key={i} className="!max-w-full lg:min-w-[980px]">
                <div className="flex items-center justify-between ">
                  <LayoutLink
                    to={`/watchlists/${w.id}`}
                    text={w.watchlistName}
                  />
                  <div className="edit-buttons flex gap-4">
                    <RenameWatchlistModal
                      watchlistId={w.id}
                      currentName={w.watchlistName}
                      updateWatchlists={updateWatchlists}
                    />
                    <DeleteWatchlistModal
                      watchlistId={w.id}
                      updateWatchlists={updateWatchlists}
                    />
                  </div>
                </div>
                <div className="">
                  {w.movies.length > 0 ? (
                    <WatchlistPrevCarousel slides={w.movies} />
                  ) : (
                    <p className="px-6">no movies yet</p>
                  )}
                </div>
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

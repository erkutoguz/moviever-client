/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { useAppContext } from "../context/appContext";
import LayoutLink from "../components/common/LayoutLink";
import WatchlistPrevCarousel from "../components/watchlist/WatchlistPrevCarousel";
import RenameWatchlistModal from "../components/common/RenameWatchlistModal";
import DeleteWatchlistModal from "../components/common/DeleteWatchlistModal";
import CreateWatchlistModal from "../components/common/CreateWatchlistModal";
import { Link, Pagination } from "@nextui-org/react";

const MyWatchlists = () => {
  const [watchlists, setWatchlists] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [page, setPage] = useState(0);

  const { fetchUserWatchlistsPreview } = useAppContext();
  useEffect(() => {
    fetchUserWatchlistsPreview(page).then((res) => {
      setWatchlists(res.data.watchlistPreviews);
      setInitialData(res.data);
    });
  }, []);

  const updateWatchlists = () => {
    fetchUserWatchlistsPreview(page).then((res) => {
      setWatchlists(res.data.watchlistPreviews);
      setInitialData(res.data);
    });
  };

  return (
    <div className="flex flex-col justify-center items-center text-textColor">
      <Header />
      <div className="add-watchlist mt-8">
        <CreateWatchlistModal updateWatchlists={updateWatchlists} />
      </div>
      {watchlists && (
        <div className="min-h-[calc(100vh-300px)]">
          {watchlists.map((w, i) => {
            return (
              <div key={i} className="!max-w-full lg:min-w-[980px] mt-8 ">
                <div className="flex items-center justify-between border-b-small mb-2">
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
                    <div className="px-6">
                      <p className="">no movies yet</p>
                      <Link href="/all-movies">Add movies</Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <Pagination
            total={initialData.totalPages}
            initialPage={1}
            className="mt-8"
            size="sm"
            onChange={(p) => {
              setPage(p - 1);
            }}
          />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default MyWatchlists;

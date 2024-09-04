/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import { Pagination } from "@nextui-org/react";
import WatchlistList from "./adminComponents/WatchlistList";

const AdminWatchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [page, setPage] = useState(0);
  const { fetchWatchlists } = useAppContext();

  const updateWatchlists = () => {
    fetchWatchlists(page).then((res) => {
      setWatchlist(res.data.watchlists);
    });
  };

  useEffect(() => {
    fetchWatchlists(page).then((res) => {
      setInitialData(res.data);
      setWatchlist(res.data.watchlists);
    });
  }, [page]);

  return (
    <div className="px-2 flex flex-col mx-auto">
      <p className="lg:text-2xl text-xl mt-8 font-semibold py-4 text-textColor">
        Watchlists
      </p>

      <div className="relative min-h-[500px] w-[200px] sm:w-[400px] md:w-[400px] lg:max-w-[700px] lg:min-w-[600px] overflow-x-scroll xl:overflow-x-hidden ">
        <WatchlistList
          watchlists={watchlist}
          updateWatchlists={updateWatchlists}
        />
        {watchlist.length === 0 && (
          <div className="flex justify-center items-center mt-40 text-textColor">
            <p>Watchlist not found</p>
          </div>
        )}
      </div>
      {watchlist.length > 0 && (
        <Pagination
          total={initialData.totalPages}
          initialPage={1}
          size="sm"
          className="mt-8"
          onChange={(p) => {
            setPage(p - 1);
          }}
        />
      )}
    </div>
  );
};

export default AdminWatchlist;

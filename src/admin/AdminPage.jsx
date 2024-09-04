/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import UsersIcon from "../assets/icons/UsersIcon";
import MovieIcon from "../assets/icons/MovieIcon";
import ReviewIcon from "../assets/icons/ReviewIcon";
import WatchlistIcon from "../assets/icons/WatchlistIcon";
import StatsBox from "./adminComponents/StatsBox";
import CategoryPieChart from "./adminComponents/CategoryPieChart";
import AdminPopularMoviesList from "./adminComponents/AdminPopularMoviesList";
import WorldMap from "./adminComponents/WorldMap";

const AdminPage = () => {
  const {
    fetchUserCount,
    fetchMovieCount,
    fetchReviewCount,
    fetchWatchlistCount,
    fetchPopularMovies,
  } = useAppContext();
  const [userCount, setUserCount] = useState(0);
  const [movieCount, setMovieCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [watchlistCount, setWatchlistCount] = useState(0);
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    fetchUserCount().then((res) => {
      setUserCount(res.data.totalItems);
    });
    fetchMovieCount().then((res) => {
      setMovieCount(res.data.totalItems);
    });
    fetchReviewCount().then((res) => {
      setReviewCount(res.data.totalItems);
    });
    fetchWatchlistCount().then((res) => {
      setWatchlistCount(res.data.totalItems);
    });
    fetchPopularMovies(0, 3).then((res) => {
      setPopularMovies(res.data.movies);
    });
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-64px))] w-full mt-4 px-4 md:px-8 items-center text-center lg:items-start">
      <div className="dashboard py-8 text-start">
        <p className="font-bold text-textColor text-2xl">Moviever Dashboard</p>
        <p className="text-textColor">Welcome to your dashboard</p>
      </div>

      <div className="grid mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-6 lg:grid-rows-4">
        <div className="p-4 lg:col-span-1 lg:row-span-1">
          <StatsBox
            count={userCount}
            label={"USERS"}
            icon={<UsersIcon className="w-8" />}
          />
        </div>
        <div className="p-4 lg:col-span-1 lg:row-span-1 lg:col-start-2 lg:row-start-1">
          <StatsBox
            count={movieCount}
            label={"MOVIES"}
            icon={<MovieIcon className="w-8" />}
          />
        </div>
        <div className="p-4 lg:col-span-1 lg:row-span-1 lg:col-start-1  lg:row-start-2">
          <StatsBox
            count={reviewCount}
            label={"REVIEWS"}
            icon={<ReviewIcon className="w-8" />}
          />
        </div>
        <div className="p-4 lg:col-span-1 lg:row-span-1 lg:col-start-2  lg:row-start-2 ">
          <StatsBox
            count={watchlistCount}
            label={"WATCHLIST"}
            icon={<WatchlistIcon className="w-8" />}
          />
        </div>

        <div className=" p-4 lg:col-span-4 lg:row-span-1 lg:col-start-3 lg:row-start-1">
          {popularMovies.length > 0 && (
            <AdminPopularMoviesList movies={popularMovies} />
          )}
          {popularMovies.length === 0 && (
            <p className="text-textColor">no movies yet</p>
          )}
        </div>

        <div className="p-4 lg:col-span-2 lg:row-span-2 lg:col-start-1 lg:row-start-3 ">
          <CategoryPieChart />
        </div>
        <div className="p-4 lg:col-span-4 lg:row-span-2 lg:col-start-3 lg:row-start-2 ">
          <WorldMap />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

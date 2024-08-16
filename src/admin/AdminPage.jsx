/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import UsersIcon from "../assets/icons/UsersIcon";
import MovieIcon from "../assets/icons/MovieIcon";
import ReviewIcon from "../assets/icons/ReviewIcon";
import WatchlistIcon from "../assets/icons/WatchlistIcon";
import StatsBox from "./adminComponents/StatsBox";
import CategoryPieChart from "./adminComponents/CategoryPieChart";

const AdminPage = () => {
  const {
    fetchUserCount,
    fetchMovieCount,
    fetchReviewCount,
    fetchWatchlistCount,
  } = useAppContext();
  const [userCount, setUserCount] = useState(0);
  const [movieCount, setMovieCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [watchlistCount, setWatchlistCount] = useState(0);

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
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-64px))] w-full mt-4 px-4 md:px-8 items-center text-center lg:items-start">
      <div className="dashboard py-8 text-start">
        <p className="font-bold text-textColor text-2xl">Moviever Dashboard</p>
        <p className="text-textColor">Welcome to your dashboard</p>
      </div>

      <div className=" flex flex-col  gap-10">
        <div className="counts flex flex-col lg:flex-row justify-center items-center gap-4">
          <StatsBox
            count={userCount}
            label={"USERS"}
            icon={<UsersIcon className="w-8" />}
          />
          <StatsBox
            count={movieCount}
            label={"MOVIES"}
            icon={<MovieIcon className="w-8" />}
          />
          <StatsBox
            count={reviewCount}
            label={"REVIEWS"}
            icon={<ReviewIcon className="w-8" />}
          />
          <StatsBox
            count={watchlistCount}
            label={"WATCHLIST"}
            icon={<WatchlistIcon className="w-8" />}
          />
        </div>
        <div className="category-movies lg:w-[550px] w-[200px] sm:w-[250px] md:w-[350px]">
          <CategoryPieChart />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

/* eslint-disable no-unused-vars */
import { Image, Link } from "@nextui-org/react";

import metricsIcon from "../assets/icons/metrics-icon.png";
import menuIcon from "../assets/icons/menu-icon.png";

import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import AddUserIcon from "../assets/icons/AddUserIcon";
import AuthIcon from "../assets/icons/AuthIcon";
import UsersIcon from "../assets/icons/UsersIcon";
import MovieIcon from "../assets/icons/MovieIcon";
import AddIcon from "../assets/icons/AddIcon";
import PieChartIcon from "../assets/icons/PieChartIcon";
import BarChartIcon from "../assets/icons/BarChartIcon";
import DeleteUserIcon from "../assets/icons/DeleteUserIcon";
import HomeIcon from "../assets/icons/HomeIcon";
import MenuIcon from "../assets/icons/MenuIcon";
import WatchlistIcon from "../assets/icons/WatchlistIcon";
import ReviewIcon from "../assets/icons/ReviewIcon";
import UserActivityLog from "../assets/icons/UserActivityLogIcon";
import UserActivityLogIcon from "../assets/icons/UserActivityLogIcon";
import ErrorLogIcon from "../assets/icons/ErroLogIcon";

const AdminSidebar = () => {
  const { user } = useAppContext();

  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`flex flex-col pb-10 bg-sidebarBg min-h-full text-textColor transition-width duration-300 ${
        isOpen ? "w-48" : "w-[79px]"
      }`}
    >
      <div className={`flex p-2 ${isOpen ? "justify-end" : "justify-center"}`}>
        <button
          onClick={toggleSidebar}
          className="text-textColor focus:outline-none"
        >
          <MenuIcon className="w-8" />
        </button>
      </div>

      {isOpen && (
        <div className="flex items-center flex-col gap-1 justify-center my-4">
          <h3 className="font-bold text-lg">{user}</h3>
          {/* BURAYA ROLE GELECEK */}
          <p>Admin</p>
        </div>
      )}

      <div className="flex flex-col items-start mt-4 space-y-4">
        <a
          href="/admin"
          className={`flex ${
            isOpen ? "px-4" : "justify-center"
          } py-2 hover:bg-gray-700 w-full text-textColor`}
        >
          <HomeIcon />
          {isOpen && <span className="ml-4">Dashboard</span>}
        </a>

        <div className="flex flex-col mt-4 space-y-4 w-full">
          <div
            className={`menu-label flex gap-4 ${
              isOpen ? "px-4" : "justify-center"
            } items-center`}
          >
            <p className="">Users</p>
          </div>

          <div className="w-full">
            <Link
              href="/admin/users"
              className={`flex text-textColor ${
                isOpen ? "px-4" : "justify-center"
              } py-2 hover:bg-gray-700 w-full`}
            >
              <UsersIcon />
              {isOpen && <span className="ml-4">User List</span>}
            </Link>
          </div>
        </div>

        <div className="flex flex-col mt-4 space-y-4 w-full">
          <div
            className={`menu-label flex gap-4 ${
              isOpen ? "px-4" : "justify-center"
            } items-center`}
          >
            <p className="">Movies</p>
          </div>

          <div className="w-full">
            <Link
              href="/admin/movies"
              className={`flex text-textColor ${
                isOpen ? "px-4" : "justify-center"
              } py-2 hover:bg-gray-700 w-full`}
            >
              <MovieIcon />
              {isOpen && <span className="ml-4">Movie List</span>}
            </Link>
            <Link
              href="/admin/add-movies"
              className={`flex text-textColor ${
                isOpen ? "px-4" : "justify-center"
              } py-2 hover:bg-gray-700 w-full`}
            >
              <AddIcon />
              {isOpen && <span className="ml-4">Add Movie</span>}
            </Link>
          </div>
        </div>

        <div className="flex flex-col mt-4 space-y-4 w-full">
          <div
            className={`menu-label flex gap-4 ${
              isOpen ? "px-4" : "justify-center"
            } items-center`}
          >
            <p className="">Watchlist</p>
          </div>

          <div className="w-full">
            <Link
              href="/admin/watchlists"
              className={`flex text-textColor ${
                isOpen ? "px-4" : "justify-center"
              } py-2 hover:bg-gray-700 w-full`}
            >
              <WatchlistIcon />
              {isOpen && <span className="ml-4">Watchlist List</span>}
            </Link>
          </div>
        </div>

        <div className="flex flex-col mt-4 space-y-4 w-full">
          <div
            className={`menu-label flex gap-4 ${
              isOpen ? "px-4" : "justify-center"
            } items-center`}
          >
            <p className="">Reviews</p>
          </div>

          <div className="w-full">
            <Link
              href="/admin/reviews"
              className={`flex text-textColor ${
                isOpen ? "px-4" : "justify-center"
              } py-2 hover:bg-gray-700 w-full`}
            >
              <ReviewIcon />
              {isOpen && <span className="ml-4">Review List</span>}
            </Link>
          </div>
        </div>

        <div className="flex flex-col mt-4 space-y-4 w-full">
          <div
            className={`flex text-textColor ${
              isOpen ? "px-4" : "justify-center"
            } py-2 hover:bg-gray-700 w-full`}
          >
            <p className="">Logs</p>
          </div>

          <div className="w-full">
            <Link
              href="/admin/user-logs"
              className={`flex text-textColor ${
                isOpen ? "px-4" : "justify-center"
              } py-2 hover:bg-gray-700 w-full`}
            >
              <UserActivityLogIcon />
              {isOpen && <span className="ml-4"> User Activity Logs</span>}
            </Link>
            <Link
              href="/admin/auth-logs"
              className={`flex text-textColor ${
                isOpen ? "px-4" : "justify-center"
              } py-2 hover:bg-gray-700 w-full`}
            >
              <AuthIcon />
              {isOpen && <span className="ml-4">Auth Logs</span>}
            </Link>
            <Link
              href="/admin/error-logs"
              className={`flex text-textColor ${
                isOpen ? "px-4" : "justify-center"
              } py-2 hover:bg-gray-700 w-full`}
            >
              <ErrorLogIcon />
              {isOpen && <span className="ml-4">Error Logs</span>}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;

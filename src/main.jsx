import { createRoot } from "react-dom/client";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import SignIn from "./pages/SignIn.jsx";
import Register from "./pages/Register.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Home from "./pages/Home.jsx";
import { AppProvider } from "./context/appContext.jsx";
import MovieDetail from "./pages/MovieDetail.jsx";
import Movies from "./pages/Movies.jsx";
import Category from "./pages/Category.jsx";
import VerificationSuccess from "./pages/VerificationSuccess.jsx";
import VerificationFailed from "./pages/VerificationFailed.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import Logout from "./pages/Logout.jsx";
import About from "./pages/About.jsx";
import MyWatchlists from "./pages/MyWatchlists.jsx";
import WatchlistDetail from "./pages/WatchlistDetail.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import AdminLayout from "./admin/AdminLayout.jsx";
import AdminUsers from "./admin/AdminUsers.jsx";
import AdminMovies from "./admin/AdminMovies.jsx";
import AdminPage from "./admin/AdminPage.jsx";
import AdminAddMovie from "./admin/AdminAddMovie.jsx";
import AdminWatchlist from "./admin/AdminWatchlist.jsx";
import AdminReviews from "./admin/AdminReviews.jsx";
import AdminUserLogs from "./admin/AdminUserLogs.jsx";
import AdminErrorLogs from "./admin/AdminErrorLogs.jsx";
import NotFound from "./pages/NotFound.jsx";
import AdminAuthLogs from "./admin/AdminAuthLogs.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Landing />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verification-success" element={<VerificationSuccess />} />
      <Route path="/verification-failed" element={<VerificationFailed />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/about" element={<About />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/new-movies"
        element={
          <ProtectedRoute>
            <Movies />
          </ProtectedRoute>
        }
      />
      <Route
        path="/watchlists"
        element={
          <ProtectedRoute>
            <MyWatchlists />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminPage />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="movies" element={<AdminMovies />} />
        <Route path="add-movies" element={<AdminAddMovie />} />
        <Route path="watchlists" element={<AdminWatchlist />} />
        <Route path="reviews" element={<AdminReviews />} />
        <Route path="user-logs" element={<AdminUserLogs />} />
        <Route path="auth-logs" element={<AdminAuthLogs />} />
        <Route path="error-logs" element={<AdminErrorLogs />} />
      </Route>
      <Route
        path="/profile/me"
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/watchlists/:watchlistId"
        element={
          <ProtectedRoute>
            <WatchlistDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/most-liked-movies"
        element={
          <ProtectedRoute>
            <Movies />
          </ProtectedRoute>
        }
      />
      <Route
        path="/popular-movies"
        element={
          <ProtectedRoute>
            <Movies />
          </ProtectedRoute>
        }
      />
      <Route
        path="/all-movies"
        element={
          <ProtectedRoute>
            <Movies />
          </ProtectedRoute>
        }
      />
      <Route
        path="/movies/category/:categoryName"
        element={
          <ProtectedRoute>
            <Category />
          </ProtectedRoute>
        }
      />
      <Route
        path="/movies/:movieId"
        element={
          <ProtectedRoute>
            <MovieDetail />
          </ProtectedRoute>
        }
      />
      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <NextUIProvider>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </NextUIProvider>
);
// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <NextUIProvider className="">
//       <App />
//     </NextUIProvider>
//   </React.StrictMode>
// );

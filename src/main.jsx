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

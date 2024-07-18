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
import {
  fetchMovieDetailsWithMovieId,
  fetchNewMovies,
  fetchPopularMovies,
} from "./service/appClient.js";
import MovieDetail from "./pages/MovieDetail.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Landing />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/home"
        loader={async () => {
          const newMovies = await fetchNewMovies();
          const popularMovies = await fetchPopularMovies();
          return {
            newMovies: newMovies.data,
            popularMovies: popularMovies.data,
          };
        }}
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/movies/:movieId"
        element={<MovieDetail />}
        loader={async ({ params }) => {
          const movieDetails = await fetchMovieDetailsWithMovieId(
            params.movieId
          );
          return movieDetails.data;
        }}
      />
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

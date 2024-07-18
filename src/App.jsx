// import {
//   BrowserRouter,
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
//   RouterProvider,
//   Routes,
// } from "react-router-dom";
// import Landing from "./pages/Landing";
// import SignIn from "./pages/SignIn";
// import Register from "./pages/Register";
// import { AppProvider } from "./context/appContext";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Home from "./pages/Home";
// import axios from "axios";

// const fetchNewMovies = async () => {
//   // TODO token ekle
//   return axios.get("/movies/new-movies");
// };

// // createRoot(document.getElementById("root")).render(
// //   <AppProvider>
// //     <RouterProvider router={router} />
// //   </AppProvider>
// // );

// function App() {
//   // const { fetchNewMovies } = useAppContext();
//   return (
//     <AppProvider>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Landing />} />
//           <Route path="/sign-in" element={<SignIn />} />
//           <Route path="/register" element={<Register />} />
//           <Route
//             path="/home"
//             loader={async () => {
//               const newMovies = await fetchNewMovies();
//               return newMovies.data;
//             }}
//             element={
//               <ProtectedRoute>
//                 <Home />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/movies/:movieId"
//             loader={async ({ params }) => {
//               return;
//             }}
//             element={
//               <ProtectedRoute>
//                 <Home />
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       </BrowserRouter>
//     </AppProvider>
//   );
// }

// export default App;
export default "";

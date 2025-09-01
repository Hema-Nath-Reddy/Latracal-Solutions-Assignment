import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import WatchList from "./pages/WatchList";
import MovieDetail from "./pages/MovieDetai";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";

function App() {
  const routes = [
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/movies",
          element: <Movies />,
        },
        {
          path: "/watchlist",
          element: <WatchList />,
        },
        {
          path: "/profile",
          element: <Profile />,
        } /* ,
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
        {
          path: "/movieDetail",
          element: <MovieDetail />,
        } */,
      ],
    },
  ];

  const router = createBrowserRouter(routes);
  return (
    <h1 className="bg-gray-950">
      <RouterProvider router={router} />
    </h1>
  );
}

export default App;

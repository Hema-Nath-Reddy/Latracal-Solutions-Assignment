import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./Layout";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import WatchList from "./pages/WatchList";
import MovieDetail from "./pages/MovieDetail";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { AuthProvider, ProtectedRoute } from "./Hooks/useAuth";

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
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },

        {
          path: "/movieDetail/:id",
          element: <MovieDetail />,
        },
      ],
    },
  ];

  const router = createBrowserRouter(routes);
  return (
    <div className="bg-gray-950">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      <Toaster />
    </div>
  );
}

export default App;

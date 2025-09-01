import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWatchlist,
  fetchWatchlistMovies,
  removeFromWatchlist,
} from "../store/movieSlice";
import { useAuth } from "../Hooks/useAuth";

const Watchlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useAuth();
  const watchlist = useSelector((state) => state.movies.watchlist);
  const watchlistMovies = useSelector((state) => state.movies.watchlistMovies);
  const status = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);

  // Fetch watchlist IDs when the user authenticates
  useEffect(() => {
    if (isAuthenticated && user?.id) {
      dispatch(fetchWatchlist(user.id));
    }
  }, [dispatch, isAuthenticated, user?.id]);

  // Fetch movie details when the watchlist IDs change
  useEffect(() => {
    if (watchlist.length > 0) {
      dispatch(fetchWatchlistMovies(watchlist));
    }
  }, [dispatch, watchlist]);

  const handleRemoveFromWatchlist = (e, movieId) => {
    e.stopPropagation();
    if (isAuthenticated && user?.id) {
      dispatch(removeFromWatchlist({ userId: user.id, movieId }));
    }
  };

  if (status === "loading") {
    return (
      <div className="text-white text-center p-8">Loading watchlist...</div>
    );
  }

  if (status === "failed") {
    return (
      <div className="text-red-500 text-center p-8">
        Error: {error?.status_message || "Something went wrong"}
      </div>
    );
  }

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#141414] dark group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 sm:px-6 lg:px-8 xl:px-40 flex flex-1 justify-center py-8">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap items-center justify-between gap-4 p-4">
              <h1 className="text-white tracking-tight text-4xl font-bold leading-tight">
                My Watchlist
              </h1>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(158px,1fr))] gap-x-4 gap-y-8 p-4">
              {watchlistMovies.length > 0 ? (
                watchlistMovies.map((item) => (
                  <div
                    key={item.id}
                    className="cursor-pointer flex flex-col gap-3 group relative"
                  >
                    <div className="relative">
                      <div
                        className="w-full bg-center bg-no-repeat aspect-[2/3] bg-cover rounded-md"
                        style={{
                          backgroundImage: `url(https://image.tmdb.org/t/p/w500/${item.poster_path})`,
                        }}
                      ></div>
                      <button
                        onClick={(e) => handleRemoveFromWatchlist(e, item.id)}
                        className="absolute top-2 right-2 flex items-center justify-center w-8 h-8 rounded-full bg-black/60 text-white opacity-100 transition-opacity"
                        title="Remove from watchlist"
                      >
                        <svg
                          fill="none"
                          height="20"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          width="20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </button>
                    </div>
                    <p className="text-white text-base font-medium leading-normal">
                      {item.title}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center">
                  Your watchlist is empty.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watchlist;

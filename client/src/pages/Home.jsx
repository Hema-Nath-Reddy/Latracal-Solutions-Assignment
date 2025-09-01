import React, { useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovies,
  fetchWatchlist,
  addToWatchlist,
  removeFromWatchlist,
} from "../store/movieSlice";
import { useAuth } from "../Hooks/useAuth";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useAuth();
  const movieData = useSelector((state) => state.movies.data);
  const watchlist = useSelector((state) => state.movies.watchlist);
  const status = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);
  const featuredMovie = movieData?.[0];

  useEffect(() => {
    dispatch(fetchMovies({ page: 1 }));
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      dispatch(fetchWatchlist(user.id));
    }
  }, [dispatch, isAuthenticated, user?.id]);

  const watchlistSet = useMemo(() => {
    return new Set((watchlist || []).map((id) => Number(id)));
  }, [watchlist]);

  const isMovieInWatchlist = useCallback(
    (movieId) => watchlistSet.has(Number(movieId)),
    [watchlistSet]
  );

  // Corrected handleToggleWatchlist function
  const handleToggleWatchlist = useCallback(
    (e, movieId) => {
      e.stopPropagation();
      if (!isAuthenticated || !user?.id) {
        navigate("/login");
        return;
      }
      if (isMovieInWatchlist(movieId)) {
        // Corrected key name
        dispatch(removeFromWatchlist({ userId: user.id, movieId }));
      } else {
        // Corrected key name
        dispatch(addToWatchlist({ userId: user.id, movieId }));
      }
    },
    [dispatch, isAuthenticated, user?.id, navigate, isMovieInWatchlist]
  );

  const primaryColor = "#ea2a33";
  if (status === "loading") {
    return <div className="text-white text-center p-8">Loading movies...</div>;
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
      className="relative flex size-full min-h-screen flex-col text-white dark group/design-root overflow-x-hidden"
      style={{
        fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif',
        "--primary-color": primaryColor,
      }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <main className="flex-1">
          {featuredMovie && (
            <section
              className="relative min-h-[60vh] lg:min-h-[75vh] flex items-end p-4 sm:p-6 lg:p-12 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `linear-gradient(to top, rgba(17, 17, 17, 0.9) 10%, rgba(17, 17, 17, 0) 50%), url(https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path})`,
              }}
            >
              <div className="w-full max-w-4xl space-y-4">
                <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tighter">
                  {featuredMovie.title}
                </h1>
                <p className="text-gray-300 text-sm sm:text-base lg:text-lg max-w-2xl">
                  {featuredMovie.overview}
                </p>
                <button
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-12 px-6 bg-[var(--primary-color)] text-white text-base font-bold leading-normal tracking-wide hover:bg-red-700 transition-colors"
                  onClick={() => navigate(`/moviedetail/${featuredMovie.id}`)}
                >
                  <span className="truncate">Watch Now</span>
                </button>
              </div>
            </section>
          )}

          <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
            <h2 className="text-white text-2xl sm:text-3xl font-bold leading-tight tracking-tight mb-6">
              Trending Now
            </h2>
            <div className="cursor-pointer grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
              {movieData?.slice(6, 14).map((movie) => {
                const inWatchlist = isMovieInWatchlist(movie.id);
                return (
                  <div
                    key={movie.id}
                    className="group flex flex-col gap-3 relative"
                  >
                    {isAuthenticated && (
                      <button
                        onClick={(e) => handleToggleWatchlist(e, movie.id)}
                        className={`absolute top-2 right-2 flex items-center justify-center w-8 h-8 rounded-full ${
                          inWatchlist
                            ? "bg-red-600 text-white"
                            : "bg-black/60 text-white"
                        } hover:bg-gray-800 transition-colors z-10`}
                        title={
                          inWatchlist ? "In Watchlist" : "Add to Watchlist"
                        }
                        aria-pressed={inWatchlist}
                        aria-label={
                          inWatchlist
                            ? "Remove from watchlist"
                            : "Add to watchlist"
                        }
                      >
                        <svg
                          fill="currentColor"
                          height="20px"
                          viewBox="0 0 256 256"
                          width="20px"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Zm0,177.57-51.77-32.35a8,8,0,0,0-8.48,0L72,209.57V48H184Z"></path>
                        </svg>
                      </button>
                    )}
                    <div
                      onClick={() => navigate(`/moviedetail/${movie.id}`)}
                      className="w-full bg-center bg-no-repeat aspect-[2/3] bg-cover rounded-md flex flex-col overflow-hidden transform transition-transform duration-300 group-hover:scale-105"
                      style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`,
                      }}
                    />
                    <p className="text-white text-sm font-medium leading-normal truncate">
                      {movie.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;

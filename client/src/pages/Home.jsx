import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../store/movieSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const movieData = useSelector((state) => state.movies.data);
  const status = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);
  const featuredMovie = movieData && movieData[0];

  useEffect(() => {
    dispatch(fetchMovies({ page: 1 }));
  }, [dispatch]);

  useEffect(() => {
    if (status === "succeeded" && movieData) {
      console.log(
        "Movie data successfully fetched and is available:",
        movieData
      );
    }
  }, [movieData, status]);

  const primaryColor = "#ea2a33";
  if (status === "loading") {
    return <div className="text-white text-center p-8">Loading movies...</div>;
  }

  if (status === "failed") {
    return (
      <div className="text-red-500 text-center p-8">
        Error: {error ? error.status_message : "Something went wrong"}
      </div>
    );
  }

  return (
    <div
      className="relative flex size-full min-h-screen flex-col text-white dark group/design-root overflow-x-hidden "
      style={{
        fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif',
        "--primary-color": primaryColor,
      }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <main className="flex-1">
          {/* Hero Section */}
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
                  onClick={() => {
                    navigate(`/moviedetail/${featuredMovie.id}`);
                  }}
                >
                  <span className="truncate">Watch Now</span>
                </button>
              </div>
            </section>
          )}

          {/* Trending Section */}
          <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
            <h2 className="text-white text-2xl sm:text-3xl font-bold leading-tight tracking-tight mb-6">
              Trending Now
            </h2>
            <div className="cursor-pointer grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
              {movieData &&
                movieData.slice(6, 14).map((movie) => (
                  <div
                    key={movie.id}
                    className="group flex flex-col gap-3"
                    onClick={() => {
                      navigate(`/moviedetail/${movie.id}`);
                    }}
                  >
                    <div
                      className="w-full bg-center bg-no-repeat aspect-[2/3] bg-cover rounded-md flex flex-col overflow-hidden transform transition-transform duration-300 group-hover:scale-105"
                      style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`,
                      }}
                    />
                    <p className="text-white text-sm font-medium leading-normal truncate">
                      {movie.title}
                    </p>
                  </div>
                ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;

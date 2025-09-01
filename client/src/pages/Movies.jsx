import React, { useState, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, addToWatchlist } from "../store/movieSlice";
import { useAuth } from "../Hooks/useAuth"; // Import the useAuth hook

const Movies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useAuth(); // Use the auth hook
  const movieData = useSelector((state) => state.movies.data);
  const status = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm.trim() !== "") {
        dispatch(fetchMovies({ query: searchTerm, page: 1 }));
      } else {
        dispatch(fetchMovies({ page: 1 }));
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [dispatch, searchTerm]);

  const handleAddToWatchlist = (e, movieId) => {
    e.stopPropagation(); // Prevents the card's onClick from firing
    if (isAuthenticated && user) {
      dispatch(addToWatchlist({ userId: user.id, movieId }));
    } else {
      navigate("/login");
    }
  };

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
      className="relative flex size-full min-h-screen flex-col bg-[#141414] dark group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1">
          <aside className="hidden lg:flex flex-col w-64 border-r border-gray-800 p-4">
            <div className="px-4 py-3">
              <label className="flex flex-col min-w-40 h-12 w-full">
                <div className="flex w-full flex-1 items-stretch rounded-md h-full">
                  <div className="text-gray-400 flex border border-gray-700 bg-gray-800 items-center justify-center pl-3 rounded-l-md border-r-0">
                    <Search />
                  </div>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-md text-white focus:outline-0 focus:ring-2 focus:ring-[#ea2a33] border border-gray-700 bg-gray-800 focus:border-[#ea2a33] h-full placeholder:text-gray-400 px-3 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal"
                    placeholder="Search movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </label>
            </div>
            <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              Filters
            </h3>
            <div className="flex flex-col p-4 gap-4">
              <details
                className="flex flex-col rounded-md border border-gray-700 bg-gray-800 group"
                open=""
              >
                <summary className="flex cursor-pointer items-center justify-between gap-6 p-3 list-none">
                  <p className="text-white text-sm font-medium leading-normal">
                    Genre
                  </p>
                  <div className="text-white transition-transform duration-300 group-open:rotate-180">
                    <ChevronDown />
                  </div>
                </summary>
                <div className="px-3 pb-3">
                  <p className="text-gray-400 text-sm font-normal leading-normal">
                    Action, Comedy, Drama, Thriller, Sci-Fi
                  </p>
                </div>
              </details>
              <details className="flex flex-col rounded-md border border-gray-700 bg-gray-800 group">
                <summary className="flex cursor-pointer items-center justify-between gap-6 p-3 list-none">
                  <p className="text-white text-sm font-medium leading-normal">
                    Year
                  </p>
                  <div className="text-white transition-transform duration-300 group-open:rotate-180">
                    <ChevronDown />
                  </div>
                </summary>
                <div className="px-3 pb-3">
                  <p className="text-gray-400 text-sm font-normal leading-normal">
                    2023, 2022, 2021, 2020, 2019
                  </p>
                </div>
              </details>
              <details className="flex flex-col rounded-md border border-gray-700 bg-gray-800 group">
                <summary className="flex cursor-pointer items-center justify-between gap-6 p-3 list-none">
                  <p className="text-white text-sm font-medium leading-normal">
                    Rating
                  </p>
                  <div className="text-white transition-transform duration-300 group-open:rotate-180">
                    <ChevronDown />
                  </div>
                </summary>
                <div className="px-3 pb-3">
                  <p className="text-gray-400 text-sm font-normal leading-normal">
                    9+, 8+, 7+, 6+
                  </p>
                </div>
              </details>
            </div>
            <div className="flex px-4 py-3 justify-end">
              <button className="flex min-w-[84px] w-full max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-10 px-4 bg-[#ea2a33] hover:bg-red-700 transition-colors text-white text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">Apply Filters</span>
              </button>
            </div>
          </aside>
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
              <h1 className="text-white tracking-light text-3xl sm:text-4xl font-bold leading-tight min-w-72">
                Movies
              </h1>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
              {movieData &&
                movieData.map((movie, index) => (
                  <div
                    key={index}
                    className="cursor-pointer group flex flex-col gap-2 relative"
                  >
                    {isAuthenticated && (
                      <button
                        onClick={(e) => handleAddToWatchlist(e, movie.id)}
                        className="absolute top-2 right-2 flex items-center justify-center w-8 h-8 rounded-full bg-black/60 text-white hover:bg-gray-800 transition-colors z-10"
                        title="Add to Watchlist"
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
                      onClick={() => {
                        navigate(`/moviedetail/${movie.id}`);
                      }}
                      className="w-full bg-center bg-no-repeat aspect-[2/3] bg-cover rounded-md overflow-hidden transform group-hover:scale-105 transition-transform duration-300"
                      style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`,
                      }}
                    ></div>
                    <h4 className="text-white text-sm font-semibold truncate">
                      {movie.title}
                    </h4>
                  </div>
                ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Movies;

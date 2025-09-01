import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieDetail, fetchMovieCast } from "../store/movieSlice";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const movie = useSelector((state) => state.movies.selectedMovie);
  const cast = useSelector((state) => state.movies.cast); // Access the new cast state
  const status = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);

  // Dispatch both thunks when the component mounts
  useEffect(() => {
    dispatch(fetchMovieDetail(id));
    dispatch(fetchMovieCast(id)); // Dispatch the new cast thunk
  }, [dispatch, id]);

  const primaryColor = "#ea2a33";

  if (status === "loading" || !movie) {
    return (
      <div className="text-white text-center p-8">Loading movie details...</div>
    );
  }

  if (status === "failed") {
    return (
      <div className="text-red-500 text-center p-8">
        Error: {error ? error.status_message : "Something went wrong"}
      </div>
    );
  }

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`h-5 w-5 ${i < rating ? "text-red-500" : "text-gray-600"}`}
          fill="currentColor"
          viewBox="0 0 256 256"
          width="20px"
          height="20px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path>
        </svg>
      );
    }
    return stars;
  };

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-gray-950 dark group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <main className="flex-1">
          <section className="relative h-[60vh] w-full">
            <div className="absolute inset-0 bg-black/50"></div>
            <img
              alt={movie.title}
              className="h-full w-full object-cover"
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16">
              <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl drop-shadow-lg">
                {movie.title}
              </h1>
              <p className="mt-2 text-base text-gray-300 md:text-lg">
                {movie.release_date} •{" "}
                {movie.genres?.map((g) => g.name).join(", ")} •{" "}
                {movie.vote_average} • {movie.runtime}m
              </p>
              <div className="mt-6">
                <button className="inline-flex items-center justify-center gap-2 rounded-md bg-red-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-100">
                  <svg
                    fill="currentColor"
                    height="20px"
                    viewBox="0 0 256 256"
                    width="20px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M232.4,114.49,88.32,26.35a16,16,0,0,0-16.2-.3A15.86,15.86,0,0,0,64,39.87V216.13A15.94,15.94,0,0,0,80,232a16.07,16.07,0,0,0,8.36-2.35L232.4,141.51a15.81,15.81,0,0,0,0-27ZM80,215.94V40l143.83,88Z"></path>
                  </svg>
                  <span>Watch Trailer</span>
                </button>
              </div>
            </div>
          </section>

          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <section className="mt-8">
              <h2 className="text-2xl font-bold text-white">Cast</h2>
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {cast?.slice(0, 6).map((member) => (
                  <div
                    key={member.id}
                    className="flex flex-col items-center gap-2"
                  >
                    <div
                      className="h-48 w-32 rounded-lg bg-cover bg-center bg-no-repeat shadow-md"
                      style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/w500/${member.profile_path})`,
                      }}
                    ></div>
                    <p className="text-center text-sm font-medium text-white">
                      {member.name}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-12">
              <h2 className="text-2xl font-bold text-white">Reviews</h2>
              <div className="mt-6 space-y-8">
                {movie.reviews?.map((review) => (
                  <div
                    key={review._id}
                    className="rounded-lg border border-gray-800 bg-gray-900 p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="h-12 w-12 flex-shrink-0 rounded-full bg-cover bg-center"
                        style={{
                          backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAYHw36rNFFW09BvMR_7wiD7g4gY8e1acwFROSNFc1Ln0mPoeUeN8tamlq1niVimv2cfBtJ85-Mgh6hJa9xZn8J-vbQjQleHzoKDKQ_jYbaZbnoHMCP26rPNyza8wBdC3EnohA8KiiYZwq1XDsQMWi3HIsEVe2O-LNRNzSERzagnDWR3-nypBpa7wbS0OJy9W14VprgaAhY407vLEkbPlaK9kRW1IDYtoDtqhyfShrJ975OxAmKAI0FNULbRStDim8PkyqJI9NXpBA")`,
                        }}
                      ></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-white">
                              {review.author}
                            </p>
                            <p className="text-sm text-gray-400">
                              {new Date(review.timestamp).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-0.5">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                        <p className="mt-4 text-gray-300">
                          {review.reviewText}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-12">
              <h2 className="text-2xl font-bold text-white">
                Submit Your Review
              </h2>
              {/* Form to submit a new review */}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MovieDetail;

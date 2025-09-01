import React from "react";

const MovieDetail = () => {
  const cast = [
    {
      name: "Ethan Carter",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBph4xpH2pkFQb38cKf4e-2SAwrwK_xhtF0qHgmE8KabkH-ZgH4Ibens4ENOEDWNuOLHkNdPEqyZmtHxQRSueVOpfcdPq20tsHicl-5WRmbrdH_5sCd3DQZl6DXsks6eQTV0mPYumqXzwQrbPpdMbLLUjWnqIAkqs3Wotcr45EBJhxNJRhrYZsVhfh0rGUtAeSlkgpddF4R77CbWlhkc5PLaFDTVz-xsh-MkfJNy9FyeA4sraAxt3OtScsriepc6Yc8BV_muEp8GLk",
    },
    {
      name: "Marcus Reed",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCVaO2BU1PdUQPtankbOPI8by1hmRhYoSQwF0RjAurSHryx4InqByde_I1SPR9D5q3J6UoKzYjNZftkxiCehvKp_H0qnmOEWiAwcm1exbJOxx1TRFJA1jYD7ki2WUCJemsLQzhnfN4Ec1CZHVQe5frHxL8OP6va80AYshmNAHiv347-SzY7nAaGF_7Y6Mo0ibWPr0xJ5zy9hkPyg4o2u8q2LGI6iz4cBs1H9mPvO23VGOdj1J77lqjDZl3xvZpBpiakLPNe30NnEHA",
    },
    {
      name: "Olivia Hayes",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAGdb6j-PcWijR9ffqCZOwaBk1VcqQdARTuBNvBD2ee_9bpWeX1Qntx16e70WxVMX_lvcP8apNbxLO_tAcEpa3QYQP7MtwPYWdAOklMpoSEJMh-b9b8mmOQkhEHvkq_ZN9VOm7-PZ84oIKMGKPRyJljJ-WjBSW5kR-nr-a2jLtto38Bjxdo_S75EOo0GondokHA2ryjB4suC3u9i2Uw-DOnqdiAIFRKUF9Dj5dZNWYqjOeKFzjW0TxsWasmtJk2szSyoJvHfgJk-VA",
    },
    {
      name: "Noah Bennett",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBvBhwT1UI4UNGpe1xJdJiTv6g19HnHcxUCsh1yONTcXdBk2505RgfxM7zTiRmRzKhoseHwtWUbAhFlXCaS7RKfqQttFJb1ZHGrmP1Wc9ewDZoOxqRo8QqPgWIbnREZJRhnbyheG8PMZ3qtrrr2jE7l0o8yj9VU8XkNAyYCGfMw4XT0DGDUgtf8xZFE22v1Dhph7UZn10Q2bg_zacoh_FK1olIg1VhFv8Di-9RaTTZLyM0-bVrmJGTmxyVYM7azhDLBLApByoI2xFk",
    },
    {
      name: "Sophia Walker",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAYnNs240d7u6IjCMXOQO5Q2uQ43K-oE2m49HAbdtcGSTArYOOEF-P_IqvIeJglYps-izbTHntZ1Th-akcfCG5prklHm0b-b1PslzOAeru_b5IPD6p9BnKNxa54_Pw90hmGOLMi5H3wdvSGez5frXhUpa0MMxqJC3Jc0q2GiyAsqLluzOVuSIuH-r6qRrwC08dSxHQZlmXbFdeaa8G2dC2r_lXbo0FUur6c69AXFGeH20giw7QS7ZYTvAPT1JWh8l2qKlh5J8mQqTU",
    },
  ];

  const reviews = [
    {
      author: "Ava Harper",
      time: "2 months ago",
      rating: 5,
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAYHw36rNFFW09BvMR_7wiD7g4gY8e1acwFROSNFc1Ln0mPoeUeN8tamlq1niVimv2cfBtJ85-Mgh6hJa9xZn8J-vbQjQleHzoKDKQ_jYbaZbnoHMCP26rPNyza8wBdC3EnohA8KiiYZwq1XDsQMWi3HIsEVe2O-LNRNzSERzagnDWR3-nypBpa7wbS0OJy9W14VprgaAhY407vLEkbPlaK9kRW1IDYtoDtqhyfShrJ975OxAmKAI0FNULbRStDim8PkyqJI9NXpBA",
      text: "Absolutely breathtaking! The Crimson Tide is a cinematic masterpiece with stunning visuals and a gripping storyline. The performances are top-notch, and the action sequences are truly thrilling. A must-watch for any movie enthusiast!",
      likes: 12,
      dislikes: 2,
    },
    {
      author: "Liam Foster",
      time: "3 months ago",
      rating: 4,
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBmvShmIoBwEJP9-2WW_ddLewOqgXD2kX6YIBh3mlWWyuEnWZ-tThfxj5-wXSP_WhldQ5V6kC84fJd37hH-wXJ5WO3_U316c_s-2Shtr_o2XwA4rWce4atCKTmYAWxyTJdVGbmm2GSZxZMtUcyLNlL100U377dIzWw0VnQEwM4QQG5zcxVtkBWXa2ZZDiQWDddSnIaq2yIHNithV1x68pZ8TGvO5jXybSgEvwmwbWiWhl8pJiUGnZo9mNG-tnZkXPenNfAAykSEJWI",
      text: "The Crimson Tide is a solid action-adventure film with a compelling plot and strong performances. While it may not be groundbreaking, it's an enjoyable watch with plenty of excitement and suspense. Definitely worth checking out.",
      likes: 8,
      dislikes: 3,
    },
  ];

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
        {/* Main Content */}
        <main className="flex-1">
          <section className="relative h-[60vh] w-full">
            <div className="absolute inset-0 bg-black/50"></div>
            <img
              alt="Movie Poster"
              className="h-full w-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpU-bPBNkDcLuH1Me0vJe5Z63K2TTRTNvDbi36f51ym-srmeFyFpuBq-rhfy4ea0cVlHgwtVzpsnrsy6Afc2c4q3EeT0J7ECJFYw9tttRQ5iSoDt5fd0V6DfSKjePzthYwtCIwRcnEJdydkEfxceA289Ntb0EQOr5b3JvyHWXkUvBtD0uug2LMce1qv-0jVmwgtUAoPICE-ulggCA9kKhlKWGPk-lLAIpbXPfR80kwzNnEiAZJQmkCYXHGdSrZBN6E80okgUWNjmw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16">
              <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl drop-shadow-lg">
                The Crimson Tide
              </h1>
              <p className="mt-2 text-base text-gray-300 md:text-lg">
                2023 • Action, Adventure • PG-13 • 2h 15m
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
                {cast.map((member, index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <div
                      className="h-48 w-32 rounded-lg bg-cover bg-center bg-no-repeat shadow-md"
                      style={{ backgroundImage: `url("${member.image}")` }}
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
                {reviews.map((review, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-gray-800 bg-gray-900 p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="h-12 w-12 flex-shrink-0 rounded-full bg-cover bg-center"
                        style={{ backgroundImage: `url("${review.avatar}")` }}
                      ></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-white">
                              {review.author}
                            </p>
                            <p className="text-sm text-gray-400">
                              {review.time}
                            </p>
                          </div>
                          <div className="flex items-center gap-0.5">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                        <p className="mt-4 text-gray-300">{review.text}</p>
                        <div className="mt-4 flex items-center gap-6 text-gray-400">
                          <button className="flex items-center gap-2 hover:text-white">
                            <svg
                              fill="currentColor"
                              height="20px"
                              viewBox="0 0 256 256"
                              width="20px"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32ZM223.94,97l-12,96a8,8,0,0,1-7.94,7H88V105.89l36.71-73.43A24,24,0,0,1,144,56V80a8,8,0,0,0,8,8h64a8,8,0,0,1,7.94,9Z"></path>
                            </svg>
                            <span>{review.likes}</span>
                          </button>
                          <button className="flex items-center gap-2 hover:text-white">
                            <svg
                              fill="currentColor"
                              height="20px"
                              viewBox="0 0 256 256"
                              width="20px"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M239.82,157l-12-96A24,24,0,0,0,204,40H32A16,16,0,0,0,16,56v88a16,16,0,0,0,16,16H75.06l37.78,75.58A8,8,0,0,0,120,240a40,40,0,0,0,40-40V184h56a24,24,0,0,0,23.82-27ZM72,144H32V56H72Zm150,21.29a7.88,7.88,0,0,1-6,2.71H152a8,8,0,0,0-8,8v24a24,24,0,0,1-19.29,23.54L88,150.11V56H204a8,8,0,0,1,7.94,7l12,96A7.87,7.87,0,0,1,222,165.29Z"></path>
                            </svg>
                            <span>{review.dislikes}</span>
                          </button>
                        </div>
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
              <div className="mt-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
                <form>
                  <div className="space-y-6">
                    <div>
                      <label
                        className="text-base font-medium text-white"
                        htmlFor="rating"
                      >
                        Your Rating
                      </label>
                      <div className="mt-2 flex items-center gap-1 text-gray-500">
                        {renderStars(0)}{" "}
                        {/* Initial render for the rating buttons */}
                      </div>
                    </div>
                    <div>
                      <label
                        className="text-base font-medium text-white"
                        htmlFor="review"
                      >
                        Your Review
                      </label>
                      <textarea
                        className="mt-2 block w-full rounded-md border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:border-red-600 focus:ring-red-600 sm:text-sm"
                        id="review"
                        name="review"
                        placeholder="Share your thoughts on the movie..."
                        rows="4"
                      ></textarea>
                    </div>
                  </div>
                  <div className="mt-8 flex justify-end">
                    <button
                      className="inline-flex items-center justify-center gap-2 rounded-md bg-red-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-100"
                      type="submit"
                    >
                      Submit Review
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MovieDetail;

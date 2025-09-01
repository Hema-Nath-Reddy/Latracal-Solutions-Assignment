import React from "react";
import { Link } from "react-router-dom";
const Profile = () => {
  const reviews = [
    { movie: "The Midnight Bloom", rating: 4 },
    { movie: "Echoes of the Past", rating: 5 },
    { movie: "Crimson Horizon", rating: 3 },
    { movie: "Whispers of the Wind", rating: 4 },
    { movie: "Starlight Serenade", rating: 5 },
  ];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(
          <i key={i} className="material-icons text-base">
            star
          </i>
        );
      } else {
        stars.push(
          <i key={i} className="material-icons text-base text-gray-500">
            star_border
          </i>
        );
      }
    }
    return stars;
  };

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-gray-950 dark group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <main className="px-28 flex-1 py-10">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1 mx-auto">
            <div className="flex p-4 @container">
              <div className="flex w-full flex-col gap-6 items-center">
                <div className="flex gap-6 flex-col items-center">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-36 h-36 border-2 border-white shadow-lg"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCGJ7TqDxs9qU3ne_1cEYxywDhhJUlatUf34h05CPGt_bFSUPqTxSLGPuOEUxNTVAS0YJ2umkPUFnEc76GHYsh1jspTzX7vrKDy-Tcx2N--WxuMf4SsnToxGiUR_dxt_U2Ie45A-wVxTM8TdMiZfbpZ36ngn9_n6QcYTmRQklpd7YPoZKhSLhQlA5zZYpygLAQIY9eDWi_0Kd1Lb_IzPVJhbrAOGrxaueZKh1tToWSiDy_WTzHf13_Err1XKv0m4fHYvHw9sN0pbQc")',
                    }}
                  ></div>
                  <div className="flex flex-col items-center justify-center gap-1">
                    <p className="text-white text-3xl font-bold leading-tight tracking-tighter text-center">
                      Sophia Bennett
                    </p>
                    <p className="text-gray-400 text-base font-normal leading-normal text-center">
                      Joined in 2021
                    </p>
                    <p className="text-gray-400 text-base font-normal leading-normal text-center">
                      123 reviews · 456 on watchlist
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-8 mt-8">
              <div>
                <h2 className="text-white text-2xl font-bold leading-tight tracking-tighter px-4 pb-4">
                  Review History
                </h2>
                <div className="px-4 @container">
                  <div className="flex flex-col rounded-md border border-gray-800 bg-gray-900/50 overflow-hidden">
                    <div className="grid grid-cols-2 bg-gray-900 px-4 py-3">
                      <div className="text-left text-gray-300 text-sm font-medium">
                        Movie
                      </div>
                      <div className="text-left text-gray-300 text-sm font-medium">
                        Rating
                      </div>
                    </div>
                    <div className="flex flex-col max-h-96 overflow-y-auto">
                      {reviews.map((review, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-2 items-center border-t border-gray-800 px-4 py-3"
                        >
                          <p className="text-white text-base font-normal leading-normal">
                            {review.movie}
                          </p>
                          <div className="flex items-center gap-1 text-yellow-400">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-4">
                <div className="flex items-center justify-between py-4">
                  <h2 className="text-white text-2xl font-bold leading-tight tracking-tighter">
                    Watchlist
                  </h2>
                  <Link
                    to="/watchlist"
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-transparent px-4 py-2 text-base font-semibold text-[var(--primary-color)] transition-colors hover:bg-[var(--primary-color)]/10 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/50"
                    style={{ "--primary-color": "#ea2a33" }}
                  >
                    <span>View Watchlist</span>
                    <i className="material-icons text-lg">arrow_forward</i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;

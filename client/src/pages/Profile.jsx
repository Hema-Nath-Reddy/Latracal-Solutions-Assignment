import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import { Star, ArrowRight } from "lucide-react";

const Profile = () => {
  // Use the user object directly from the useAuth hook
  const { user, isAuthenticated } = useAuth();
  const [reviews, setReviews] = useState([]);

  // Fetch reviews when the component mounts
  useEffect(() => {
    const fetchReviews = async () => {
      if (user && user.id) {
        try {
          // You still need an API call for reviews if they aren't included in the login response
          const res = await fetch(
            `http://localhost:3001/users/${user.id}/reviews`
          );
          const data = await res.json();
          setReviews(data || []);
        } catch (error) {
          console.log("Error fetching user reviews: " + error.message);
        }
      }
    };
    fetchReviews();
  }, [user]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) =>
      i < rating ? (
        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      ) : (
        <Star key={i} className="w-5 h-5 text-gray-500" />
      )
    );
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-gray-950 overflow-x-hidden">
      {isAuthenticated && user ? (
        <div className="layout-container flex h-full grow flex-col">
          <main className="px-28 flex-1 py-10">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1 mx-auto">
              <div className="flex p-4">
                <div className="flex w-full flex-col gap-6 items-center">
                  <div className="flex gap-6 flex-col items-center">
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-36 h-36 border-2 border-white shadow-lg"
                      style={{
                        backgroundImage: `url(${
                          user?.profile ||
                          "https://via.placeholder.com/150"
                        })`,
                      }}
                    ></div>
                    <div className="flex flex-col items-center justify-center gap-1">
                      <p className="text-white text-3xl font-bold">
                        {user?.username || "N/A"}
                      </p>
                      <p className="text-gray-400">
                        {/* Assuming your user object has a joinDate or similar field */}
                        Joined in{" "}
                        {user?.joinDate
                          ? new Date(user.joinDate).getFullYear()
                          : "N/A"}
                      </p>
                      <p className="text-gray-400">
                        {reviews.length} reviews ·{" "}
                        {user?.watchlist?.length || 0} on watchlist
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-8 mt-8">
                <div>
                  <h2 className="text-white text-2xl font-bold px-4 pb-4">
                    Review History
                  </h2>
                  <div className="px-4">
                    <div className="flex flex-col rounded-md border border-gray-800 bg-gray-900/50 overflow-hidden">
                      <div className="grid grid-cols-2 bg-gray-900 px-4 py-3">
                        <div className="text-left text-gray-300">Movie</div>
                        <div className="text-left text-gray-300">Rating</div>
                      </div>
                      <div className="flex flex-col max-h-96 overflow-y-auto">
                        {reviews.length > 0 ? (
                          reviews.map((review, index) => (
                            <div
                              key={index}
                              className="grid grid-cols-2 items-center border-t border-gray-800 px-4 py-3"
                            >
                              <p className="text-white">{review.movie}</p>
                              <div className="flex items-center gap-1">
                                {renderStars(review.rating)}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-4 text-center text-gray-500">
                            No reviews found.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-4">
                  <div className="flex items-center justify-between py-4">
                    <h2 className="text-white text-2xl font-bold">Watchlist</h2>
                    <Link
                      to="/watchlist"
                      className="inline-flex items-center gap-2 rounded-md px-4 py-2 font-semibold text-[#ea2a33] hover:bg-[#ea2a33]/10"
                    >
                      <span>View Watchlist</span>
                      <ArrowRight className="w-4 h-4 text-[#ea2a33]" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      ) : (
        <main className="px-28 flex-1 py-10">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1 mx-auto">
            <div className="flex flex-col gap-6 items-center rounded-lg border border-gray-800 bg-gray-900/50 p-8 text-center">
              <h2 className="text-white text-2xl font-bold">
                You are not logged in
              </h2>
              <p className="text-gray-400">
                Log in or sign up to see your profile, review history, and
                watchlist.
              </p>
              <div className="flex items-center gap-4">
                <Link
                  className="bg-[#ea2a33] px-4 py-2 rounded-md text-white font-semibold"
                  to="/login"
                >
                  Log In
                </Link>
                <Link
                  className="bg-gray-700 px-4 py-2 rounded-md text-white font-semibold"
                  to="/signup"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default Profile;

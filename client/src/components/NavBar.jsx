import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import { Bookmark } from "lucide-react";

const Navbar = () => {
  const primaryColor = "#ea2a33";
  const navigate = useNavigate();
  // Access the user object along with isAuthenticated and logout
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <header className="w-full flex items-center justify-between bg-black whitespace-nowrap border-b border-gray-800 px-4 sm:px-6 lg:px-8 py-4 sticky top-0 z-[1000] shadow-md">
      <div className="flex items-center gap-6 lg:gap-10">
        {/* Logo */}
        <button
          className="cursor-pointer flex items-center gap-2 text-white"
          onClick={() => {
            navigate("/");
          }}
        >
          <svg
            className="h-8 w-8"
            style={{ color: primaryColor }}
            fill="none"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z"
              fill="currentColor"
            />
          </svg>
          <h2 className="text-white text-xl font-bold leading-tight tracking-[-0.015em]">
            CineView
          </h2>
        </button>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-gray-300 hover:text-white text-sm font-medium leading-normal transition-colors"
          >
            Home
          </Link>
          <Link
            to="/movies"
            className="text-gray-300 hover:text-white text-sm font-medium leading-normal transition-colors"
          >
            Movies
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <button
              onClick={() => {
                navigate("/watchlist");
              }}
              className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-10 w-10 bg-gray-800 hover:bg-gray-700 text-white transition-colors"
            >
              <Bookmark />
            </button>
            {/* Avatar */}
            <button
              onClick={() => {
                navigate("/profile");
              }}
              className="cursor-pointer bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style={{
                // Use optional chaining and a fallback URL for robustness
                backgroundImage: `url("${
                  user?.profile ||
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuDRwvFniIOmhzeb-BKlaHDUMCqt_uEp5DNKC8oQPDFKXwRQOkqSkzhGnBimMpXWBzWo6A8fzScBEmIeD-21dHZTZEFOsjNko5Fo_ziwxIchzDNp9i8-_x6pycarwtdN_UPQxKxWRVGj7ySIDI4YYuGW3ngh8OVByqCF3S4XgRhdB1jNq_51L3M4urFJb1eEGArFNgNjRTZPYXQ_5QrR2fkGPzDopAAD6brgwyS05TMvJQXC_NfoS4e8P7Og1u0qS-9h8ZzTCSkASJg"
                }")`,
              }}
            />
            {/* Add a logout button */}
            <button
              onClick={logout}
              className="cursor-pointer py-2 px-4 bg-gray-800 rounded-md text-sm font-semibold hover:bg-gray-700 transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="cursor-pointer group relative flex w-full justify-center rounded-md border border-transparent bg-[var(--primary-color)] py-3 px-4 text-sm font-semibold text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2 focus:ring-offset-gray-900"
              style={{ "--primary-color": "#ea2a33" }}
            >
              Log in
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;

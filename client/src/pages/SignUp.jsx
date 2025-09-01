import { React, useState } from "react";
import { ImageUp } from "lucide-react";
import { Link } from "react-router-dom";
const SignUp = () => {
  const primaryColor = "#ea2a33";
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign up function has been called.");
  };
  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#1a1a1a] dark group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        {/* Main content */}
        <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8 bg-[#222222] p-8 rounded-lg shadow-lg">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                Create an account
              </h2>
            </div>
            <div className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label className="sr-only" htmlFor="username">
                    Username
                  </label>
                  <input
                    className="relative block w-full appearance-none rounded-md border border-gray-700 bg-gray-800/50 px-3 py-3 text-white placeholder-gray-500 focus:z-10 focus:border-[var(--primary-color)] focus:outline-none focus:ring-[var(--primary-color)] sm:text-sm rounded-t-md"
                    style={{ "--primary-color": primaryColor }}
                    id="username"
                    name="username"
                    placeholder="Username"
                    required
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label className="sr-only" htmlFor="email-address">
                    Email address
                  </label>
                  <input
                    autocomplete="email"
                    className="relative block w-full appearance-none rounded-md border border-gray-700 bg-gray-800/50 px-3 py-3 text-white placeholder-gray-500 focus:z-10 focus:border-[var(--primary-color)] focus:outline-none focus:ring-[var(--primary-color)] sm:text-sm"
                    style={{ "--primary-color": primaryColor }}
                    id="email-address"
                    name="email"
                    placeholder="Email address"
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="sr-only" htmlFor="password">
                    Password
                  </label>
                  <input
                    autocomplete="current-password"
                    className="relative block w-full appearance-none rounded-md border border-gray-700 bg-gray-800/50 px-3 py-3 text-white placeholder-gray-500 focus:z-10 focus:border-[var(--primary-color)] focus:outline-none focus:ring-[var(--primary-color)] sm:text-sm"
                    style={{ "--primary-color": primaryColor }}
                    id="password"
                    name="password"
                    placeholder="Password"
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label className="sr-only" htmlFor="confirm-password">
                    Confirm Password
                  </label>
                  <input
                    className="relative block w-full appearance-none rounded-md border border-gray-700 bg-gray-800/50 px-3 py-3 text-white placeholder-gray-500 focus:z-10 focus:border-[var(--primary-color)] focus:outline-none focus:ring-[var(--primary-color)] sm:text-sm rounded-b-md"
                    style={{ "--primary-color": primaryColor }}
                    id="confirm-password"
                    name="confirm-password"
                    placeholder="Confirm Password"
                    required
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">
                  {" "}
                  Profile Picture{" "}
                </label>
                <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
                  <div className="space-y-1 items-center">
                    <ImageUp className="mx-auto h-12 w-12 text-gray-500" />
                    <div className="flex text-sm text-gray-400">
                      <label
                        className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-[var(--primary-color)] hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-800 focus-within:ring-[var(--primary-color)]"
                        htmlFor="file-upload"
                        style={{ "--primary-color": primaryColor }}
                      >
                        <span>Upload a file</span>
                        <input
                          className="sr-only"
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          onChange={(e) => setProfilePicture(e.target.files[0])}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <button
                  onClick={handleSubmit}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[var(--primary-color)] hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-[var(--primary-color)]"
                  style={{ "--primary-color": primaryColor }}
                >
                  Sign Up
                </button>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400">
                Already have an account?
                <Link
                  to="/login"
                  className="font-medium text-[var(--primary-color)] hover:text-red-500"
                  style={{ "--primary-color": primaryColor }}
                >
                  {" "}
                  Log In{" "}
                </Link>
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SignUp;

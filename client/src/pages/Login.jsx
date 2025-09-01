import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth"; // Assuming useAuth is here

const Login = () => {
  const primaryColor = "#ea2a33";

  // Get authentication state and login function from the custom hook
  const { isAuthenticated, loading, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Redirect to the profile page on successful authentication
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Handler for the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Use the login function from the useAuth hook
    // The useAuth hook will handle dispatching the Redux thunk
    login(email, password);
  };

  return (
    <div
      className="relative flex size-full min-h-screen flex-col overflow-x-hidden text-white"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      <div className="absolute inset-0 z-0">
        <img
          alt="background"
          className="h-full w-full object-cover opacity-20"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaaKiAhcX4RCxDfAH0TcNl_LWIqZQroPULa5YaakFPVlZGvjJ5RlHzu7Eh_DgbMVznnCK6ecNgPJA3bgYf-n7UcehBi96SlEQQ-L8t4DSEphGOnch64HkIVmp5WRJ3V94DqOk9ZPKfcYdv9wtbWBOOPtfwNRIYP316uKzH-UcIajMtwSez1aWqrkK6S3hFUmzMY_4-Fhat7BjLyNRIKh6DeXnkq363VFDZ944yNmqxf1dr86R7_la-mYJwPuVERZN9IpOsDPLcPb8"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1E] via-[#1C1C1E]/80 to-transparent"></div>
      </div>

      <div className="relative z-10 flex h-full grow flex-col">
        <main className="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8 rounded-2xl bg-black/30 backdrop-blur-lg p-8 shadow-2xl">
            <div>
              <h2 className="text-center text-3xl font-extrabold text-white">
                Welcome Back
              </h2>
              <p className="mt-2 text-center text-sm text-gray-400">
                Sign in to continue your movie journey
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="sr-only" htmlFor="email">
                  Email address
                </label>
                <input
                  autoComplete="email"
                  className="relative block w-full appearance-none rounded-md border border-gray-700 bg-gray-800/50 px-3 py-3 text-white placeholder-gray-500 focus:z-10 focus:border-[var(--primary-color)] focus:outline-none focus:ring-[var(--primary-color)] sm:text-sm"
                  style={{ "--primary-color": primaryColor }}
                  id="email"
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
                  autoComplete="current-password"
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
              <div className="flex items-center justify-end">
                <div className="text-sm">
                  <a
                    className="font-medium text-gray-400 hover:text-[var(--primary-color)] transition-colors"
                    style={{ "--primary-color": primaryColor }}
                    href="#"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div>
                <button
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-[var(--primary-color)] py-3 px-4 text-sm font-semibold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
                  style={{ "--primary-color": primaryColor }}
                  disabled={loading}
                  type="submit"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>
            <p className="mt-6 text-center text-sm text-gray-400">
              Don't have an account?
              <Link
                to="/signup"
                className="font-medium text-[var(--primary-color)] hover:text-red-400 transition-colors"
                style={{ "--primary-color": primaryColor }}
              >
                Sign up
              </Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;

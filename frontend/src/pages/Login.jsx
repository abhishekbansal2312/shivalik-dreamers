import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useAuth } from "../provider/AuthProvider";

const Login = ({ darkMode }) => {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setIsAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    const url = `http://localhost:4600/api/auth/login`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, password }),
        credentials: "include",
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      setLoading(false);

      if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
      }

      const data = await response.json();
      Cookies.set("authtoken", data.token, { expires: 7, path: "" });
      setIsAuthenticated(true);
      navigate("/");
    } catch (err) {
      setLoading(false);
      if (err.name === "AbortError") {
        setError("Request timed out. Please try again.");
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#1e3c72] to-[#2a5298] dark:from-[#1f2937] dark:to-[#4b5563] px-4 sm:px-8 lg:px-16">
        {/* Back/Home Button */}
        <Link
          to="/"
          className="absolute top-6 left-6 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-all shadow-md"
          title="Back to Home"
        >
          &#8592; Home
        </Link>

        <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-xl w-full max-w-md relative overflow-hidden border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
            Welcome Back!
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="studentId"
                className="block text-gray-700 dark:text-gray-300 font-semibold mb-1"
              >
                Student ID
              </label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                id="studentId"
                placeholder="Enter 9-digit student ID"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow duration-200 shadow-sm hover:shadow-lg"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 dark:text-gray-300 font-semibold mb-1"
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                placeholder="Enter your password"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow duration-200 shadow-sm hover:shadow-lg"
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-bold shadow-lg hover:from-indigo-600 hover:to-blue-700 transition duration-200 ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {error && (
              <p className="mt-5 text-red-600 dark:text-red-400 text-center">
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { MenuIcon, XIcon } from "@heroicons/react/solid";
import { SunIcon, MoonIcon } from "@heroicons/react/outline";

import { useAuth } from "../provider/AuthProvider";
import { jwtDecode } from "jwt-decode";

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route
  const { isAuthenticated, setIsAuthenticated, userRole } = useAuth();

  useEffect(() => {
    const token = Cookies.get("authtoken");

    if (token) {
      setIsAuthenticated(true);
      try {
        const decodedToken = jwtDecode(token);
        setIsAdmin(decodedToken.role === "admin"); // Only set isAdmin if role is "admin"
      } catch (error) {
        console.error("Invalid token", error);
        setIsAdmin(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    Cookies.remove("authtoken");
    fetch("http://localhost:4600/api/auth/logout", {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Logout failed");
        setIsAuthenticated(false);
        setIsAdmin(false);
        navigate("/login");
      })
      .catch((error) => console.error("Logout error:", error));
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // Function to check if the link is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`sticky top-0 left-0 right-0 z-50 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } shadow-md transition-all duration-300 backdrop-blur-md`}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6 md:px-16">
        <div className="text-2xl">
          <Link
            to="/"
            className={`flex items-center space-x-2 ${
              darkMode
                ? "text-white hover:text-gray-300"
                : "text-gray-900 hover:text-blue-500"
            } transition-all duration-300`}
          >
            <span>HostelCafe</span>
          </Link>
        </div>

        <div className="hidden md:flex space-x-8 items-center">
          <Link
            to="/"
            className={`transition-all duration-300 ${
              isActive("/")
                ? "border-b-2 border-blue-500"
                : darkMode
                ? "text-gray-300 hover:text-gray-400"
                : "text-gray-900 hover:text-blue-500"
            } text-lg`}
          >
            Home
          </Link>

          {isAdmin && (
            <Link
              to="/users"
              className={`transition-all duration-300 ${
                isActive("/users")
                  ? "border-b-2 border-blue-500"
                  : darkMode
                  ? "text-gray-300 hover:text-gray-400"
                  : "text-gray-900 hover:text-blue-500"
              } text-lg`}
            >
              Users
            </Link>
          )}

          <Link
            to="/meals"
            className={`transition-all duration-300 ${
              isActive("/menu")
                ? "border-b-2 border-blue-500"
                : darkMode
                ? "text-gray-300 hover:text-gray-400"
                : "text-gray-900 hover:text-blue-500"
            } text-lg`}
          >
            Meals
          </Link>

          <Link
            to="/orders"
            className={`transition-all duration-300 ${
              isActive("/orders")
                ? "border-b-2 border-blue-500"
                : darkMode
                ? "text-gray-300 hover:text-gray-400"
                : "text-gray-900 hover:text-blue-500"
            } text-lg`}
          >
            Orders
          </Link>

          <Link
            to="/feedback"
            className={`transition-all duration-300 ${
              isActive("/feedback")
                ? "border-b-2 border-blue-500"
                : darkMode
                ? "text-gray-300 hover:text-gray-400"
                : "text-gray-900 hover:text-blue-500"
            } text-lg`}
          >
            Feedback
          </Link>

          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className={`transition-all duration-300 ${
                darkMode
                  ? "text-gray-300 hover:text-red-400"
                  : "text-gray-900 hover:text-red-500"
              } text-lg`}
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className={`transition-all duration-300 ${
                darkMode
                  ? "text-gray-300 hover:text-gray-400"
                  : "text-gray-900 hover:text-blue-500"
              } text-lg`}
            >
              Login
            </Link>
          )}
        </div>

        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full transition-all duration-300"
        >
          {darkMode ? (
            <SunIcon className="w-6 h-6 text-yellow-500" />
          ) : (
            <MoonIcon className="w-6 h-6 text-blue-500" />
          )}
        </button>

        <div className="md:hidden">
          <button
            onClick={toggleDropdown}
            className={`transition-all duration-300 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {isDropdownOpen ? (
              <XIcon className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden transition-all duration-300 ${
          isDropdownOpen ? "block" : "hidden"
        } ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}
      >
        <Link
          to="/"
          className={`block px-6 py-4 transition-all duration-300 ${
            isActive("/")
              ? "bg-blue-500 text-white"
              : darkMode
              ? "text-gray-300 hover:bg-gray-700"
              : "text-gray-900 hover:bg-gray-100"
          } text-lg`}
        >
          Home
        </Link>

        {isAdmin && (
          <Link
            to="/users"
            className={`block px-6 py-4 transition-all duration-300 ${
              isActive("/users")
                ? "bg-blue-500 text-white"
                : darkMode
                ? "text-gray-300 hover:bg-gray-700"
                : "text-gray-900 hover:bg-gray-100"
            } text-lg`}
          >
            Users
          </Link>
        )}

        <Link
          to="/meals"
          className={`block px-6 py-4 transition-all duration-300 ${
            isActive("/menu")
              ? "bg-blue-500 text-white"
              : darkMode
              ? "text-gray-300 hover:bg-gray-700"
              : "text-gray-900 hover:bg-gray-100"
          } text-lg`}
        >
          Meals
        </Link>

        <Link
          to="/orders"
          className={`block px-6 py-4 transition-all duration-300 ${
            isActive("/orders")
              ? "bg-blue-500 text-white"
              : darkMode
              ? "text-gray-300 hover:bg-gray-700"
              : "text-gray-900 hover:bg-gray-100"
          } text-lg`}
        >
          Orders
        </Link>

        <Link
          to="/feedback"
          className={`block px-6 py-4 transition-all duration-300 ${
            isActive("/feedback")
              ? "bg-blue-500 text-white"
              : darkMode
              ? "text-gray-300 hover:bg-gray-700"
              : "text-gray-900 hover:bg-gray-100"
          } text-lg`}
        >
          Feedback
        </Link>

        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className={`block px-6 py-4 transition-all duration-300 ${
              darkMode
                ? "text-gray-300 hover:text-red-400"
                : "text-gray-900 hover:text-red-500"
            } text-lg`}
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className={`block px-6 py-4 transition-all duration-300 ${
              darkMode
                ? "text-gray-300 hover:text-gray-400"
                : "text-gray-900 hover:text-blue-500"
            } text-lg`}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

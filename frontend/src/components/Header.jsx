import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // Ensure package is installed
import { MenuIcon, XIcon } from "@heroicons/react/solid"; // For modern icons
import { useAuth } from "../provider/AuthProvider";

const Navbar = ({ darkMode }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  useEffect(() => {
    const token = Cookies.get("authtoken");
    setIsAuthenticated(!!token);
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
        navigate("/login");
      })
      .catch((error) => console.error("Logout error:", error));
  };

  return (
    <nav
      className={`sticky top-0 left-0 right-0 z-50 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } shadow-lg transition-all duration-300 backdrop-blur-md`}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6 md:px-16">
        {/* Logo */}
        <div className="font-bold text-2xl">
          <Link
            to="/"
            className={`flex items-center space-x-2 ${
              darkMode
                ? "text-white hover:text-gray-300"
                : "text-gray-900 hover:text-blue-500"
            } transition-all duration-300`}
          >
            <span>Hobbies Club</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link
            to="/"
            className={`transition-all duration-300 relative group ${
              darkMode
                ? "text-gray-300 hover:text-gray-400"
                : "text-gray-900 hover:text-blue-500"
            }`}
          >
            Home
          </Link>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className={`transition-all duration-300 relative group ${
                darkMode
                  ? "text-gray-300 hover:text-red-400"
                  : "text-gray-900 hover:text-red-500"
              }`}
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className={`transition-all duration-300 relative group ${
                darkMode
                  ? "text-gray-300 hover:text-gray-400"
                  : "text-gray-900 hover:text-blue-500"
              }`}
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
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
          className={`block px-4 py-2 transition-all duration-300 ${
            darkMode
              ? "text-gray-300 hover:bg-gray-700"
              : "text-gray-900 hover:bg-gray-100"
          }`}
        >
          Home
        </Link>
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className={`block px-4 py-2 transition-all duration-300 ${
              darkMode
                ? "text-gray-300 hover:bg-red-400"
                : "text-gray-900 hover:bg-red-200"
            }`}
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className={`block px-4 py-2 transition-all duration-300 ${
              darkMode
                ? "text-gray-300 hover:bg-gray-700"
                : "text-gray-900 hover:bg-gray-100"
            }`}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

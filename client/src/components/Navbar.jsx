import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const verified = !!localStorage.getItem("accessToken");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    toast("You have logged out!");
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  return (
    <div className="flex justify-center mt-4 sm:mt-6 px-4">
      <nav className="flex items-center justify-between w-full max-w-5xl px-4 sm:px-6 py-3 bg-[#0f172a] rounded-xl shadow-lg border border-teal-800">
        <Link
          to="/"
          className="text-teal-400 font-semibold text-base sm:text-lg"
        >
          StockTracker
        </Link>

        <ul className="flex items-center gap-4 sm:gap-8 text-gray-300 font-medium text-sm sm:text-base">
          <li>
            <Link
              to="/guide"
              className="cursor-pointer hover:text-teal-400 transition"
            >
              Guide
            </Link>
          </li>

          <span className="h-5 w-px bg-gray-600"></span>

          {!verified ? (
            <>
              <li>
                <Link
                  to="/login"
                  className="cursor-pointer hover:text-teal-400 transition"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="cursor-pointer hover:text-teal-400 transition"
                >
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link className="cursor-pointer hover:text-teal-400 transition">
                  Hi, <span className="text-white">{username}</span>
                </Link>
              </li>

              <span className="h-5 w-px bg-gray-600"></span>

              <li>
                <button
                  onClick={handleLogout}
                  className="cursor-pointer hover:text-teal-400 transition"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;

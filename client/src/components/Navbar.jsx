import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-center mt-6">
      <nav className="flex items-center justify-between w-225 px-6 py-3 bg-[#0f172a] rounded-xl shadow-lg border border-teal-800">
        <Link to="/" className="text-teal-400 font-semibold text-lg">
          StockTracker
        </Link>

        <ul className="flex items-center gap-8 text-gray-300 font-medium">
          <li>
            <Link
              to="/guide"
              className="cursor-pointer hover:text-teal-400 transition"
            >
              Guide
            </Link>
          </li>

          <span className="h-5 w-px bg-gray-600"></span>

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
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;

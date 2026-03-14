import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center from-teal-900 to-black">
      <div className="w-95 bg-[#070b12] p-8 rounded-2xl border border-teal-700 shadow-xl">
        <h1 className="text-white text-2xl font-semibold text-center">Login</h1>
        <p className="text-gray-400 text-center mb-6">
          Login to your account to continue
        </p>

        <form className="space-y-5">
          <div>
            <label className="text-gray-400 text-sm">Username</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-2 px-4 py-3 bg-[#1b2330] rounded-lg text-white outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full mt-2 px-4 py-3 bg-[#1b2330] rounded-lg text-white outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>

          <p
            className="text-right text-sm text-gray-400 hover:text-white cursor-pointer"
            onClick={() => {
              navigate("/register");
            }}
          >
            Don't have an account? Sign Up.
          </p>

          <button className="w-full py-3 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

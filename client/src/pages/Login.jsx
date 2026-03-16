import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ identifier, password });
      const { accessToken, username } = res.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("username", username);

      toast.success(res.data.message);

      setTimeout(() => navigate("/"), 800);
    } catch (err) {
      console.error(err.response.data);

      toast.error(
        err.response?.data?.message || "Login failed. Please try again.",
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#070b12] p-6 sm:p-8 rounded-2xl border border-teal-700 shadow-xl">
        <h1 className="text-white text-xl sm:text-2xl font-semibold text-center">
          Login
        </h1>

        <p className="text-gray-400 text-center mb-6 text-sm sm:text-base">
          Login to your account to continue
        </p>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="text-gray-400 text-sm">Username</label>

            <input
              type="text"
              placeholder="Username or email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full mt-2 px-4 py-3 bg-[#1b2330] rounded-lg text-white outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm">Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full mt-2 px-4 py-3 bg-[#1b2330] rounded-lg text-white outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>

          <p
            className="text-right text-sm text-gray-400 hover:text-white cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Don't have an account? Sign Up.
          </p>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

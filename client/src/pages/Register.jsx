import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser({ username, email, password });

      toast.success(res.data.message);

      setTimeout(() => navigate("/login"), 800);
    } catch (error) {
      console.error(error.response?.data);

      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center from-teal-900 to-black">
      <div className="w-95 bg-[#070b12] p-8 rounded-2xl border border-teal-700 shadow-xl">
        <h1 className="text-white text-2xl font-semibold text-center">
          Create Account
        </h1>
        <p className="text-gray-400 text-center mb-6">
          Register to start tracking your scrips
        </p>

        <form className="space-y-5" onSubmit={handleRegister}>
          <div>
            <label className="text-gray-400 text-sm">Username</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className="w-full mt-2 px-4 py-3 bg-[#1b2330] rounded-lg text-white outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="w-full mt-2 px-4 py-3 bg-[#1b2330] rounded-lg text-white outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="w-full mt-2 px-4 py-3 bg-[#1b2330] rounded-lg text-white outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <p
            className="text-right text-sm text-gray-400 hover:text-white cursor-pointer"
            onClick={() => {
              navigate("/login");
            }}
          >
            Already have an account? Login.
          </p>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

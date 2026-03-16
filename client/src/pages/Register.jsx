import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, verifyUser } from "../services/authService";
import { toast } from "react-toastify";
import VerifyModal from "../components/VerifyModal";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleVerify = async ({ email, otp }) => {
    try {
      const res = await verifyUser({ email, otp });

      toast.success(res.data.message);

      setShowVerifyModal(false);

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await registerUser({ username, email, password });

      toast.success(res.data.message);

      setShowVerifyModal(true);
    } catch (error) {
      const status = error.response?.status;
      const message = error.response?.data?.message;

      if (status === 409 && message?.toLowerCase().includes("not verified")) {
        setShowVerifyModal(true);
        return;
      }

      toast.error(message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-[#070b12] p-6 sm:p-8 rounded-2xl border border-teal-700 shadow-xl">
          <h1 className="text-white text-xl sm:text-2xl font-semibold text-center">
            Create Account
          </h1>

          <p className="text-gray-400 text-center mb-6 text-sm sm:text-base">
            Register to start tracking your scrips
          </p>

          <form className="space-y-5" onSubmit={handleRegister}>
            <div>
              <label className="text-gray-400 text-sm">Username</label>

              <input
                type="text"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mt-2 px-4 py-3 bg-[#1b2330] rounded-lg text-white outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="text-gray-400 text-sm">Email</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 px-4 py-3 bg-[#1b2330] rounded-lg text-white outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="text-gray-400 text-sm">Password</label>

              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 px-4 py-3 bg-[#1b2330] rounded-lg text-white outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <p
              className="text-right text-sm text-gray-400 hover:text-white cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Already have an account? Login.
            </p>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg bg-teal-600 font-semibold text-white transition-colors  ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-teal-700"}`}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>

      {showVerifyModal && (
        <VerifyModal
          status="Verify Email"
          email={email}
          buttonText="Verify OTP"
          onVerify={handleVerify}
        />
      )}
    </>
  );
};

export default Register;

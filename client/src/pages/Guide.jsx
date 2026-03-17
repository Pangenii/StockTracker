import React from "react";
import Navbar from "../components/Navbar";

const Guide = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen text-white px-4 sm:px-6 md:px-10 py-10 flex justify-center">
        <div className="max-w-6xl w-full">
          {/* HERO */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-teal-400">
              StockTracker Guide
            </h1>

            <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
              Learn how to use StockTracker to monitor live NEPSE market data,
              track companies, and stay updated with real-time price changes.
            </p>
          </div>

          {/* VIDEO */}
          <div className="mb-14 md:mb-16">
            <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">
              Quick Walkthrough
            </h2>

            <div className="rounded-xl overflow-hidden border border-teal-800 shadow-xl">
              <div className="aspect-video">
                <iframe
                  src="https://www.loom.com/share/89ad50f72a7d45bba7e3a89c73ad5d75"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>

            <p className="text-gray-400 text-center mt-4 text-sm sm:text-base">
              Watch this short video to understand how everything works.
            </p>
          </div>

          {/* STEPS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-[#0f172a] border border-teal-900 p-6 rounded-xl hover:scale-105 transition">
              <h3 className="text-lg sm:text-xl font-semibold text-teal-400 mb-3">
                1. Create an Account
              </h3>
              <p className="text-gray-400 text-sm sm:text-base">
                Register using your email address. You will receive an OTP
                verification to activate your account.
              </p>
            </div>

            <div className="bg-[#0f172a] border border-teal-900 p-6 rounded-xl hover:scale-105 transition">
              <h3 className="text-lg sm:text-xl font-semibold text-teal-400 mb-3">
                2. Verify Email
              </h3>
              <p className="text-gray-400 text-sm sm:text-base">
                Enter the OTP sent to your email to verify your account and
                unlock the platform.
              </p>
            </div>

            <div className="bg-[#0f172a] border border-teal-900 p-6 rounded-xl hover:scale-105 transition">
              <h3 className="text-lg sm:text-xl font-semibold text-teal-400 mb-3">
                3. Track Market Data
              </h3>
              <p className="text-gray-400 text-sm sm:text-base">
                Monitor NEPSE live trading data including price, percent change,
                high, low and volume.
              </p>
            </div>
          </div>

          {/* FEATURES */}
          <div className="mt-16 md:mt-20">
            <h2 className="text-xl sm:text-2xl font-semibold mb-8 md:mb-10 text-center">
              Key Features
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="bg-[#0f172a] border border-teal-900 p-6 rounded-xl">
                <h3 className="text-teal-400 font-semibold text-lg mb-2">
                  Live NEPSE Data
                </h3>
                <p className="text-gray-400 text-sm sm:text-base">
                  Automatically scraped market data keeps you updated with the
                  latest trading activity.
                </p>
              </div>

              <div className="bg-[#0f172a] border border-teal-900 p-6 rounded-xl">
                <h3 className="text-teal-400 font-semibold text-lg mb-2">
                  Secure Authentication
                </h3>
                <p className="text-gray-400 text-sm sm:text-base">
                  OTP-based email verification and secure login system.
                </p>
              </div>

              <div className="bg-[#0f172a] border border-teal-900 p-6 rounded-xl">
                <h3 className="text-teal-400 font-semibold text-lg mb-2">
                  Real-Time Tracking
                </h3>
                <p className="text-gray-400 text-sm sm:text-base">
                  Stay informed with instant market updates.
                </p>
              </div>

              <div className="bg-[#0f172a] border border-teal-900 p-6 rounded-xl">
                <h3 className="text-teal-400 font-semibold text-lg mb-2">
                  Clean Dashboard
                </h3>
                <p className="text-gray-400 text-sm sm:text-base">
                  Minimal interface designed for fast and distraction-free stock
                  monitoring.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Guide;

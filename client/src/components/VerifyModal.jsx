import React, { useState } from "react";

const VerifyModal = ({ status, email, buttonText, onVerify }) => {
  const [otp, setOtp] = useState("");

  const handleSubmit = () => {
    if (!otp) return;
    onVerify({ email, otp });
  };

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-3xl shadow-2xl text-center max-w-sm w-full transform transition-all animate-in fade-in zoom-in duration-300">
        <h2 className="text-3xl font-black text-white mb-4 tracking-wide">
          {status}
        </h2>

        <div className="mb-6">
          <p className="text-neutral-400 mb-4">
            Enter the OTP sent to your email
          </p>

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-3 bg-neutral-800 rounded-xl text-white outline-none focus:ring-2 focus:ring-teal-500 text-center tracking-widest"
          />
        </div>

        <button
          className="w-full bg-teal-500 hover:bg-teal-400 text-white py-4 rounded-2xl font-bold text-sm uppercase tracking-widest transition-colors shadow-lg shadow-teal-500/20 active:scale-[0.98]"
          onClick={handleSubmit}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default VerifyModal;

import React from "react";

const ModalBox = ({ status, message, buttonText, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-3xl shadow-2xl text-center max-w-sm w-full transform transition-all animate-in fade-in zoom-in duration-300">
        <h2 className="text-3xl font-black text-white mb-4 tracking-wide">
          {status}
        </h2>
        <div className="mb-8">
          <p className="text-neutral-400 text-lg leading-relaxed">{message}</p>
        </div>
        <button
          className="w-full bg-teal-500 hover:bg-teal-400 text-white py-4 rounded-2xl font-bold text-sm uppercase tracking-widest transition-colors shadow-lg shadow-teal-500/20 active:scale-[0.98]"
          onClick={onClose}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ModalBox;

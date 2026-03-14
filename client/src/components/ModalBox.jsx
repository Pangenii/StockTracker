const ModalBox = ({ status, message, buttonText, onClose }) => {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="bg-neutral-800 border border-neutral-700 p-8 rounded-2xl shadow-2xl text-center max-w-sm w-screen mx-4">
          <h2 className="text-2xl font-bold text-white mb-8">{status}</h2>
          <div className="flex mb-2">
            <p className="block w-2xl px-6 py-2 bg-neutral-600 border-rose-600 rounded-l-2xl focus:outline-1 outline-indigo-300">
              {message}
            </p>
            <button
              className="bg-teal-600 px-6 rounded-r-xl text-sm font-bold tracking-widest uppercase hover:bg-teal-500"
              onClick={onClose}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalBox;

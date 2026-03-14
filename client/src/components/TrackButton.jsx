import React, { useState } from "react";
import ModalBox from "./ModalBox";

const TrackButton = () => {
  const [Open, setOpen] = useState(false);
  return (
    <>
      <button
        className="bg-teal-600 text-sm px-4 py-2.5 rounded-r-lg text-white font-semibold whitespace-nowrap hover:bg-teal-500"
        onClick={() => {
          setOpen(true);
        }}
      >
        Track Stocks
      </button>
      {Open && (
        <ModalBox
          status="Oopsie !!!"
          message="This feature will be available soon."
          buttonText="close"
          onClose={() => {
            setOpen(false);
          }}
        />
      )}
    </>
  );
};

export default TrackButton;

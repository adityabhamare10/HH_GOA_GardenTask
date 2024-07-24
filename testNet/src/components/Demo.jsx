import { useNavigate } from "react-router-dom";
import React from "react";
const Demo = () => {
  const navigate = useNavigate();

  const handleRegistrationClick = () => {
    // Navigate to the registration page
    navigate("/registration");
  };

  const handleOwnershipClick = () => {
    // Navigate to the ownership transfer page
    navigate("/transfer-ownership");
  };

  return (
    <>
      <section className="mt-16 flex lg:flex-row flex-col gap-4 z-10">
          <button
            className="border border-black p-3 w-[400px] rounded-xl hover:bg-black hover:text-white transition-all font-medium"
            onClick={handleRegistrationClick}
          >
            Registration
          </button>
          <button
            className="border border-black p-3 w-[400px] rounded-xl hover:bg-black hover:text-white transition-all font-semibold"
            onClick={handleOwnershipClick}
          >
            Transfer Ownership
          </button>
          {/* <button
            className="p-3 w-[400px] rounded-xl bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 transition-all font-semibold"
            onClick={handleOwnershipClick}
          >
            <span className="text-md font-semibold  uppercase text-white">Cross Chain Asset Transfer</span>
          </button> */}
      </section>
      <div className="mt-14 rounded-xl overflow-hidden">
        <img
          src="src\assets\field (2).jpg"
          alt="field_pic"
          className="w-full max-h-max opacity-80"
        />
      </div>
    </>
  );
};

export default Demo;

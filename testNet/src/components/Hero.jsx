import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import React from "react";
import { useNavigate } from "react-router-dom";
const Hero = () => {
  const navigate = useNavigate();
  const handleOwnershipClick = () => {
    // Navigate to the ownership transfer page
    navigate("/cross-chain");
  };
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-6 pt-5">
        <h1 className="w-28 object-contain text-3xl font-normal">LandChain</h1>
        <div className="flex flex-row gap-2 items-center">
          <button
            className="hover:text-black p-3 rounded-md bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 transition-all h-10 w-30 flex items-center"
            onClick={handleOwnershipClick}
          >
            <span className="text-md font-normal hover:text-black  transition-all text-white">
              Swap <strong>Here</strong>
            </span>
          </button>
        </div>
      </nav>
      <div className="w-full border-b border-gray-400"></div>
      <h1 className="head_text">
        Stress Free Land Ownership with
        <br className="max-md:hidden" />
        <span className="orange_gradient ">LandChain</span>
      </h1>
      <h2 className="desc text-center mt-4 text-xl">
        Simplifying the process of buying and selling land with blockchain{" "}
        <br /> transfer ownership{" "}
        <span className=" font-bold">nft powered</span>
      </h2>
    </header>
  );
};

export default Hero;

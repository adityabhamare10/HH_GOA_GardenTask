import WormholeConnect from "@wormhole-foundation/wormhole-connect";
import "./cross.css";
import React from "react";
const config = {
  showHamburgerMenu: false,
  env: "mainnet"
};
import SwapComponent from "../garden_swap/Btc_wbtc";
function CrossChain() {
  return (
    <div className=" bg-gradient flex flex-col gap-5 min-w-full justify-center items-center ">
      <h1 className="mt-10 text-6xl font-bold text-black tracking-wide">
        Wrapped Swap
      </h1>
      <h3>Powered by Garden</h3>
      <p className="font-sans text-2xl text-slate-400">Swap from BTC to wBTC and vice versa!</p>
      <div className="rounded-2xl lg:w-1/2">
      {/* <WormholeConnect config={config} /> */}
      </div>
      <SwapComponent/>
    </div>
  );
}

export default CrossChain;

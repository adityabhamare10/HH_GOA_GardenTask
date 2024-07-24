import React, { useState } from 'react';
import {
  BitcoinNetwork,
  BitcoinWallet,
  BitcoinProvider,
  EVMWallet,
} from "@catalogfi/wallets";
import {
  Orderbook,
  Chains,
  Assets,
  Actions,
  parseStatus,
  TESTNET_ORDERBOOK_API
} from "@gardenfi/orderbook";
import { GardenJS } from "@gardenfi/core";
import { JsonRpcProvider, Wallet } from "ethers";

const SwapComponent = () => {
  const [btcPrivateKey, setBtcPrivateKey] = useState('');
  const [evmPrivateKey, setEvmPrivateKey] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [receiveAmount, setReceiveAmount] = useState('');
  const [swapDirection, setSwapDirection] = useState('WBTC to BTC'); // new state for swap direction

  const handleSwap = async () => {
    try {
      // Create Bitcoin wallet
      const bitcoinWallet = BitcoinWallet.fromPrivateKey(
        btcPrivateKey,
        new BitcoinProvider(BitcoinNetwork.Mainnet)
      );

      // Create EVM wallet
      const signer = new Wallet(evmPrivateKey, new JsonRpcProvider("https://rpc.ankr.com/eth"));
      const evmWallet = new EVMWallet(signer);

      // Initialize orderbook
      const orderbook = await Orderbook.init({
        url: "https://api.garden.finance/orders",
        signer,
      });

      const wallets = {
        [Chains.bitcoin]: bitcoinWallet,
        [Chains.ethereum]: evmWallet,
      };

      const garden = new GardenJS(orderbook, wallets);

      // Determine assets based on swap direction
      const fromAsset = swapDirection === 'WBTC to BTC' ? Assets.ethereum.WBTC : Assets.bitcoin.BTC;
      const toAsset = swapDirection === 'WBTC to BTC' ? Assets.bitcoin.BTC : Assets.ethereum.WBTC;

      // Calculate receive amount considering the swap fee
      const calculatedReceiveAmount = (1 - 0.3 / 100) * sendAmount * 1e8;

      // Perform the swap
      const orderId = await garden.swap(
        fromAsset,
        toAsset,
        sendAmount * 1e8,
        calculatedReceiveAmount
      );

      // Subscribe to order updates
      garden.subscribeOrders(await evmWallet.getAddress(), async (orders) => {
        const order = orders.filter((order) => order.ID === orderId)[0];
        if (!order) return;

        const action = parseStatus(order);

        if (action === Actions.UserCanInitiate || action === Actions.UserCanRedeem) {
          const swapper = garden.getSwap(order);
          const swapOutput = await swapper.next();
          console.log(
            `Completed Action ${swapOutput.action} with transaction hash: ${swapOutput.output}`
          );
        }
      });
    } catch (error) {
      console.error('Error during swap:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Swap WBTC to BTC or Vice Versa</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Bitcoin Private Key"
          value={btcPrivateKey}
          onChange={(e) => setBtcPrivateKey(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="EVM Private Key"
          value={evmPrivateKey}
          onChange={(e) => setEvmPrivateKey(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Send Amount"
          value={sendAmount}
          onChange={(e) => setSendAmount(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={swapDirection}
          onChange={(e) => setSwapDirection(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="WBTC to BTC">WBTC to BTC</option>
          <option value="BTC to WBTC">BTC to WBTC</option>
        </select>
        <button
          onClick={handleSwap}
          className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition duration-300"
        >
          Swap
        </button>
      </div>
    </div>
  );
};

export default SwapComponent;

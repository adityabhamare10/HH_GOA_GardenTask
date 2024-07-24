/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle");

const fs = require('fs');
const { projectId,mnemonic } = JSON.parse(fs.readFileSync('./secrets.json', 'utf-8'));

module.exports = {
  solidity: "0.8.20",
  networks: {
    polygon_testnet: {
      url: `https://polygon-mumbai.infura.io/v3/${projectId}`,
      accounts: { mnemonic: mnemonic }
    }
  }
};
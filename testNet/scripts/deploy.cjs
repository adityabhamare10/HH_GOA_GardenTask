const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  // Read the compiled contract artifact
  const contractArtifact = fs.readFileSync("./artifacts/contracts/registration.sol/AceHacks.json", "utf-8");

  // Parse the contract artifact to get the contract's ABI 
  const contractData = JSON.parse(contractArtifact);
  const { abi, bytecode } = contractData;

  console.log("Contract ABI:", abi);
  console.log("Contract bytecode:", bytecode);

  // Get a signer from Hardhat's network provider (e.g., for sending transactions)
  const [deployer] = await ethers.getSigners();

  // Deploy the contract
  console.log("Deploying the Registration contract...");
  const Registration = await ethers.getContractFactory(abi, bytecode);
  const registration = await Registration.deploy(); // Pass constructor arguments here if needed

  // Wait for the contract to be deployed
  await registration.deployed();

  console.log("Registration contract deployed to:", registration.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
import { useState, useEffect } from "react";
import Web3 from "web3";
import AceHacks from "../../artifacts/contracts/registration.sol/AceHacks.json";

const TransferOwnership = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Connect to Web3 provider
        const web3 = new Web3(window.ethereum);

        // Load contract ABI and address
        const contract = new web3.eth.Contract(
          AceHacks.abi,
          "0xD1528FD5c551e3d5d225F5D9f92CF78A3Dfcb17E"
        );

        // Fetch all individuals' details
        const allIndividuals = await contract.methods.getAllIndividuals().call();
        setTransactions(allIndividuals);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div>
      <h1>Transaction Table</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Aadhar Card</th>
            <th>Property Address</th>
            {/* Add more headings for other attributes */}
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.name}</td>
              <td>{transaction.contact}</td>
              <td>{transaction.aadharNumber}</td>
              <td>{transaction.propAddress}</td>
              {/* Render other attributes similarly */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransferOwnership;

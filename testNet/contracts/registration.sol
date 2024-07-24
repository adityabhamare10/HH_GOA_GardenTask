// SPDX-License-Identifier: MIT
// pragma solidity ^0.8.20;

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";

// contract AceHacks is ERC721, Ownable {
//     // Remove the constructor parameter if not needed
//     constructor() ERC721("RegistrationNFT", "REG") Ownable(msg.sender) {}

//     // Define a struct to store individual's details
//     struct Individual {
//         string ULPIN;
//         string name;
//         uint contact;
//         uint aadharNumber;
//         string plotNo;
//         string propAddress;
//     }

//     // Mapping to store individuals' details
//     mapping(bytes32 => bool) public individualExists;

//     // Function to add individual's details and mint an NFT
//     function addToRegister(
//         string memory _ULPIN,
//         string memory _name,
//         uint _contact,
//         uint _aadharNumber,
//         string memory _plotNo,
//         string memory _propAddress
//     ) public {
//         bytes32 uniqueKey = keccak256(abi.encodePacked(_ULPIN, _name, _contact, _aadharNumber, _plotNo, _propAddress));
//         require(!individualExists[uniqueKey], "Individual already exists");

//         // Create a new Individual object
//         Individual memory newIndividual = Individual({
//             ULPIN: _ULPIN,
//             name: _name,
//             contact: _contact,
//             aadharNumber: _aadharNumber,
//             plotNo: _plotNo,
//             propAddress: _propAddress
//         });

//         // Mint a new NFT and associate the individual's unique key as token ID
//         _mint(msg.sender, uint(uniqueKey));
//         individualExists[uniqueKey] = true;
//     }

//     // function getAllRecords() public view returns (Individual[] memory) {
//     //     return Individual;
//     // }
// }


pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AceHacks is ERC721, Ownable {
    // Remove the constructor parameter if not needed
    constructor() ERC721("RegistrationNFT", "REG") Ownable(msg.sender) {}

    // Define a struct to store individual's details
    struct Individual {
        string ULPIN;
        string name;
        uint contact;
        uint aadharNumber;
        string plotNo;
        string propAddress;
    }

    // Mapping to store individuals' details
    mapping(uint256 => Individual) public individuals;
    uint256 public totalIndividuals;

    // Event to log each registration
    event Registered(uint256 tokenId, string ULPIN, string name, uint contact, uint aadharNumber, string plotNo, string propAddress);

    // Function to add individual's details and mint an NFT
    function addToRegister(
        string memory _ULPIN,
        string memory _name,
        uint _contact,
        uint _aadharNumber,
        string memory _plotNo,
        string memory _propAddress
    ) public {
        // Mint a new NFT and associate the individual's unique key as token ID
        uint256 tokenId = totalIndividuals + 1;
        _mint(msg.sender, tokenId);
        Individual memory newIndividual = Individual({
            ULPIN: _ULPIN,
            name: _name,
            contact: _contact,
            aadharNumber: _aadharNumber,
            plotNo: _plotNo,
            propAddress: _propAddress
        });
        individuals[tokenId] = newIndividual;
        totalIndividuals++;

        // Emit an event to log the registration
        emit Registered(tokenId, _ULPIN, _name, _contact, _aadharNumber, _plotNo, _propAddress);
    }

    // Function to fetch all registered individuals' details
    function getAllIndividuals() external view returns (Individual[] memory) {
        Individual[] memory allIndividuals = new Individual[](totalIndividuals);
        for (uint256 i = 1; i < totalIndividuals; i++) {
            allIndividuals[i] = individuals[i + 1];
        }
        return allIndividuals;
    }
}

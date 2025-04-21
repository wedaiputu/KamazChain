// hardhat.config.js
require("@nomicfoundation/hardhat-toolbox");

// Nonaktifkan gas reporter
module.exports = {
  defaultNetwork: "localhost",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    }
  },
  solidity: {
    version: "0.8.28",
    settings: {
      viaIR: true,
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  gasReporter: {
    enabled: false, // Nonaktifkan gas reporter
  },
};

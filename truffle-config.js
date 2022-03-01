const HDWalletProvider = require('@truffle/hdwallet-provider')
require('dotenv').config() // Store environment-specific variable from '.env' to process.env
const mnemonic = process.env.MNEMONIC
const url = process.env.RPC_URL
const projectId = process.env.PROJECT_ID

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  compilers:{
    solc:{
      path: "soljson-v0.8.3+commit.8d00100c.js",
      version: "0.8.3",
      build: "commit.8d00100c",
      longVersion: "0.8.3+commit.8d00100c"
    }
  },
  networks: {
    kovan: {
      networkCheckTimeout: 10000,
      provider: () => {
         return new HDWalletProvider(
          mnemonic,
          url
         );
      },
      network_id: "42",
   },

    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    develop: {
      port: 8545
    }
  },
  
};

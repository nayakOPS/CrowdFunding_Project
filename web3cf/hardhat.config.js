require("@matterlabs/hardhat-zksync-solc");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  zksolc: {
    version: "1.3.9",
    compilerSource: "binary",

    defaultNetwork: 'sepolia',
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
  networks: {
    hardhat:{},
    sepolia:{
      url:'https://eth-sepolia.g.alchemy.com/v2/demo',
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    },
    zksync_testnet: {
      url: "https://zksync2-testnet.zksync.dev",
      ethNetwork: "sepolia",
      chainId: 300,
      zksync: true,
    },
    zksync_mainnet: {
      url: "https://zksync2-mainnet.zksync.io/",
      ethNetwork: "mainnet",
      chainId: 324,
      zksync: true,
    },
  },
  paths: {
    artifacts: "./artifacts-zk",
    cache: "./cache-zk",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};

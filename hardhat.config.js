require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      gasPrice: 0,
      initialBaseFeePerGas: 0,
      hardfork: "merge",
      accounts: [{
        privateKey: "0x0000000000000000000000000000000000000000000000000000000000000001",
        balance: "0",
      }, {
        privateKey: "0x0000000000000000000000000000000000000000000000000000000000000002",
        balance: "0",
      },],
    },
  },
};

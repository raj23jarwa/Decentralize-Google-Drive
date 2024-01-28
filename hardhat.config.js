require("@nomicfoundation/hardhat-toolbox");
const ALCHEMY_API_KEY = "7bqUzMELUHKBbgov7Py9BYQyzvXo2i5j";
const  SEPOLIA_PRIVATE_KEY ="6437a043d285d590b5deba30cd1376b9f208070845809215a2eeba0475fe7a97";
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks:{
    sepolia:{
      url:`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts:[`${SEPOLIA_PRIVATE_KEY}`],
    }
  },
  paths:{
    artifacts:"./client/src/artifacts"
  }
};

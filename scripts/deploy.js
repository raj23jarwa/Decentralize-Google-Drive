
const hre = require("hardhat");

async function main() {
  const Upload =await hre.ethers.getContractFactory("Upload");
  const upload =await Upload.deploy();
  await upload.deployed();
  console.log("contract is deployed at :",upload.address)

}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
